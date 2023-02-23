import { Link } from "react-router-dom";

const Navigation = ({ authenticated, setAutheticated, setToken }) => {
    const handleLogout = () => {
        setAutheticated(false);
        setToken("");
    }

    return (
        <div>
            <nav>
                {
                    authenticated ? <Link to="/home"><button>Home</button></Link> : null
                }
                {
                    !authenticated ? <Link to="/register"><button>Register</button></Link> : null
                }
                {
                    !authenticated ? <Link to="/login"><button>Login</button></Link> : null
                }
                {
                    authenticated ? <button onClick={handleLogout}>Logout</button> : null
                }
            </nav>
        </div>
    )
}

export default Navigation;
