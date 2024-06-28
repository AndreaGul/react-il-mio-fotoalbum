import { Link } from "react-router-dom";
import FormPhoto from "../components/FormPhoto";
import axios from "../utils/axiosClient";

export default function CreatePhotoPage() {

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
                console.log('Foto creata con successo');
            }
        } catch (error) {
            console.error('Errore nella creazione della foto:', error);
        }
    }

    return (
        <>
            <h1>Crea Foto</h1>
            <Link to={`/administration`}>Torna all'aerea amminstrativa</Link>
            <FormPhoto onSubmit={creaPhoto} />
        </>
    )
}