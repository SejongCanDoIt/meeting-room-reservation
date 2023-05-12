import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("/auth/logout")
            .then(() => {
                sessionStorage.clear();
                navigate('/');
            })
    }, [])
}