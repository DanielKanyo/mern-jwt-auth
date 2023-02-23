import { Routes, Route } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Landing from "./components/landing/Landing";
import Validation from "./components/user/Validation";

const App = () => {
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<Landing />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/validation" element={<Validation />}></Route>
            </Routes>
        </div>
    )
}

export default App;
