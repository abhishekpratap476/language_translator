import React, { useState } from "react";
import "./nav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const history = useNavigate();
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/kit", {
        userName,
        password,
      });

      if (response.data.status === "success") {
        history("/tf", { state: { id: userName } });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data.message);
      
      setError(error.response.data.message);
      setuserName("");
      setPassword("");
    }
  }

  return (
    <div>
      {error && <div className="alert">{error}</div>}
      
      <div className="wraper">
        <main>
          <h2 className="adj">Login</h2>
          <form className="adj">
            <div className="input">
              <input
                type="text"
                required
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
              />
              <label>Username</label>
            </div>
            <div className="input">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            <button className="btn" onClick={submit}>
              Login
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Register;