// @ts-nocheck
import React from 'react';
import logo from "../../assets/images/logo.png"
const Logo = () => {
    return (
        <div style={{position: "relative", width: "100%", height: "100%", padding:"10px 0"}}>
            <img src={logo} style={{height:"100%"}} alt={"Pokedex"}/>
        </div>
    );
};

export default Logo;