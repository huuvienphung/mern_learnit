import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../../contexts/constants';
import AlertMessage from '../layout/AlertMessage';
import setAuthToken from '../utils/setAuthToken';
import { setUser } from './userSlice';

const RegisterForm = () => {
    // state
    const [alert, setAlert] = useState(null);
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confrimPassword: '',
    });

    const { username, password, confrimPassword } = registerForm;
    // redux
    const dispatch = useDispatch();

    // register form
    const onChangeRegisterForm = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (user) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, user);

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

            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const register = async (e) => {
        e.preventDefault();

        if (password !== confrimPassword) {
            setAlert({
                type: 'danger',
                message: 'password and confirm password khác nhau',
            });
            setTimeout(() => setAlert(null), 4000);
            return;
        }

        try {
            const registerData = await registerUser({ username, password });

            if (!registerData.success) {
                setAlert({
                    type: 'danger',
                    message: registerData.message,
                });
                setTimeout(() => setAlert(null), 4000);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Fragment>
            <AlertMessage info={alert} />
            <Form className='mb-3' onSubmit={register}>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='text'
                        placeholder='Username'
                        name='username'
                        onChange={onChangeRegisterForm}
                        value={username}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={onChangeRegisterForm}
                        value={password}
                        required
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Control
                        type='password'
                        placeholder='Confrim Password'
                        name='confrimPassword'
                        onChange={onChangeRegisterForm}
                        value={confrimPassword}
                        required
                    />
                </Form.Group>
                <Button variant='success' type='submit'>
                    Register
                </Button>
            </Form>
            <p>
                ss Don't have an account?{' '}
                <Link to='/login'>
                    <Button variant='info' size='sm' className='ml-3'>
                        Login
                    </Button>
                </Link>
            </p>
        </Fragment>
    );
};

export default RegisterForm;
