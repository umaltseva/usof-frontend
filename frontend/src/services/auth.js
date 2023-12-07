import axios from '../axios'

const verifyEmail = async (token) => {
    const response = await axios.post(`/auth/verify-email/${token}`);
    return response.data;
}

export { verifyEmail }
