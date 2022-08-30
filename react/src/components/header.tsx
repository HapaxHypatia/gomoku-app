import React from "react";
import japanese from "../img/japanese.png"
import {Navbar} from "./index";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const nav = useNavigate()
    return (
<header>
    <img onClick={() =>nav("/")} src = {japanese} height={"50px"}/>
    <Navbar></Navbar>
</header>
    );
}