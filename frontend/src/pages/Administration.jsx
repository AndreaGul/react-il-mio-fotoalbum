import { Link } from "react-router-dom"

export default function () {
    return(
        <>
        <h1>area aministrativa</h1>
        <Link to='/messages'>messaggi</Link>
        <ul>
            <li><Link to='/photos'>lista foto</Link></li>
            <li><Link to='/photos/create'>crea foto</Link></li>
            </ul>

        <ul>
            <li><Link to='/categories'>lista categorie</Link></li>
            <li><Link to='/categories/create'>crea categoria</Link></li>
        </ul>
        </>

        
    )
}