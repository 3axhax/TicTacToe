import React from 'react';
import {Link, Outlet} from "react-router-dom";

const MainLayout: React.FC = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/auth">Auth</Link>
                    </li>
                </ul>
            </nav>

            <hr/>
            <Outlet/>
        </div>
    )
}

export default MainLayout;