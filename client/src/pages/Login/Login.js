import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import "./Login.css";

function Login() {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const { setAuthState } = useContext(AuthContext);

     let history = useHistory();

     const login = () => {
          const data = { username: username, password: password };
          axios.post("http://localhost:3001/auth/login", data).then(
               (response) => {
                    if (response.data.error) {
                         alert(response.data.error);
                    } else {
                         localStorage.setItem(
                              "accessToken",
                              response.data.token
                         );
                         setAuthState({
                              username: response.data.username,
                              id: response.data.id,
                              status: true,
                         });
                         history.push("/");
                    }
               }
          );
     };

     return (
          <div className="login">
               <div className="loginContainer">
                    <h1>Prijava</h1>
                    <label>Korisničko ime:</label>
                    <input
                         id="inputLogin"
                         type="text"
                         onChange={(event) => {
                              setUsername(event.target.value);
                         }}
                    />
                    <label>Lozinka:</label>
                    <input
                         id="inputLogin"
                         type="password"
                         onChange={(event) => {
                              setPassword(event.target.value);
                         }}
                    />

                    <button onClick={login}> Login </button>
               </div>
          </div>
     );
}

export default Login;
