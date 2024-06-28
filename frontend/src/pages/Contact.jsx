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
    try {
      console.log('Dati del form:', formData);
      const res = await axios.post(`/messages`, formData);
      console.log('Risposta dal server:', res);
      if (res.status < 400) {
        setResponseMessage('Messaggio inviato con successo');
      } else {
        setResponseMessage('Si è verificato un errore nell\'invio del messaggio');
      }
      setFormData(defaultData); // Ripristina il form dopo l'invio
    } catch (error) {
      console.error('Errore nella creazione del messaggio:', error);
      setResponseMessage('Si è verificato un errore nella creazione del messaggio');
    }
  };

  return (
    <div>
      <h1>Invia un Messaggio</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Email</div>
          <input
            required
            name='email'
            type="email"
            placeholder="Inserisci la tua email"
            value={formData.email} // Correggi il valore dell'input
            onChange={(e) => handleField("email", e.target.value)}
          />
        </label>
        <label>
          <div>Contenuto</div>
          <textarea
            required
            name="content"
            placeholder="Inserisci il contenuto del messaggio"
            value={formData.content} // Correggi il valore dell'input
            onChange={(e) => handleField("content", e.target.value)}
          />
        </label>
        <button type="submit">Invia</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};
