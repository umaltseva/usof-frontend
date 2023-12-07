import React, { useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { ChatRightDots } from 'react-bootstrap-icons';
import { addPostComment } from '../../services/posts';

function CreateComment({ postId, createCallback }) {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => setComment(e.target.value);

    const handleCommentSubmit = async () => {
        const createdComment = await addPostComment(postId, comment);
        createCallback(createdComment);
        setComment(''); // Clear comment box after submit
    };

    const handleCancel = () => {
        setComment(''); // Clear comment box when cancel is clicked
    };

    return (
        <Container className="my-4 p-4">
            <h3 className="text-center mb-3">Suggestions</h3>
            <InputGroup >
                <Form.Control
                    as="textarea"
                    placeholder="Type here your wise suggestion"
                    value={comment}
                    onChange={handleCommentChange}
                    style={{ resize: 'none' }} // Prevents resizing of textarea
                />
            </InputGroup>
            <div className="text-end mt-2">
                <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="info" onClick={handleCommentSubmit}>
                    <ChatRightDots className="me-2" /> Suggest
                </Button>
            </div>
        </Container>
    );
}

export default CreateComment;
