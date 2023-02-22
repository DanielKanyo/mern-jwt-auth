import { useRef } from "react";
import axios from "axios";

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const port = import.meta.env.VITE_API_PORT;

        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const configuration = {
            method: "post",
            url: `${baseUrl}:${port}/register`,
            data: {
                name,
                email,
            },
        };

        axios(configuration)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div>Register</div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="name" ref={nameRef} />
                <input type="text" placeholder="e-mail address" ref={emailRef} />

                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
