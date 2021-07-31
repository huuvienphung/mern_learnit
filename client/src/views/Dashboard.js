import React from 'react';
import AddPostModel from '../components/posts/AddPostModel';
import Posts from '../components/posts/Posts';

const Dashboard = () => {
    return (
        <>
            <Posts />
            <AddPostModel />
        </>
    );
};

export default Dashboard;
