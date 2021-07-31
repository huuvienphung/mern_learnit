import React, { Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { selectUser } from '../components/auth/userSlice';

const Auth = ({ authRoute }) => {
    const { authLoading, isAuthenticated } = useSelector(selectUser);
    let body;
    if (authLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        );
    } else if (isAuthenticated) return <Redirect to='/dashboard' />;
    else {
        body = (
            <Fragment>
                {authRoute === 'login' && <LoginForm />}
                {authRoute === 'register' && <RegisterForm />}
            </Fragment>
        );
    }
    return (
        <div className='landing'>
            <div className='form'>{body}</div>
        </div>
    );
};

export default Auth;
