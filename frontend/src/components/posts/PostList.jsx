import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Post from "./Post";
import { getPosts } from '../../services/posts';
import Filter from "./Filtering";
import { useEffect, useState } from 'react';

const PostList = () => {
    const pageSize = 10;
    const [offset, setOffset] = useState(0);
    const [posts, setPosts] = useState([]);
    const [params, setParams] = useState({});

    useEffect(() => {
        setOffset(0);
        getPosts(0, pageSize, params.filter, params.sort).then(setPosts);
    }, [params, pageSize]);

    const showMore = () => {
        setOffset(offset + pageSize);
        getPosts(offset + pageSize, pageSize, params.filter, params.sort)
            .then(newPosts => setPosts(posts.concat(newPosts)));
    }

    const handleDelete = (post) => {
        const index = posts.indexOf(post);
        posts.splice(index, 1);
        console.log(index, posts);
        setPosts([...posts]);
    }

    return (
        <Stack gap={3} className='w-auto px-4 m-auto pb-2'>
            <Filter callback={setParams} />
            {posts.map(post => <Post key={post.id} post={post} truncate={true} clickable={true} deleteCallback={handleDelete} />)}
            <Button variant="secondary" onClick={showMore}>Show More</Button>
        </Stack>
    )
}

export default PostList;
