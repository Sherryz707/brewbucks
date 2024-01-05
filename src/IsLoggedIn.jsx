import { Outlet } from "react-router-dom"

function IsLoggedIn() {
    let user = true;

     
    return <Outlet/>
}

export default IsLoggedIn
