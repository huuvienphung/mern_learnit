import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import plusIcon from '../../assets/plus.svg';
import { apiUrl } from '../../contexts/constants';
import { selectUser } from '../auth/userSlice';
import { selectPosts, setPost, setPosts, setShowModel } from './postSlice';
import SinglePost from './SinglePost';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, postsLoading } = useSelector(selectPosts);
    const { user } = useSelector(selectUser);

    const handClick = () => {
        dispatch(setPost({ title: '', description: '', url: '', status: '' }));
        dispatch(setShowModel());
    };

    const getPosts = async () => {
        setPosts({
            obj: {
                posts: [],
                postsLoading: false,
            },
        });
        try {
            const reponse = await axios.get(`${apiUrl}/posts`);

            if (reponse.data.success) {
                dispatch(
                    setPosts({
                        obj: {
                            posts: reponse.data.posts,
                            postsLoading: false,
                        },
                    })
                );
            }
        } catch (error) {
            dispatch(
                setPosts({
                    obj: {
                        posts: [],
                        postsLoading: false,
                    },
                })
            );
            return error.reponse
                ? error.reponse
                : { success: false, message: 'Server error' };
        }
    };

    useEffect(() => {
        dispatch(
            setPosts({
                obj: {
                    posts: [],
                    postsLoading: true,
                },
            })
        );
        getPosts();
        // eslint-disable-next-line
    }, []);

    let body = null;

    if (postsLoading) {
        body = (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info'></Spinner>
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <Card className='text-center'>
                <Card.Header>hi {user.username}</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to learnIt</Card.Title>
                    <Card.Text>Click the button to create new post</Card.Text>
                    <Button variant='primary' onClick={handClick}>
                        New Post
                    </Button>
                </Card.Body>
                <Card.Footer className='text-muted'>2 days ago</Card.Footer>
            </Card>
        );
    } else {
        body = posts.map((post, index) => (
            <SinglePost key={index} post={post} />
        ));
    }

    return (
        <>
            {posts.length === 0 ? (
                body
            ) : (
                <>
                    <div className='list-item'>{body}</div>
                    <Button className='btn-floating' onClick={handClick}>
                        <img src={plusIcon} alt='addIcon' />
                    </Button>
                </>
            )}
        </>
    );
};

export default Posts;
