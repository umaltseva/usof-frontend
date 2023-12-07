import React from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel, InputGroup, Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { Google, EyeSlash, Eye } from "react-bootstrap-icons";
import { useDispatch, useSelector } from 'react-redux'
import { login, selectAuth } from '../../store/auth';
import { verifyEmail } from '../../services/auth';

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01;
    });
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
            <meshStandardMaterial color={hovered ? 'hotpink' : 'mediumpurple'} />
        </mesh>
    )
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    
    const [showToast, setShowToast] = useState(true);

    const handleCloseToast = () => setShowToast(false);

    const { token } = useParams();
    const [verificationMessage, setVerificationMessage] = useState("");

    useEffect(() => {
        const verify = async () => {
            const response = await verifyEmail(token);

            if (response.error) {
                setPasswordError(response.error);
            } else {
                setVerificationMessage("Email verified, you can log in")
            }
        };

        if (token) {
            verify(token);
        }
    }, []);

    const navigate = useNavigate();
    const dispath = useDispatch();
    const { user, error } = useSelector(selectAuth);

    useEffect(() => {
        if (user) {
            navigate('/posts');
        }
        if (error) {
            setPasswordError(error);
        }
    }, [user, error, navigate]);

    const validatePassword = (pwd) => {
        if (pwd.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        // Add more conditions for password complexity if needed
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationMessage = validatePassword(password);
        if (validationMessage) {
            setPasswordError(validationMessage);
            return;
        }
        dispath(login({ login: username, password }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError(validatePassword(e.target.value));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container fluid className='p-0'>
            <Card className='text-black m-3 text-center' style={{ borderRadius: '25px' }}>
                <Row className="align-items-center"> {/* Adjusted this line */}
                    <Col md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-left'>
                        <Form onSubmit={handleSubmit}>
                            <Card.Body>
                                <h2>We’ve missed you!</h2>

                                <p className="lead">More than 150 questions are waiting for your wise suggestions!</p>

                                <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
                                    <Form.Control type='text'
                                        name='username'
                                        placeholder="Username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </FloatingLabel>
                                <div className="mb-3 p-0 align-items-left">
                                    <FloatingLabel controlId="floatingPassword">
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Password"
                                                required
                                                value={password}
                                                onChange={handlePasswordChange}
                                                isInvalid={!!passwordError}
                                            />
                                            <InputGroup.Text onClick={togglePasswordVisibility}>
                                                {showPassword ? <EyeSlash /> : <Eye />}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        <Form.Control.Feedback type="invalid">
                                            {passwordError}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                    <p className="text-end">Forgot your password? <Link to='/register'>Reset password</Link></p>
                                </div>

                                <Button type="submit" variant="light" size="lg" >Login</Button>
                            </Card.Body>
                           {/*  <Card.Footer> or continue with <br></br> <Link to='/register'>< Google width="25" height="25" /></Link> </Card.Footer> */}

                            <Card.Footer>Don't have an account? <Link to='/register'>Create one</Link>
                            </Card.Footer>


                        </Form>

                    </Col>
                    <Col md='10' lg='6' className='order-1 order-lg-2 align-items-center d-flex flex-column' >
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

                            <Box position={[-1.2, 0.5, 0]} />
                            <Box position={[1.2, -0.5, 0]} />



                        </Canvas>
                    </Col>

                </Row>

            </Card>

            {verificationMessage && showToast && (
                <ToastContainer
                    className="p-3"
                    position='middle-center'
                    style={{ zIndex: 1 }}
                >
                    <Toast show={showToast} onClose= {handleCloseToast}  >
                        <Toast.Header closeButton={true}>
                            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                            <strong className="me-auto">Bootstrap</strong>
                        </Toast.Header>
                        <Toast.Body>{verificationMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
           
        </Container>

    );
};
export default Login;
