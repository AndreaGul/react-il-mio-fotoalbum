import axios from "../utils/axiosClient";
import FormCategory from "../components/FormCategory";
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

export default function () {
    const {id} = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const [loginError, setLoginError]= useState(null);

    const fetchDataToEdit = async ()=>{
        const url= `/categories/${id}`;
        const response = await axios.get(url);
        const p = response.data.photo
        console.log(p )
        setDataToEdit({
            name: p.name,
        })
    }

    useEffect(()=>{
        fetchDataToEdit();
        
    },[id])

    const updatePhoto = async formData =>{
        try{
            console.log(formData);
            const res = await axios.put(`/categories/${id}`, formData)
            console.log(res);
            if (res.status < 400) {
                navigate(`/categories/${res.data.id}`)
            } 
        }catch (error) {
            setLoginError(error)
            console.error('Errore nella modifica della foto:', error);
        }
       
    
    }

    return(
        <>
        <h1>edita foto</h1>
        <Link to={`/categories`}>torna alla lista</Link>
        <FormCategory
            initialData={dataToEdit}
            onSubmit={updatePhoto}
        />
         {loginError !== null && <div style={{color:"red"}}>{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map((err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))}
        </>
    )
}