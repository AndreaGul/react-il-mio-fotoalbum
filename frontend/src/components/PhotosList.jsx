import { Link } from "react-router-dom"
import { useGlobal } from "../contexts/GlobalContext"
import { useEffect } from "react";

export default function () {
    
    const { photos } =  useGlobal();
   
// useEffect(
//     ()=>{

//     },[photos])

    return(
        
        <>
        {photos.length &&
            <ul>
                {photos.map((p)=>(
                    <li key={`photo${p.id}`}>
                        <ul>
                            <li>{`title:${p.title}`}</li>
                            <li>{`description:${p.description}`}</li>
                            <li><img style={{width:"200px"}} src={p.img} alt={p.title} /></li>
                            <li><Link to={`/photos/${p.id}`}>foto singola</Link></li>
                            <li><Link to={`/photos/${p.id}/edit`}>edita foto</Link></li>
                        </ul>
                    </li>
                ))}
                
            </ul>
        }
        </>
    )
}