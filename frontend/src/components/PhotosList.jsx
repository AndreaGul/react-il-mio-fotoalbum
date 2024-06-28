import { Link } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import DeleteEl from "../components/DeleteEl";
import { useEffect, useState } from "react";

export default function () {
    const { photos, fetchData } = useGlobal();
    const { deletePhoto } = DeleteEl();
    const [newPhotoAdded, setNewPhotoAdded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Filtra le foto in base al termine di ricerca
    const filteredPhotos = photos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Ogni volta che il componente si monta o photos cambia, vuoi rifetchare i dati
        fetchData();
    }, [fetchData]); // Dipendenza su fetchData per rifare la chiamata


    return(
        <>
            {/* Campo di ricerca */}
            <input
                type="text"
                placeholder="Cerca per titolo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {filteredPhotos.length > 0 ? (
                <ul>
                    {filteredPhotos.map((p) => (
                        <li key={`photo${p.id}`}>
                            <ul>
                                <li>{`title: ${p.title}`}</li>
                                <li>{`description: ${p.description}`}</li>
                                <li><img style={{width:"200px"}} src={p.img} alt={p.title} /></li>
                                <li><Link to={`/photos/${p.id}`}>foto singola</Link></li>
                                <li><Link to={`/photos/${p.id}/edit`}>edita foto</Link></li>
                                <li><button onClick={() => deletePhoto(p.id)}>Elimina foto</button></li>
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna foto trovata</p>
            )}
        </>
    );
}