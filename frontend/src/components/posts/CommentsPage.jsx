// frontend\src\components\posts\CommentsPage.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { getPostById } from '../../services/posts';
import CommentList from "./CommentList";
import CreateComment from "./CreateComment";
import Post from "./Post";
import { useNavigate, useParams } from 'react-router-dom';
import { getPostComments } from '../../services/posts.js';

const CommentsPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null); // State for storing post data
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getPostById(postId).then(data => setPost(data)); // Fetch and set the post data
    }, []);

    useEffect(() => {
        getPostComments(postId).then(setComments);
    }, []);

    const navigate = useNavigate();

    const handlePostDelete = (post) => {
        navigate("/posts");
    }

    const handleCommentDelete = (comment) => {
        const index = comments.indexOf(comment);
        comments.splice(index, 1);
        setComments([...comments]);
    }

    const handleCommentCreate = (comment) => {
        comments.push(comment);
        setComments([...comments]);
    }

    return (
        <Container fluid> {/* Add padding for whitespace */}
            <Row>
                <Col sm={2} className="p-0"> {/* Responsive sidebar */}
                    <Sidebar />
                </Col>
                <Col sm={10} > {/* Main content area */}
                    {post && (
                        <div className=' mx-4 mt-5 '>
                            <Post post={post} deleteCallback={handlePostDelete} className='p-4' />
                        </div>
                    )}
                    <CreateComment postId={postId} createCallback={handleCommentCreate} /> {/* Comment creation area */}

                    <CommentList comments={comments} deleteCallback={handleCommentDelete} />

                </Col>
            </Row>
        </Container>
    );
}

export default CommentsPage;
