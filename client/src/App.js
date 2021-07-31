import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { setUser } from './components/auth/userSlice';
import Landing from './components/layout/Landing';
import ProtectedRoute from './components/routing/ProtectedRoute';
import setAuthToken from './components/utils/setAuthToken';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './contexts/constants';
import About from './views/About';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';

function App() {
    const dispatch = useDispatch();

    // // Authenticater
    const loadUser = async () => {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);

        try {
            const response = await axios.get(`${apiUrl}/auth`);

            if (response.data.success) {
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
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
        }
    };

    useEffect(() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            loadUser();
        } else {
            dispatch(
                setUser({
                    check: {
                        authLoading: false,
                        isAuthenticated: false,
                        user: null,
                    },
                })
            );
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route
                    exact
                    path='/login'
                    render={(props) => <Auth {...props} authRoute='login' />}
                />
                <Route
                    exact
                    path='/register'
                    render={(props) => <Auth {...props} authRoute='register' />}
                />
                <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                <ProtectedRoute exact path='/about' component={About} />
            </Switch>
        </Router>
    );
}

export default App;
