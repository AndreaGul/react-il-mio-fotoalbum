import { Link } from "react-router-dom"
import { useGlobal } from "../contexts/GlobalContext"
import DeleteEl from "../components/DeleteEl";
import { useEffect } from "react";

export default function () {
    
    const { categories,fetchData } =  useGlobal();
    const { deleteCategory } = DeleteEl();

   
    return(
        
        <>
        {categories.length &&
            <ul>
                {categories.map((p)=>(
                    <li key={`category${p.id}`}>
                        <ul>
                            <li>{`${p.name}`}</li>
                            <li><Link to='/categories/:id/edit'>edita categoria</Link></li>
                            <button onClick={() =>deleteCategory(p.id)}>Elimina foto</button>
                        </ul>
                    </li>
                ))}
                
            </ul>
        }
        </>
    )
}