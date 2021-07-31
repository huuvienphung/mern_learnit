import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { selectUser } from '../auth/userSlice';
import NavbarMenu from '../layout/NavbarMenu';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, authLoading } = useSelector(selectUser);

    if (authLoading) {
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        );
    }
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <>
                        <NavbarMenu />
                        <div className='container-lg'>
                            <Component {...rest} {...props} />
                        </div>
                    </>
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default ProtectedRoute;
