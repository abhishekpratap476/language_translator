import React, { useState } from "react";
import "./nav.css";

const Login = () => {
  const [name, setName] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log(name, userName, email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addUser = { name, userName, email, password };

    const response = await fetch("http://localhost:8000/tr", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
      
      setName("");
      setuserName("");
      setEmail("");
      setPassword("");
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setuserName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div>
      <main>
        {error && <div className="alert">{error}</div>}
        
        <div className="wrapper">
          <h2 className="adj">Register</h2>

          <form className="adj" onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                name="su"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Name</label>
            </div>
            <div className="input">
              <input type="text" required value={userName} onChange={(e) => setuserName(e.target.value)}/>
              <label>Username</label>
            </div>
            <div className="input">
              <input
                type="email"
                name="s"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
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
            <button className="btn">Register</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
