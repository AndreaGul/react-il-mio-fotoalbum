import { useState } from "react";
import { useGlobal } from "../contexts/GlobalContext";

export default function ({initialData, onSubmit}) {
    const { categories } = useGlobal()
    console.log(categories);
    const defaultData = initialData || {
        "title":"",
        "description":"",
        " visible": false,
        "img":"",
        "categories":[],
        "userId": 1
    }

    const [formData, setFormData] = useState(defaultData);

    const handleField = (objKey,value)=>{
        setFormData(curr => ({
            ...curr,
            [objKey] : value
        }))
    }

    return(
        <>
        <h1>form foto</h1>
        </>
    )
}