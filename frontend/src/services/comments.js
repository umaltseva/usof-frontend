import axios from '../axios';

const getCommentById = async (commentId) => {
        const response = await axios.get(`/comments/${commentId}`);
        return response.data;
};

const getCommentLikes = async (commentId) => {
        const response = await axios.get(`/comments/${commentId}/like`);
        return response.data;
};

const addCommentLike = async (commentId, type) => {
        const response = await axios.post(`/comments/${commentId}/like`, { type });
        return response.data;
};

const updateComment = async (commentId, changes) => {
        const response = await axios.patch(`/comments/${commentId}`, changes);
        return response.data;
};

const deleteCommentById = async (commentId) => {
    const response = await axios.delete(`/comments/${commentId}`);
    return response.data;
};

const deleteCommentLike = async (commentId) => {
    const response = await axios.delete(`/comments/${commentId}/like`);
    return response.data;
};

export { getCommentById, getCommentLikes, addCommentLike, updateComment, deleteCommentById, deleteCommentLike };
