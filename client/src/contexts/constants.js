export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'https://localhost:5000/api'
        : 'https://limitless-citadel-02405.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';
