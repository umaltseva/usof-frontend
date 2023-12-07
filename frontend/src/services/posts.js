import axios from '../axios'

const getPosts = async (offset, limit, filter, sort) => {
    const params = {
        offset,
        limit
    };

    if (sort) {
        params.sort = sort;
    }

    if (filter) {
        if (filter.type == "status") {
            params.status = filter.value;
        }
        if (filter.type == "date") {
            params.from = filter.value[0];
            params.to = filter.value[1];
        }
    }

    const response = await axios.get("/posts", { params });

    return response.data;
}

const getPostById = async (postId) => {
    const response = await axios.get(`/posts/${postId}`);
    return response.data;
}

const getPostComments = async (postId) => {
    const response = await axios.get(`/posts/${postId}/comments`);
    return response.data;
}

const addPostComment = async (postId, content) => {
    const response = await axios.post(`/posts/${postId}/comments`, { content });
    return response.data;
}

const getPostCategories = async (postId) => {
    const response = await axios.get(`/posts/${postId}/categories`);
    return response.data;
}

const getPostLikes = async (postId) => {
    const response = await axios.get(`/posts/${postId}/like`);
    return response.data;
}

const createPost = async (post) => {
    const response = await axios.post(`/posts`, post);
    return response.data;
}

const addPostLike = async (postId, type) => {
    const response = await axios.post(`/posts/${postId}/like`, { type });
    return response.data;
}

const updatePostById = async (postId, changes) => {
    const response = await axios.patch(`/posts/${postId}`, changes);
    return response.data;
}

const deletePostById = async (postId) => {
    const response = await axios.delete(`/posts/${postId}`);
    return response.data;
}

const deletePostLike = async (postId) => {
    const response = await axios.delete(`/posts/${postId}/like`);
    return response.data;
}

export { getPosts, getPostById, getPostComments, addPostComment, getPostCategories, getPostLikes, createPost, addPostLike, updatePostById, deletePostById, deletePostLike };
