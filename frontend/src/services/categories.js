import axios from '../axios'

const getAllCategories = async () => {
    const response = await axios.get("/categories");
    return response.data;
}

export { getAllCategories };
