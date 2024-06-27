import { Link, useParams } from "react-router-dom"
import axios from "../utils/axiosClient";
import { useEffect, useState } from "react";

export default function () {
    const[photo,setPhoto] = useState([]);

    const singleImg = async ()=>{
        try{
            const responce = await axios.get(`/photos/${id}`);
            console.log(responce.data);
            setPhoto(responce.data.photo)
        }catch(err){
            console.error(`Errore nella ricerca dell'immagine:${err}`)
        }
    }

    useEffect(()=>{
        singleImg()
    },[])

     const {id} = useParams();
    return(
        <>
        <h1>foto singola</h1>
            <ul>
                            <li>{`title:${photo.title}`}</li>
                            <li>{`description:${photo.description}`}</li>
                            <li><img style={{width:"200px"}} src={photo.img} alt={photo.title} /></li>
                            <li><Link to={`/photos/${id}/edit`}>edita foto</Link></li>
            </ul>

        </>
        
    )
}