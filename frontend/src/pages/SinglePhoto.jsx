import { Link } from "react-router-dom"


export default function () {
    return(
        <>
        <h1>foto singola</h1>
        <ul>
            <li><Link to='/photos/:id/edit'>edita foto</Link></li>
        </ul>
        </>
        
    )
}