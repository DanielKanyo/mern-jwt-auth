import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const port = import.meta.env.VITE_API_PORT;

        axios({
            method: "get",
            url: `${baseUrl}:${port}/account`,
            headers: { sessionToken: sessionStorage.getItem("sessionToken") }
        }).then((result) => {
            const { _id, name, email } = result.data;

            setUserId(_id);
            setName(name);
            setEmail(email);
        }).catch((error) => {
            console.log(error);
        });
    });

    return (
        <div>
            <div>
                Home (Only for logged in users)
            </div>

            <br />

            <div>userId: {userId}</div>
            <div>name: {name}</div>
            <div>email: {email}</div>
        </div>
    )
}

export default Home;
