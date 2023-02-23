import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Validation = ({ setAutheticated, setToken }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        if (!token) {
            console.log("Validation not possible without a token...");
            navigate("/login");
            return;
        }

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const port = import.meta.env.VITE_API_PORT;

        const configuration = {
            method: "get",
            url: `${baseUrl}:${port}/authenticate?token=${token}`,
        };

        axios(configuration)
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
            Validating...
        </div>
    )
}

export default Validation;
