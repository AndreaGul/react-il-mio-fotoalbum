import { Link } from "react-router-dom"

export default function () {
    return(
        <>
        <h1>singola categoria</h1>
        <ul>
            <li><Link to='/categories/:id/edit'>edita categoria</Link></li>
        </ul>
        </>
    )
}