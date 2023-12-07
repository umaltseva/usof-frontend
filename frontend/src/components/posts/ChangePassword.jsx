// Profile.jsimport React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import ChangePasswordCard from './ChangePasswordCard';

function ChangePassword() {
    return (
        <Container fluid className='p-0'>
            <Row className="gx-0"> {/* Use gx-0 to remove horizontal gutters */}
                <Col sm={2} className="p-0"> {/* Sidebar column */}
                    <Sidebar />
                </Col>
                <Col sm={10} className="p-3"> {/* ProfileCard column */}
                    <ChangePasswordCard />
                </Col>
            </Row>
        </Container>
    );
}

export default ChangePassword;
