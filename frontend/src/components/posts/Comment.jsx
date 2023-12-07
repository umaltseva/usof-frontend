import React from 'react';
import { NavDropdown, Card, Row, Col, Image, Stack } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown, ChatSquare, ThreeDotsVertical, Pencil, Trash3, Check2Circle } from 'react-bootstrap-icons';
import { getAvatarUrl } from '../../services/users';
import { deleteCommentById } from '../../services/comments';
import { useSelector } from 'react-redux'
import { selectAuth } from '../../store/auth';

const Comment = ({ comment, deleteCallback }) => {
    const { user } = useSelector(selectAuth);

    const handleDelete = async () => {
        await deleteCommentById(comment.id);
        deleteCallback(comment);
    }

    return (
        <Card className="mb-2">
            <Card.Header>
                <Stack direction="horizontal" gap={2}>
                    <Image width={50} height={50} src={getAvatarUrl(comment.author.profile_picture)} roundedCircle />
                    <Stack gap={-10}>
                        <Card.Text className='m-0'>{comment.author.login}</Card.Text>
                        <Card.Text style={{ fontWeight: 'normal' }}>
                            {new Date(comment.publish_date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Card.Text>
                    </Stack>
                    {user?.id == comment.author.id &&
                        <div className="ms-auto custom-dropdown">
                            <NavDropdown
                                title={<ThreeDotsVertical style={{ color: 'white' }} />}
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item href="/profile" className="w-100 d-flex align-items-center justify-content-left"> <Pencil className="me-1" /> Edit</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleDelete} className="w-100 d-flex align-items-center justify-content-left">
                                    <Trash3 className="me-1" /> Delete
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    }
                </Stack>
            </Card.Header>
            <Card.Body>
                <Card.Text className='text-truncate'>{comment.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={2}>
                    <div>
                        <HandThumbsUp className="me-1 clickable-icon" />
                        <span className="me-3">{comment.likes}</span>
                        <HandThumbsDown className="me-1 clickable-icon" />
                        <span className="me-3">{comment.dislikes}</span>
                    </div>
                </Stack>
            </Card.Footer>
        </Card>
    );
};

export default Comment;
