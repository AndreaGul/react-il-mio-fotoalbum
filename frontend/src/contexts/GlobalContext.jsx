import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosClient";

const GlobalContext = createContext();

const GlobalProvider = ({children}) => {

    const [photos, setPhotos] = useState([]);
    const [categories, setCategories] = useState([]);


    const fetchData = async () => {
        const { data: photosData } = await axios.get(`/photos`);
        const { data: categoriesData } = await axios.get(`/categories`);
        setPhotos(photosData.photos);
        setCategories(categoriesData);
    }

    useEffect(() => {
        fetchData();
    }, []);

   

    return (
        <GlobalContext.Provider value={{
            photos,
            categories,
            fetchData
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

const useGlobal = () => {
    const value = useContext(GlobalContext);
    if (value === undefined) {
        throw new Error('Non sei dentro al Global Provider!');
    }
    return value;
}

export { GlobalProvider, useGlobal }


