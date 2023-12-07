import React from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { Person } from 'react-bootstrap-icons'; // Importing Person icon
import Header from './Header';
import { createRoot } from 'react-dom/client'
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { useDispatch, useSelector } from 'react-redux'
import { register, selectAuth } from '../../store/auth';

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
            castShadow
            receiveShadow
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'skyblue'} />
        </mesh>
    )
}

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [validationMessage, setValidationMessage] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const navigate = useNavigate();
    const dispath = useDispatch();
    const { error, success } = useSelector(selectAuth);

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
        if (error) {
            setValidationMessage(error);
        }
    }, [error, success]);

    const validatePassword = () => {
        if (password.length < 8) {
            setIsPasswordValid(false);
            return "Password must be at least 8 characters long.";
        }
        if (password !== confirmPassword) {
            setIsPasswordValid(false);
            return "Passwords do not match.";
        }
        setIsPasswordValid(true);
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = validatePassword();
        setValidationMessage(message);
        if (message) return;
        dispath(register({ login, password, passwordConfirmation: confirmPassword, fullName, email }));
    };

    return (
        <Container fluid className='p-0'>
            <Card className='text-black m-3' style={{ borderRadius: '25px' }}>
                <Card.Body>
                    <Row className="align-items-center"> {/* Adjusted this line */}
                        <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-left'>

                            <h2>Join UliankaOverflow community</h2>

                            <p class="lead">Get more features and priviliges by joining to the most helpful community</p>
                            <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-2">
                                <Form.Control type="text" placeholder="Username" onChange={(e) => setLogin(e.target.value)} />
                            </FloatingLabel>

                            <Form.Floating className="mb-2">
                                <Form.Control
                                    id="floatingInputEmail"
                                    type="email"
                                    placeholder="name@example.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInputEmail">Email address</label>
                            </Form.Floating>


                            <FloatingLabel controlId="floatingInputName" label="Full Name" className="mb-2">
                                <Form.Control type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
                            </FloatingLabel>


                            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={!!validationMessage && !isPasswordValid}
                                    isValid={isPasswordValid && password.length > 0}
                                />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingRepeatPassword" label="Repeat your password" className="mb-2">
                                <Form.Control
                                    type="password"
                                    placeholder="Repeat your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    isInvalid={!!validationMessage && !isPasswordValid}
                                    isValid={isPasswordValid && password.length > 0}
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    {validationMessage}
                                </Form.Control.Feedback>
                            </FloatingLabel>

                            <Button variant="primary" size="lg" onClick={handleSubmit}>Register</Button>

                        </Col>
                        <Col md='10' lg='6' className='order-1 order-lg-2'>
                            <Canvas shadows>
                                <ambientLight intensity={0.5} />
                                <directionalLight
                                    position={[5, 5, 5]}
                                    castShadow
                                    shadow-mapSize-width={2048} // Higher resolution for better shadow quality
                                    shadow-mapSize-height={2048}
                                    shadow-camera-near={0.5}
                                    shadow-camera-far={50}
                                    shadow-camera-left={-10}
                                    shadow-camera-right={10}
                                    shadow-camera-top={10}
                                    shadow-camera-bottom={-10}
                                />
                                <Box position={[0, 0, 0]} />
                                <Box position={[-4, 0, 0]} />
                                <Box position={[4, 0, 0]} />
                                <Box position={[0, 2, 0]} />
                                <Box position={[-4, 2, 0]} />
                                <Box position={[4, 2, 0]} />
                                <Box position={[0, -2, 0]} />
                                <Box position={[-4, -2, 0]} />
                                <Box position={[4, -2, 0]} />
                            </Canvas>
                        </Col>

                    </Row>
                </Card.Body>
            </Card>

        </Container>
    );
}

export default Register;
