import React from "react";
import {useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {UserContext} from "../context";

export default function Navbar() {
    const nav = useNavigate()
    const location = useLocation()
    const { user, logout } = useContext(UserContext)
    const getActions = () => {
        if (user) {
            return (
                <>
                    <button onClick={() => nav('/gameHistory')}>Game History</button>
                    <button onClick={() => {logout(); nav('/')}}>Logout</button>
                </>
        )
        }
        else {
            return location.pathname !== '/login' ? (
                <button onClick={() => nav('login')}>Login</button>
            ) : (
                <button onClick={() => nav('signup')}>Sign up</button>
            )
        }
    };

    return (
        <nav>
            {getActions()}
        </nav>


    );
}