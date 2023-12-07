import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { EyeSlash, Eye } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

function PasswordInputGroup({ value, onChange, showPassword, toggleShowPassword, minLength, controlId, label, isInvalid, feedback }) {
    return (
        <Form.Group as={Row} className="mb-3" controlId={controlId}>
            <Form.Label column sm={4}>{label}</Form.Label>
            <Col sm={8}>
                <InputGroup>
                    <FormControl
                        type={showPassword ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        required
                        minLength={minLength}
                        isInvalid={isInvalid}
                    />
                    <InputGroup.Text onClick={toggleShowPassword}>
                        {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                    <Form.Control.Feedback type="invalid">
                        {feedback}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Group>
    );
}

function ChangePasswordCard() {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false || password !== confirmPassword) {
            event.stopPropagation();
        } else {
            // Handle password change logic here
        }
        setValidated(true);
    };

    return (
        <Card className='mx-auto' style={{ borderRadius: '25px', maxWidth: '600px' }}>
            <Card.Body>
                <Card.Title className="mb-4 text-center">Change Password</Card.Title>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <PasswordInputGroup
                        controlId="formOldPassword"
                        label="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        showPassword={showOldPassword}
                        toggleShowPassword={() => setShowOldPassword(!showOldPassword)}
                    />
                    <PasswordInputGroup
                        controlId="formNewPassword"
                        label="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPassword={showNewPassword}
                        toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
                        minLength={8}
                        feedback="Please enter a password (min 8 characters)."
                    />
                    <PasswordInputGroup
                        controlId="formConfirmPassword"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPassword={showConfirmPassword}
                        toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                        isInvalid={password !== confirmPassword}
                        feedback="Passwords must match."
                    />
                    <Row className="text-center mt-3">
                        <Col>
                            <Button type="submit" variant="success" className="me-2" onClick={() => navigate('/profile')} >Change Password</Button>
                            <Button href="/profile" variant="secondary">Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default ChangePasswordCard;
