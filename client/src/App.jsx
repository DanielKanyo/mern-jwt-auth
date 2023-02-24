import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Navigation from "./components/navigation/Navigation";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";

const ProtectedRoute = ({ authenticated, token, redirectPath = "/login" }) => {
    if (!authenticated || !token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

const App = () => {
    const navigate = useNavigate();
    const [authenticated, setAutheticated] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            return;
        }

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const port = import.meta.env.VITE_API_PORT;

        axios({ method: "get", url: `${baseUrl}:${port}/authenticate?token=${token}` })
            .then((result) => {
                console.log(result);
                setToken(token);
                setAutheticated(true);
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
                navigate("/");
            });
    }, []);

    return (
        <div>
            <Navigation
                authenticated={authenticated}
                setAutheticated={setAutheticated}
                setToken={setToken}
            />

            <hr />

            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>

                <Route element={<ProtectedRoute authenticated={authenticated} token={token} />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;
