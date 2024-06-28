import { useEffect, useState } from "react";
import { useGlobal } from "../contexts/GlobalContext";

export default function FormPhoto({ initialData, onSubmit }) {
    const { categories } = useGlobal();

    const defaultData = initialData || {
        title: "",
        description: "",
        visible: false,
        img: "",
        categories: [],
        userId: 1
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
                {Object.keys(defaultData).map((objKey, index) => {
                    const value = defaultData[objKey];
                    if (Array.isArray(value)) {
                        return (
                            <div key={`formElement${index}`}>
                                <p>Categorie:</p>
                                <ul>
                                    {categories.map(({ id, name }, index) => (
                                        <li key={`category${index}`}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.categories.includes(id)}
                                                    onChange={() => {
                                                        const curr = formData.categories;
                                                        const newCategories = curr.includes(id)
                                                            ? curr.filter(el => el !== id)
                                                            : [...curr, id];
                                                        handleField('categories', newCategories);
                                                    }}
                                                />
                                                {name}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    }
                    switch (typeof value) {
                        case 'boolean':
                            return (
                                <label key={`formElement${index}`}>
                                    {objKey}
                                    <input
                                        name={objKey}
                                        type="checkbox"
                                        checked={formData[objKey]}
                                        onChange={(e) => handleField(objKey, e.target.checked)}
                                    />
                                </label>
                            );
                        case 'string':
                        default:
                            if (objKey === 'img') {
                                return (
                                    <label key={`formElement${index}`}>
                                        {objKey}
                                        <input
                                            type="file"
                                            onChange={(e) => handleField(objKey, e.target.files[0])}
                                        />
                                    </label>
                                );
                            }
                            return (
                                <label key={`formElement${index}`}>
                                    {objKey}
                                    <input
                                        required
                                        name={objKey}
                                        type={typeof value === 'number' ? 'number' : 'text'}
                                        placeholder={objKey}
                                        value={formData[objKey] || ''}
                                        onChange={(e) => handleField(objKey, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                                    />
                                </label>
                            );
                    }
                })}
                <button type="submit">Salva</button>
            </form>
        </>
    );
}