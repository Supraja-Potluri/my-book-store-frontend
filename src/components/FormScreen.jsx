import React, { useState } from "react";
import bookLogo from '../assets/book_logo.png';

const FormScreen = ({ goBack }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");

  const submitData = async () => {
    if (!name || !address || !pincode) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      // Simulate API call for demo purposes
      setMessage("Submitting...");
      
      // Using a timeout to simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Since we don't have a real backend, we'll simulate success
      // In a real app, you would use:
      // const res = await fetch("https://your-backend-api.com/addUser", { ... });
      
      const success = true; // Simulate success
      
      if (success) {
        setMessage("Submitted successfully ✅");
        // Optional: clear form
        // setName("");
        // setAddress("");
        // setPincode("");
      } else {
        setMessage("Submission failed ❌");
      }
    } catch {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="form">
      <img src={bookLogo} alt="Logo" className="home-logo-image" style={{ width: '80px', marginBottom: '10px' }} />
      <h2 style={{ fontFamily: 'Georgia', marginBottom: '20px', color: '#3D2C29' }}>User Details</h2>

      <input 
        placeholder="Username" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />
      <input 
        placeholder="Address" 
        onChange={(e) => setAddress(e.target.value)} 
        value={address}
      />
      <input 
        placeholder="Pincode" 
        onChange={(e) => setPincode(e.target.value)} 
        value={pincode}
      />

      <button onClick={submitData}>Submit</button>
      
      {/* We can hide the back button if this is the main screen, or keep it if navigation allows going back */}
      {/* <button className="back" onClick={goBack}>
        Back
      </button> */}

      {message && <p style={{ marginTop: '20px', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
};

export default FormScreen;
