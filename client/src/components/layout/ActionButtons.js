import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import pencilIcon from '../../assets/pencil.svg';
import playIcon from '../../assets/play-btn.svg';
import trashIcon from '../../assets/trash.svg';
import { apiUrl } from '../../contexts/constants';
import { deletePost, setPost, setShowModel } from '../posts/postSlice';

const ActionButtons = (props) => {
    const { url, _id } = props.post;
    const dispatch = useDispatch();

    const delPost = async () => {
        try {
            const reponse = await axios.delete(`${apiUrl}/posts/${_id}`);
            if (reponse.data.success) {
                dispatch(deletePost({ _id: _id }));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const ediPost = (choosePost) => {
        dispatch(setPost(choosePost));
        dispatch(setShowModel());
    };

    return (
        <>
            <Button href={url} target='_blank' variant='info' size='sm'>
                <img src={playIcon} alt='play' />
            </Button>
            <Button
                variant='danger'
                size='sm '
                className='ms-1'
                onClick={delPost}
            >
                <img src={trashIcon} alt='delete' />
            </Button>
            <Button
                size='sm'
                className='ms-1'
                onClick={ediPost.bind(this, props.post)}
            >
                <img src={pencilIcon} alt='edit' />
            </Button>
        </>
    );
};

export default ActionButtons;
