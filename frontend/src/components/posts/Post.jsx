import { NavDropdown, Card, Badge, Image, Stack, Button } from 'react-bootstrap';
import { HandThumbsUp, HandThumbsDown, ChatSquare, ThreeDotsVertical, Pencil, Trash3, Check2Circle } from 'react-bootstrap-icons';
import { getAvatarUrl } from '../../services/users';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { deletePostLike, addPostLike, getPostLikes, deletePostById } from '../../services/posts';
import { useSelector } from 'react-redux'
import { selectAuth } from '../../store/auth';

const Post = ({ post, truncate, clickable, deleteCallback }) => {
    const navigate = useNavigate();

    const { user } = useSelector(selectAuth);

    const goToComments = () => {
        navigate(`/comments/${post.id}`);
    }

    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [userLikeStatus, setUserLikeStatus] = useState(post.userLikeStatus);

    const updateLikesDislikes = async () => {
        try {
            const result = await getPostLikes(post.id);
            setLikes(result.likes);
            setDislikes(result.dislikes);
        } catch (error) {
            console.error('Error fetching likes/dislikes:', error);
        }
    };

    const handleLikeDislike = async (type) => {
        if (type === userLikeStatus) {
            await handleDeleteLike();
            return;
        }

        try {
            await addPostLike(post.id, type);
            await updateLikesDislikes();
            setUserLikeStatus(type);
        } catch (error) {
            console.error(`Error ${type === 'like' ? 'liking' : 'disliking'} the post:`, error);
        }
    };

    const handleDeleteLike = async () => {
        try {
            await deletePostLike(post.id);
            await updateLikesDislikes();
            setUserLikeStatus(null);
        } catch (error) {
            console.error('Error deleting the like/dislike:', error);
        }
    };

    const handleDelete = async () => {
        await deletePostById(post.id);
        deleteCallback(post);
    }

    return (
        <Card border='light'>
            <Card.Header>
                <Stack direction="horizontal" gap={3}>
                    <Image width={50} height={50} src={getAvatarUrl(post.author.profile_picture)} roundedCircle />
                    <Stack gap={-10}>
                        <Card.Text className='m-0'>{post.author.login}</Card.Text>
                        <Card.Text style={{ fontWeight: 'normal' }}>
                            {new Date(post.publish_date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </Card.Text>
                    </Stack>
                    {user?.id == post.author.id &&
                        <div className="ms-auto custom-dropdown">
                            <NavDropdown
                                title={<ThreeDotsVertical style={{ color: 'gray' }} />}
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item onClick={() => navigate('/editpost')} className="w-100 d-flex align-items-center justify-content-left"> <Pencil className="me-1" /> Edit</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleDelete} className="w-100 d-flex align-items-center justify-content-left">
                                    <Trash3 className="me-1" /> Delete
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login" className="w-100 d-flex align-items-center justify-content-left">
                                    <Check2Circle className="me-1" /> Mark as Closed
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    }
                </Stack>
            </Card.Header>
            <Card.Body role={clickable ? "button" : "none"} onClick={clickable ? goToComments : null} >
                <Card.Title className='fw-bold'>{post.title}</Card.Title>
                <Card.Text className={truncate ? "text-truncate" : ""}>{post.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Stack direction="horizontal" gap={3} className="justify-content-between">
                    <div>
                        {post.categories.map((category, index) => (
                            <Badge key={index} bg="light" className='me-1'>{category.title}</Badge>
                        ))}
                    </div>
                    <div>
                        <Button variant="link" className="me-1 p-0" onClick={() => handleLikeDislike('like')}>
                            <HandThumbsUp className={`clickable-icon ${userLikeStatus === 'like' ? 'active-like' : ''}`} />
                        </Button>
                        <span className="me-3">{likes}</span>

                        <Button variant="link" className="me-1 p-0" onClick={() => handleLikeDislike('dislike')}>
                            <HandThumbsDown className={`clickable-icon ${userLikeStatus === 'dislike' ? 'active-dislike' : ''}`} />
                        </Button>
                        <span className="me-3">{dislikes}</span>


                        <Button variant="link" className="me-1 p-0">
                            <ChatSquare className="clickable-icon" />
                        </Button>
                        <span>{post.comments}</span>
                    </div>
                </Stack>
            </Card.Footer>
        </Card >
    )
}

export default Post;
