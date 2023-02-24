import { Link } from "react-router-dom";

const Navigation = ({ authenticated, setAutheticated }) => {
    const handleLogout = () => {
        sessionStorage.clear();
        setAutheticated(false);
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
