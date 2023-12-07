import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCurrentUser, updateCurrentAvatar } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../services/users';

function EditProfileCard({ user }) {
    const [avatar, setAvatar] = useState(null);
    const [login, setLogin] = useState(user.login);
    const [fullName, setFullName] = useState(user.full_name);
    const [email, setEmail] = useState(user.email);
    const [allUsers, setAllUsers] = useState([]);
    const [loginError, setLoginError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setAllUsers(users);
        };
        fetchUsers();
    }, []);

    const validateUsername = () => {
        if (allUsers.some(u => u.login === login && u.id !== user.id)) {
            setLoginError('Username already exists.');
            return false;
        }
        setLoginError('');
        return true;
    };

    const validateEmail = () => {
        if (allUsers.some(u => u.email === email && u.id !== user.id)) {
            setEmailError('Email already exists.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateUsername() || !validateEmail()) return;

        dispatch(updateCurrentUser({ userId: user.id, changes: { login, full_name: fullName, email } }));
        if (avatar) {
            dispatch(updateCurrentAvatar(avatar));
        }
    };

    return (
        <Card className='mx-auto' style={{ borderRadius: '25px', maxWidth: '600px' }}>
            <Card.Body className="p-3">
                <Card.Title className="mb-2 text-center">Edit Profile</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group controlId="formBasicUsername" className="mb-1">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    value={login}
                                    onChange={(e) => { setLogin(e.target.value); validateUsername(); }}
                                    isInvalid={!!loginError}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {loginError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="username@gmail.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); validateEmail(); }}
                                    isInvalid={!!emailError}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {emailError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formBasicFullName" className="mb-1">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control type="text" placeholder="User Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-1">
                                <Form.Label>Upload photo</Form.Label>
                                <Form.Control type="file" onChange={(e) => setAvatar(e.target.files[0])} />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Buttons at the bottom and center aligned */}
                    <Row className="text-center mt-2">
                        <Col>
                            <Button variant="success" type="submit" className="me-2">Save changes</Button>
                            <Button variant="secondary" onClick={() => navigate('/profile')}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default EditProfileCard;
