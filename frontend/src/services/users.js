import axios from '../axios'
import { SERVER_URL } from "../config";

const getAvatarUrl = (avatar) => {
    return `${SERVER_URL}/${avatar}`
}

const getAllUsers = async () => {
    const response = await axios.get("/users");
    return response.data;
}

const getUserById = async (userId) => {
    const response = await axios.get(`/users/${userId}`);
    return response.data;
}

const uploadAvatar = async () => {
}

const updateUser = async (userId, changes) => {
    const response = await axios.patch(`/users/${userId}`, changes);
    return response.data;
}

const deleteUser = async (userId) => {
    const response = await axios.delete(`/users/${userId}`);
    return response.data;
}

export { getAvatarUrl, getAllUsers, getUserById, uploadAvatar, updateUser, deleteUser };
