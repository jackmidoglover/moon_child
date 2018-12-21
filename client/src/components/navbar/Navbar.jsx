import React from "react";
import { Link } from "react-router-dom";
import './navbar.css';

const Navbarre = props => (
    <nav id="transparent">
        <div className="nav-wrapper">
            <ul class="right">
                <li
                className={
                    window.location.pathname === "/Home"
                        ? "active"
                        : null
                }>
                    <Link to="/Home">
                    Home</Link>
                </li>
                <li>
                    <Link
                        to="/About"
                        className={
                            window.location.pathname === "/About"
                                ? "active"
                                : null
                        }
                    >
                    About</Link>
                </li>
                <li>
                    <Link
                        to="/Journal"
                        className={
                            window.location.pathname === "/Journal"
                                ? "active"
                                : null
                        }
                    >
                    Journal</Link>
                </li>
                <li>
                    <Link
                        to="/Calendar"
                        clasName={
                            window.location.pathname === "/Calendar"
                                ? "active"
                                : null
                        }
                    >
                    Calendar</Link>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbarre;