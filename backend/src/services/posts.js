import pool from '../db/db.js';
import userService from './users.js'
import commentService from './comments.js'

const getPostFilterQuery = (filter) => {
    let query = "";

    if (filter.status) {
        query += `where p.status = '${filter.status}' `;
    }

    if (filter.from && filter.to) {
        query += `where p.publish_date >= '${filter.from}'
                    and p.publish_date <= '${filter.to}' `;
    }

    return query;
}

const getPostSortQuery = (sort) => {
    let query = "order by ";

    if (!sort) {
        sort = "top";
    }

    switch (sort) {
        case "new":
            query += "p.publish_date ";
            break;
        case "top":
            query += "likes ";
            break;
        case "hot":
            query += "comments ";
            break;
    }

    query += "desc ";

    return query;
}

const getPosts = async (userId, offset, limit, filter, sort) => {
    const filterQuery = getPostFilterQuery(filter);
    const sortQuery = getPostSortQuery(sort);

    try {
        const result = await pool.query(
            `select p.*,
                count(distinct c.id) as comments,
                count(distinct l.id) filter (where l.type = 'like') as likes,
                count(distinct l.id) filter (where l.type = 'dislike') as dislikes
            from posts p
                left join comments c on c.post_id = p.id
                left join likes l on l.post_id = p.id
            ${filterQuery}
            group by p.id
            ${sortQuery}
            offset $1 rows fetch next $2 rows only`,
            [offset, limit]
        );

        for (let post of result.rows) {
            await queryPostInfo(userId, post);
        }

        return result.rows;
    } catch (error) {
        return { error: error.message };
    }
}

const getPostById = async (userId, postId) => {
    try {
        const result = await pool.query(
            `select p.*,
                count(distinct c.id) as comments,
                count(distinct l.id) filter (where l.type = 'like') as likes,
                count(distinct l.id) filter (where l.type = 'dislike') as dislikes
            from posts p
                left join comments c on c.post_id = p.id
                left join likes l on l.post_id = p.id
            where p.id = $1
            group by p.id`,
            [postId]
        );

        if (result.rowCount == 0) {
            return { error: "Post not found" };
        }

        const post = result.rows[0];
        await queryPostInfo(userId, post);

        return post;
    } catch (error) {
        return { error: error.message };
    }
}

const queryPostInfo = async (userId, post) => {
    post.author = await userService.getUserById(post.author_id);
    delete post.author_id;

    post.categories = await getPostCategories(post.id);

    if (!userId) {
        return;
    }

    const result = await pool.query(
        "select * from likes where post_id = $1 and author_id = $2",
        [post.id, userId]
    );

    if (result.rowCount != 0) {
        post.like = result.rows[0];
    }
}

const getPostComments = async (userId, postId) => {
    try {
        const result = await pool.query(
            `select c.*,
            count(l.id) filter (where l.type = 'like') as likes,
            count(l.id) filter (where l.type = 'dislike') as dislikes
            from comments c
                left join likes l on l.comment_id = c.id
            where c.post_id = $1
            group by c.id`,
            [postId]
        );

        for (let comment of result.rows) {
            await commentService.queryCommentInfo(userId, comment);
        }

        return result.rows;
    } catch (error) {
        return { error: error.message };
    }
}

const addPostComment = async (userId, postId, content) => {
    try {
        const result = await pool.query(
            "insert into comments (post_id, author_id, content) values ($1, $2, $3) returning *",
            [postId, userId, content]
        );

        const id = result.rows[0].id;
        const comment = await commentService.getCommentById(userId, id);

        return comment;
    } catch (error) {
        return { error: error.message };
    }
}

const getPostCategories = async (postId) => {
    try {
        const result = await pool.query(
            `select c.* from categories c
            left join post_categories pc on pc.category_id = c.id
            where pc.post_id = $1`,
            [postId]
        );

        return result.rows;
    } catch (error) {
        return { error: error.message };
    }
}

const getPostLikes = async (postId) => {
    try {
        const result = await pool.query(
            "select * from likes where post_id = $1",
            [postId]
        );

        return result.rows;
    } catch (error) {
        return { error: error.message };
    }
}

const createPost = async (userId, title, content, categories) => {
    try {
        const result = await pool.query(
            `insert into posts (author_id, title, status, content)
            values ($1, $2, $3, $4)
            returning *`,
            [userId, title, "active", content]
        );

        const post = result.rows[0];

        for (let category of categories) {
            await pool.query(
                "insert into post_categories (post_id, category_id) values ($1, $2)",
                [post.id, category.id]
            );
        }

        return post;
    } catch (error) {
        return { error: error.message };
    }
}

const addPostLike = async (userId, postId, type) => {
    try {
        const result = await pool.query(
            "insert into likes (post_id, author_id, type) values ($1, $2, $3) returning *",
            [postId, userId, type]
        );

        return result.rows[0];
    } catch (error) {
        return { error: error.message };
    }
}

const updatePost = async (auth, postId, changes) => {
    try {
        const selectResult = await pool.query(
            "select * from posts where id = $1",
            [postId]
        );

        if (selectResult.rowCount == 0) {
            return { error: "Post not found" };
        }

        const post = { ...selectResult.rows[0], ...changes };

        const result = await pool.query(
            `update posts set title = $1, status = $2, content = $3 where id = $4 returning *`,
            [post.title, post.status, post.content, post.id]
        );

        return result.rows[0];
    } catch (error) {
        return { error: error.message };
    }
}

const deletePostById = async (postId) => {
    try {
        const result = await pool.query(
            "delete from posts where id = $1",
            [postId]
        );

        if (result.rowCount == 0) {
            return { error: "Post not found" };
        }
    } catch (error) {
        return { error: error.message };
    }
}

const deletePostLike = async (userId, postId) => {
    try {
        const result = await pool.query(
            "delete from likes where author_id = $1 and post_id = $2",
            [userId, postId]
        );

        if (result.rowCount == 0) {
            return { error: "Like not found" };
        }
    } catch (error) {
        return { error: error.message };
    }
}

export default {
    getPosts, getPostById, getPostComments,
    addPostComment, getPostCategories, getPostLikes,
    createPost, addPostLike, updatePost, deletePostById, deletePostLike
}
