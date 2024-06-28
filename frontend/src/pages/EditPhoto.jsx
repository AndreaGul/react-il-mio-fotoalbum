import axios from "../utils/axiosClient";
import FormPhoto from "../components/FormPhoto"
import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

export default function () {
    const {id} = useParams();

    const navigate = useNavigate();

    const [dataToEdit, setDataToEdit] = useState(null);

    const [loginError, setLoginError]= useState(null);

    const fetchDataToEdit = async ()=>{
        const url= `/photos/${id}`;
        const response = await axios.get(url);
        const p = response.data.photo
        console.log(p )
        setDataToEdit({
            title: p.title,
            description:  p.description,
            visible:  p.visible,
            img: '',
            categories:  p.categories.map(i=>parseInt(i.id))
        })
    }

    useEffect(()=>{
        fetchDataToEdit();
        
    },[id])

    const updatePhoto = async formData =>{
        try{
            console.log(formData);
            const res = await axios.put(`/photos/${id}`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res);
            if (res.status < 400) {
                navigate(`/photos/${res.data.id}`)
            } 
        }catch (error) {
            setLoginError(error)
            console.error('Errore nella modifica della foto:', error);
        }
       
    
    }

    return(
        <>
        <h1>edita foto</h1>
        <Link to={`/photos`}>torna alla lista</Link>
        <FormPhoto
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