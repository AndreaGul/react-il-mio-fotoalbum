import { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { Link } from "react-router-dom";

export default function Messages() {
    
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/messages');
            setMessages(response.data); // Assegna response.data per ottenere i dati effettivi
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <>
            <h1>Messaggi</h1>
            <Link to='/administration'>torna all'area amministrativa</Link>
            {messages.length > 0 &&
                <ul>
                    {messages.map((p) => (
                        <li key={`message${p.id}`}>
                            <ul>
                                <li>{`${p.email}`}</li>
                                <li>{`${p.content}`}</li>
                            </ul>
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}