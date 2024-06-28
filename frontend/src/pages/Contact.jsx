import { useState } from 'react';
import axios from "../utils/axiosClient";

export default function () {
  const defaultData = {
    email: "",
    content: "",
  };

  const [formData, setFormData] = useState(defaultData);
  const [responseMessage, setResponseMessage] = useState("");

  const handleField = (objKey, value) => {
    setFormData(curr => ({
      ...curr,
      [objKey]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ciao'); // Aggiungi il console.log qui
    onSubmit(formData);
    setFormData(defaultData)
  };

  const onSubmit  = async (formData) => {
    try {
        console.log(formData);

        const res = await axios.post(`/messages`, formData);
        console.log(res);
        if (res.status < 400) {
            console.log('Messaggio inviato con successo');
        }
    } catch (error) {
        console.error('Errore nella creazione della foto:', error);
    }
}


  return (
    <div>
      <h2>Invia un Messaggio</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(defaultData).map((objKey, index) => (
          <label key={`formElement${index}`}>
            {objKey}
            <input
              required
              name={objKey}
              type="text"
              placeholder=""
              value={formData[objKey]}
              onChange={(e) => handleField(objKey, e.target.value)}
            />
          </label>
        ))}
        <button type="submit">Invia</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

