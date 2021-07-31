import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import learnItLogo from '../../assets/logo.svg';
import logoutIcon from '../../assets/logout.svg';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/constants';
import { selectUser, setUser } from '../auth/userSlice';

const NavbarMenu = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(selectUser);
    const logout = () => {
        dispatch(
            setUser({
                check: {
                    authLoading: false,
                    isAuthenticated: false,
                    user: null,
                },
            })
        );
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    };

    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow mb-4'>
            <Container>
                <Navbar.Brand className='font-weight-bolder text-white'>
                    <img
                        src={learnItLogo}
                        alt='learnItLogo'
                        width='32'
                        height='32'
                        className='mr-2'
                    />{' '}
                    LearnIt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link
                            className='font-weight-bolder text-white'
                            to='/dashboard'
                            as={Link}
                        >
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            className='font-weight-bolder text-white'
                            to='/about'
                            as={Link}
                        >
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link
                            className='font-weight-bolder text-white'
                            disabled
                        >
                            Welcome {user.username}
                        </Nav.Link>
                        <Button
                            variant='secondary'
                            className='font-weight-bolder text-white'
                            onClick={logout}
                        >
                            <img
                                src={logoutIcon}
                                alt='logoutIcon'
                                width='24'
                                height='24'
                                className='mr-2'
                            />
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarMenu;
