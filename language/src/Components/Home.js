import React from "react";
import "./home.css";

const Home = () =>{
    return(
        <nav>
            <ul id='MenuItems'>
                <li><a href='/'>Home</a></li>
                <li><a href='/t'>Login</a></li>
                <li><a href='/r'>Register</a></li>
                <li><a href='#'>Help?</a></li>
            </ul>
        </nav>
    );
}
export default Home;