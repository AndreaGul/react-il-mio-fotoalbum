import FormCategory from "../components/FormCategory"
import axios from "../utils/axiosClient";

import { Link, useNavigate } from "react-router-dom";

export default function () {

    const navigate = useNavigate();

    const creaCategory = async formData => {
        try {
            console.log(formData);

            const res = await axios.post(`/categories`, formData);
            console.log(res);
            if (res.status < 400) {
                navigate(`/categories`)
            }
        } catch (error) {
            console.error('Errore nella creazione della foto:', error);
        }
    }


    return(
        <>
        <h1>crea categoria</h1>
        <Link to={`/administration`}>Torna all'area amminstrativa</Link>
        <FormCategory onSubmit={creaCategory }/>
        </>
    )
}