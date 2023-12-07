import { Nav, Accordion, Badge, Stack, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { List, Tag, QuestionCircle, Chat, Heart } from 'react-bootstrap-icons';
import { getAllCategories } from '../../services/categories';

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories().then(setCategories)
    }, []);

    return (
        <Nav defaultActiveKey="/home" className="flex-column p-2">
            <Nav.Link variant="light" disabled> MENU</Nav.Link>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <LinkContainer to="/posts" style={{ cursor: "pointer" }}>
                            <Stack direction="horizontal" gap={2} align="center">
                                <List />
                                <div>Questions</div>
                            </Stack>
                        </LinkContainer>
                    </Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        <Stack direction="horizontal" gap={2} align="center">
                            <Tag />
                            <div>Tags</div>
                        </Stack>
                    </Accordion.Header>
                    <Accordion.Body>
                        {categories.map(category => <Badge bg="light" className='me-1'>{category.title}</Badge>)}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Personal Navigator</Accordion.Header>
                    <Accordion.Body>
                        <Stack direction="vertical" gap={2}>
                            <Button variant="secondary" href="/changepassword" className="w-100 d-flex align-items-center justify-content-left">
                                <QuestionCircle className="me-1" />
                                Your questions
                            </Button>

                            <Button variant="secondary" href="/changepassword" className="w-100 d-flex align-items-center justify-content-left">
                                <Chat className="me-1" /> Your answers
                            </Button>

                            <Button variant="secondary" href="/changepassword" className="w-100 d-flex align-items-center justify-content-left">
                                <Heart className="me-1" /> Your likes
                            </Button>

                        </Stack>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Nav>
    );
}

export default Sidebar;
