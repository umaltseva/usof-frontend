import React, { useEffect } from 'react';
import { Container, Navbar, Nav, Button, NavDropdown, OverlayTrigger, Popover, Image, Stack, Dropdown } from 'react-bootstrap';
import { Bell, PersonAdd, PatchPlus } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout, getCurrentUser, selectAuth, resetLogout } from '../../store/auth';
import { getAvatarUrl } from '../../services/users';
import logo from './img/logo.svg';

const UserMenu = (avatar) => (
    <Image
        src={getAvatarUrl(avatar)}
        alt="User Name profile image"
        roundedCircle
        style={{ width: '40px', height: '40px' }} // Ensure the height is set to prevent the image from being distorted
    />
);

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Notifications</Popover.Header>
        <Popover.Body>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
        </Popover.Body>
    </Popover>
);

const UnauthorizedNavbar = () => (
    <Stack direction="horizontal" gap={2}>
        <Nav.Link href="/register" className="pe-2">
            <Button variant="outline-light">
                <PersonAdd /> Sign Up
            </Button>
        </Nav.Link>
        <Nav.Link href="/login">
            <Button variant="outline-light">Log In</Button>
        </Nav.Link>
    </Stack>
);

const UserHeader = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <Stack direction="horizontal" gap={3} className="align-items-center">
            <Button onClick={() => navigate("/createpost")} variant="outline-light" className="d-flex align-items-center justify-content-left">
                <PatchPlus className="me-1" /> Ask Question
            </Button>
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Bell width="20" height="25" />
            </OverlayTrigger>
            <NavDropdown title={UserMenu(user.profile_picture)} id="basic-nav-dropdown" align="end" > {/* Use align="end" to align the dropdown to the right */}
                {/* <Dropdown.Menu style={{ backgroundColor: '#39cbfb' }} > */}
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                    Log out
                </NavDropdown.Item>
                {/*          </Dropdown.Menu> */}
            </NavDropdown>
        </Stack>
    )
};

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, logout } = useSelector(selectAuth);

    useEffect(() => {
        if (logout) {
            dispatch(resetLogout());
            navigate("/login");
        }
        if (!user && !error) {
            dispatch(getCurrentUser());
        }
    }, [user, error, logout, navigate]);

    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand role="button" onClick={() => navigate("/posts")}>
                    <img
                        alt="logo"
                        src={logo}
                        width="40"
                        height="32"
                        className="d-inline-block align-top"
                    />{' '}
                    ulianka<strong>overflow</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                    {user ? <UserHeader user={user} /> : <UnauthorizedNavbar />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
