import { Link, useParams } from "react-router-dom";
import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";
import DeleteEl from "../components/DeleteEl";

export default function PhotoDetail() {
    const [photo, setPhoto] = useState({});
    const { id } = useParams();
    const { deletePhoto } = DeleteEl();

    const singleImg = async () => {
        try {
            const response = await axios.get(`/photos/${id}`);
            console.log(response.data);
            setPhoto(response.data.photo);
        } catch (err) {
            console.error(`Errore nella ricerca dell'immagine: ${err}`);
        }
    };

    useEffect(() => {
        singleImg();
    }, [id]);

    return (
        <>
            <h1>foto singola</h1>
            <Link to="/photos">torna alla lista</Link>
            <ul>
                <li>{`title: ${photo.title}`}</li>
                <li>{`description: ${photo.description}`}</li>
                <li>
                    <img style={{ width: "200px" }} src={photo.img} alt={photo.title} />
                </li>
                <li>
                    <Link to={`/photos/${id}/edit`}>edita foto</Link>
                </li>
            </ul>
            <button onClick={() =>deletePhoto(id)}>Elimina foto</button>
        </>
    );
}