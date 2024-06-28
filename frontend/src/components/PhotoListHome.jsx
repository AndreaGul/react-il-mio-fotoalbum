import { Link } from "react-router-dom"
import { useGlobal } from "../contexts/GlobalContext"

export default function () {
    
    const { photos } =  useGlobal();
   

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
                        </ul>
                    </li>
                ))}
                
            </ul>
        }
        </>
    )
}