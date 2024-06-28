import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosClient";

export default function  () {
    const navigate = useNavigate();

    const deletePhoto = async (id) => {
        await axios.delete(`/photos/${id}`);
        navigate('/photos');
    };

    const deleteCategory = async (id) => {
        await axios.delete(`/categories/${id}`);
        navigate('/categories');
    };

    return {
        deletePhoto,
        deleteCategory
    };
};