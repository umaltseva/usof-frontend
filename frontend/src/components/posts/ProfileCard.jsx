import React from 'react';
import { Card, Form, Button, Image, Row, Col } from 'react-bootstrap';
import { BookmarkHeart, PencilSquare, Key } from "react-bootstrap-icons";
import { getAvatarUrl } from '../../services/users';
import { useNavigate } from 'react-router-dom';

function ProfileCard({ user }) {
    const navigate = useNavigate();

    return (
        <Card className='mx-auto' style={{ borderRadius: '25px', maxWidth: '100%' }}>
            {/* Center avatar image */}
            <Card.Body className="d-flex justify-content-center align-items-center p-2">
                <Image src={getAvatarUrl(user.profile_picture)} width={200} height={200} roundedCircle />
            </Card.Body>

            {/* Center bookmark icon and text */}
            <Card.Body className="d-flex justify-content-center align-items-center p-0">
                <BookmarkHeart width="25" height="25" className="align-self-center me-1" style={{ color: 'yellow' }} />
                <span className="align-self-center" style={{ lineHeight: '1', margin: '0', color: 'yellow' }}>{user.rating}</span>
            </Card.Body>


            <Card.Body className="p-0">
                <Form>
                    <Row>
                        {/* Column for input fields */}
                        <Col md={8}>
                            <Form.Group controlId="formBasicUsername" className="pb-2 ps-3 w-auto">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    disabled
                                    readOnly
                                    value={user.login}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicFullName" className="pb-2 ps-3 w-auto">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="User Name"
                                    disabled
                                    readOnly
                                    value={user.full_name}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail" className="pb-3 ps-3 w-auto">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email" // Using email type for proper validation
                                    placeholder="username@gmail.com"
                                    disabled
                                    readOnly
                                    value={user.email}
                                />
                            </Form.Group>
                        </Col>

                        {/* Column for buttons */}
                        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
                            <Button variant="success" onClick={() => navigate('/editprofile')} className="mb-2 w-auto">
                                <PencilSquare /> Edit
                            </Button>
                            <Button variant="secondary" onClick={() => navigate('/changepassword')}  className="w-auto">
                                <Key /> Change password
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ProfileCard;
