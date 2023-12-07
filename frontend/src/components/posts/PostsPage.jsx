import PostList from "./PostList";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';

const PostsPage = () => {
    return (
        <Container fluid className='p-0'>
            <Row className="gx-0"> {/* Use gx-0 to remove horizontal gutters */}
                <Col sm={2} className="p-0"> {/* Sidebar column */}
                    <Sidebar />
                </Col>
                <Col sm={10} className="p-0"> 
                    <PostList />
                    
                </Col>
            </Row>
        </Container>
    )
}

export default PostsPage;
