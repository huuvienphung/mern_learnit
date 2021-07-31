import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/constants';
import AlertMessage from '../layout/AlertMessage';
import setAuthToken from '../utils/setAuthToken';
import { setUser } from './userSlice';

const LoginForm = () => {
    // redux
    const dispatch = useDispatch();

    //useState
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [alert, setAlert] = useState(null);

    // form
    const { username, password } = loginForm;
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    // login
    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${apiUrl}/auth/login`,
                loginForm
            );

            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

                dispatch(
                    setUser({
                        check: {
                            authLoading: false,
                            isAuthenticated: true,
                            user: {
                                createdAt: response.data.user.createdAt,
                                username: response.data.user.username,
                                _id: response.data.user._id,
                            },
                        },
                    })
                );
            }
        } catch (error) {
            console.log(error.response.data);
            setAlert({ type: 'danger', message: error.response.data.message });

            setTimeout(() => {
                setAlert(null);
            }, 3000);

            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    return (
        <Fragment>
            <AlertMessage info={alert} />
            <Form className='mb-3' onSubmit={login}>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={username}
                        onChange={onChangeLoginForm}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeLoginForm}
                        required
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?{' '}
                <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-3'>
                        Register
                    </Button>
                </Link>
            </p>
        </Fragment>
    );
};

export default LoginForm;
