import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../common/context/authContext";
import AuthRoutes from "./AuthRoutes";
import OtherRoutes from "./OtherRoutes";


const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    const [signed, setSigned] = useState(true)
    useEffect(
        ()=>{
            isAuthenticated().then(e=>{
                alert(e);
                setSigned(e)})
           
        }
    ,[])
    return (
        // <Outlet />
        signed ? <OtherRoutes/> : <AuthRoutes/>
    )
}

export default AppRoutes;


