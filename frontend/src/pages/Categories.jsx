import { Link } from "react-router-dom"

export default function () {
    return(
        <>
        <h1>categorie</h1>
        <ul>
            <li><Link to='/categories/:id'>categoria singola</Link></li>
            <li><Link to='/categories/:id/edit'>edita categoria</Link></li>
        </ul>
        </>
    )
}