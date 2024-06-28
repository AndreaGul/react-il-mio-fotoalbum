import { Link, useNavigate } from "react-router-dom";
import FormPhoto from "../components/FormPhoto";
import axios from "../utils/axiosClient";

export default function CreatePhotoPage() {

    const navigate = useNavigate();

    const creaPhoto = async formData => {
        try {
            console.log(formData);

            const res = await axios.post(`/photos`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(res);
            if (res.status < 400) {
                navigate(`/photos`)
            }
        } catch (error) {
            console.error('Errore nella creazione della foto:', error);
        }
    }

    return (
        <>
            <h1>Crea Foto</h1>
            <Link to={`/administration`}>Torna all'area amminstrativa</Link>
            <FormPhoto onSubmit={creaPhoto} />
        </>
    )
}