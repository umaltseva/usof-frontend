import Stack from 'react-bootstrap/Stack';
import Comment from "./Comment";

const CommentList = ({ comments, deleteCallback }) => {
    return (
        <Stack gap={3} className='w-auto p-4 m-auto'>
            {comments.map(comment => <Comment key={comment.id} comment={comment} deleteCallback={deleteCallback} />)}
        </Stack>
    )
}

export default CommentList;
