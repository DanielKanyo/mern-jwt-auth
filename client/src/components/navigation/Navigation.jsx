import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Landing</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navigation;
