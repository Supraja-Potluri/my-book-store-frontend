// import React, { useState } from "react";
// import bookLogo from '../assets/book_logo.png';

// const FormScreen = ({ goBack }) => {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [message, setMessage] = useState("");

//   const submitData = async () => {
//     if (!name || !address || !pincode) {
//       setMessage("Please fill all fields");
//       return;
//     }

//     try {
//       // Simulate API call for demo purposes
//       setMessage("Submitting...");
      
//       // Using a timeout to simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Since we don't have a real backend, we'll simulate success
//       // In a real app, you would use:
//       // const res = await fetch("https://your-backend-api.com/addUser", { ... });
      
//       const success = true; // Simulate success
      
//       if (success) {
//         setMessage("Submitted successfully ✅");
//         // Optional: clear form
//         // setName("");
//         // setAddress("");
//         // setPincode("");
//       } else {
//         setMessage("Submission failed ❌");
//       }
//     } catch {
//       setMessage("Server error ❌");
//     }
//   };

//   return (
//     <div className="form">
//       <img src={bookLogo} alt="Logo" className="home-logo-image" style={{ width: '80px', marginBottom: '10px' }} />
//       <h2 style={{ fontFamily: 'Georgia', marginBottom: '20px', color: '#3D2C29' }}>User Details</h2>

//       <input 
//         placeholder="Username" 
//         onChange={(e) => setName(e.target.value)} 
//         value={name}
//       />
//       <input 
//         placeholder="Address" 
//         onChange={(e) => setAddress(e.target.value)} 
//         value={address}
//       />
//       <input 
//         placeholder="Pincode" 
//         onChange={(e) => setPincode(e.target.value)} 
//         value={pincode}
//       />

//       <button onClick={submitData}>Submit</button>
//       <button className="back" onClick={goBack}>Back</button>

//       {message && <p style={{ marginTop: '20px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
//     </div>
//   );
// };

// export default FormScreen;

import { useState } from "react";
import "./AuthPage.css";
import loginImg from "../assets/login-page-img.png";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = ({ onForward, onSuccess }) => {
  const [mode, setMode] = useState("signup");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [pwdFocused, setPwdFocused] = useState(false);

  return (
    <div className="auth">
      <div className="auth-illustration">
        <img src={loginImg} alt="Books and reading" />
      </div>
      <div className="card-panel">
        <div className="card">
        <h2>{mode === "signup" ? "Create Account" : "Sign In"}</h2>
        <p className="subtitle">
          {mode === "signup" ? "Join our community of readers." : "Welcome back — continue your journey."}
        </p>

        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className="password-field">
          <input
            placeholder="Password"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPwdFocused(true)}
            onBlur={() => setPwdFocused(false)}
          />
          {pwdFocused && (
            <span
              className="toggle-visibility"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPwd((v) => !v)}
              aria-hidden="true"
            >
              {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          )}
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            onSuccess?.({ username });
            onForward?.();
          }}
        >
          {mode === "signup" ? "Register" : "Sign In"}
        </button>

        <p className="switch">
          {mode === "signup" ? (
            <>Already have an account? <span onClick={() => setMode("signin")}>Sign in</span></>
          ) : (
            <>Don’t have an account? <span onClick={() => setMode("signup")}>Register</span></>
          )}
        </p>
      </div>
      </div>
    </div>
  );
};

export default AuthPage;
