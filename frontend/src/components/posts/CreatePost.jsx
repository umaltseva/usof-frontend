import CreatePostCard from "./CreatePostCard";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

const CreatePost = () => {
    return (
        <Container fluid className='p-0'>
            <Row className="gx-0"> {/* Use gx-0 to remove horizontal gutters */}
                <Col sm={2} className="p-0"> {/* Sidebar column */}
                    <Sidebar />
                </Col>
                <Col sm={10} className="p-3">
                    <CreatePostCard />
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePost;
