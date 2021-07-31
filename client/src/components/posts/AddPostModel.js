import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { apiUrl } from '../../contexts/constants';
import { addPost, selectPosts, setShowModel, updatePost } from './postSlice';

const AddPostModel = () => {
    const dispatch = useDispatch();
    const { showModel, postUp } = useSelector(selectPosts);
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: '',
    });

    useEffect(() => {
        setNewPost(postUp);
    }, [postUp]);

    const { title, description, url, status } = newPost;

    const handleClose = () => {
        dispatch(setShowModel());
        if (!postUp?._id) {
            setNewPost({
                title: '',
                description: '',
                url: '',
                status: '',
            });
        } else {
            setNewPost(postUp);
        }
    };

    const onChangeNewPostForm = (e) =>
        setNewPost({ ...newPost, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (postUp?._id) {
            console.log('update');
            try {
                const reponse = await axios.put(
                    `${apiUrl}/posts/${postUp._id}`,
                    newPost
                );
                if (reponse.data.success) {
                    dispatch(updatePost(reponse.data.post));
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('add');
            try {
                const reponse = await axios.post(`${apiUrl}/posts`, newPost);
                if (reponse.data.success) {
                    dispatch(addPost(reponse.data.post));
                }
            } catch (error) {
                console.log(error);
            }
        }
        handleClose();
    };

    return (
        <Modal show={showModel} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {postUp?._id ? 'Update Post' : 'Add Post'}
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            value={title}
                            onChange={onChangeNewPostForm}
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            as='textarea'
                            placeholder='Description'
                            name='description'
                            required
                            value={description}
                            onChange={onChangeNewPostForm}
                            rows={3}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control
                            type='text'
                            placeholder='Tutorial Url'
                            name='url'
                            value={url}
                            onChange={onChangeNewPostForm}
                            required
                        />
                    </Form.Group>
                    {postUp?._id && (
                        <Form.Group>
                            <Form.Select
                                aria-label='Default select example'
                                value={status}
                                name='status'
                                onChange={onChangeNewPostForm}
                            >
                                <option>Open this select menu</option>
                                <option value='TO LEARN'>TO LEARN</option>
                                <option value='LEARNING'>LEARNING</option>
                                <option value='LEARNED'>LEARNED</option>
                            </Form.Select>
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        {postUp._id ? 'Update' : 'Add'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddPostModel;
