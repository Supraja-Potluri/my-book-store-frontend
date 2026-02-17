import { useState } from "react";
import "./AuthPage.css";
import loginImg from "../assets/login-page-img.png";
import { Eye, EyeOff, User, Mail, Phone, Home, Lock } from "lucide-react";

const AuthPage = ({ onForward, onSuccess }) => {
  const [mode, setMode] = useState("signin");
  
  // Sign In Fields
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInShowPwd, setSignInShowPwd] = useState(false);
  
  // Sign Up Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpShowPwd, setSignUpShowPwd] = useState(false);
  const [signUpShowConfirm, setSignUpShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const validateSignUp = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!signUpUsername.trim()) newErrors.signUpUsername = "Username is required";
    if (!signUpPassword) newErrors.signUpPassword = "Password is required";
    else if (signUpPassword.length < 6) newErrors.signUpPassword = "Password must be at least 6 characters";
    if (signUpPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignIn = () => {
    const newErrors = {};
    if (!signInUsername.trim()) newErrors.signInUsername = "Username is required";
    if (!signInPassword) newErrors.signInPassword = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validateSignIn()) {
      onSuccess?.({ username: signInUsername });
      onForward?.();
    }
  };

  const handleSignUp = () => {
    if (validateSignUp()) {
      onSuccess?.({ username: signUpUsername, firstName, lastName });
      onForward?.();
    }
  };

  return (
    <div className="auth">
      <div className="auth-illustration">
        <img src={loginImg} alt="Books and reading" />
      </div>
      <div className="card-panel">
        <div className="card">
          {mode === "signin" ? (
            <>
              <h2>Sign In</h2>
              <p className="subtitle">Welcome back — continue your reading journey.</p>

              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <User size={18} />
                  <input
                    placeholder="Enter your username"
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                  />
                </div>
                {errors.signInUsername && <span className="error">{errors.signInUsername}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper password-wrapper">
                  <Lock size={18} />
                  <input
                    placeholder="Enter your password"
                    type={signInShowPwd ? "text" : "password"}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={() => setSignInShowPwd(!signInShowPwd)}
                  >
                    {signInShowPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.signInPassword && <span className="error">{errors.signInPassword}</span>}
              </div>

              <button className="primary-btn" onClick={handleSignIn}>
                Sign In
              </button>

              <p className="switch">
                Don't have an account? <span onClick={() => { setMode("signup"); setErrors({}); }}>Create one</span>
              </p>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <p className="subtitle">Join our community of book lovers.</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-wrapper">
                    <User size={18} />
                    <input
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-wrapper">
                    <User size={18} />
                    <input
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-wrapper">
                  <Mail size={18} />
                  <input
                    placeholder="your.email@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <Phone size={18} />
                  <input
                    placeholder="10-digit phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Address</label>
                <div className="input-wrapper">
                  <Home size={18} />
                  <input
                    placeholder="Your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                {errors.address && <span className="error">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <User size={18} />
                  <input
                    placeholder="Choose a username"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                  />
                </div>
                {errors.signUpUsername && <span className="error">{errors.signUpUsername}</span>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper password-wrapper">
                  <Lock size={18} />
                  <input
                    placeholder="Create a password"
                    type={signUpShowPwd ? "text" : "password"}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={() => setSignUpShowPwd(!signUpShowPwd)}
                  >
                    {signUpShowPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.signUpPassword && <span className="error">{errors.signUpPassword}</span>}
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper password-wrapper">
                  <Lock size={18} />
                  <input
                    placeholder="Confirm password"
                    type={signUpShowConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={() => setSignUpShowConfirm(!signUpShowConfirm)}
                  >
                    {signUpShowConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>

              <button className="primary-btn" onClick={handleSignUp}>
                Register
              </button>

              <p className="switch">
                Already have an account? <span onClick={() => { setMode("signin"); setErrors({}); }}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
