import { useState, useRef } from "react";
import axios from "axios";

const Login = () => {
    const emailRef = useRef();
    const [tokenSent, setTokenSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const port = import.meta.env.VITE_API_PORT;

        axios({
            method: "post",
            url: `${baseUrl}:${port}/login`,
            data: { email: emailRef.current.value },
        }).then((result) => {
            setTokenSent(true);
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <div>Login</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="e-mail address" ref={emailRef} />

                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>
                {
                    tokenSent ? "Login token sent to your e-mail address..." : ""
                }
            </p>
        </div>
    )
}

export default Login;
