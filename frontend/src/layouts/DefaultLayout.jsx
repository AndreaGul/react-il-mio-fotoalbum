import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
export default function (){
    return (<>
        <NavBar/>
        <Outlet/>
       
    </>)
}