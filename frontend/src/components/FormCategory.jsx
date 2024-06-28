import { useEffect, useState } from "react";

export default function FormCategory({ initialData, onSubmit }) {
    

    const defaultData = initialData || {
        name: "",
        // userId: 1
    };

    const [formData, setFormData] = useState(defaultData);

    useEffect(()=>{
        if(initialData){
            setFormData(initialData);
        }
    },[initialData])

    const handleField = (objKey, value) => {
        setFormData(curr => ({
            ...curr,
            [objKey]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <>
            <h1>Form Foto</h1>
            <form onSubmit={handleSubmit}>
                
                    <label >
                        <div>name</div>
                        <input
                            type="text"
                        onChange={(e) => handleField('name', e.target.value)}
                    />
                    </label>
                            
                <button type="submit">Salva</button>
            </form>
        </>
    );
}