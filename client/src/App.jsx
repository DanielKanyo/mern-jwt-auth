import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Validation from "./components/auth/user/Validation";

const ProtectedRoute = ({ authenticated, token, redirectPath = "/login" }) => {
    if (!authenticated || !token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

const App = () => {
    const [authenticated, setAutheticated] = useState(false);
    const [token, setToken] = useState("");

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
                <Route
                    path="/validation"
                    element={<Validation setAutheticated={setAutheticated} setToken={setToken} />}
                ></Route>

                <Route element={<ProtectedRoute authenticated={authenticated} token={token} />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App;
