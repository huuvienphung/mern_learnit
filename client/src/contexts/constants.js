export const apiUrl =
    process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5000/api'
        : 'someDeloyUrl';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';