import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PasswordField = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Retrieve the user's email from localStorage
    const userEmail = localStorage.getItem("userEmail");

    // If email is not found, redirect to login page
    if (!userEmail) {
        navigate("/login");
    }

    const handlePasswordSubmit = async (password) => {
        if (!password) {
            setErrorMessage("Password is required.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            // Send the email and password to the backend
            const response = await axios.post("http://localhost:5000/users/set-password", {
                email: userEmail,
                password,
            });

            if (response.status === 200) {
                console.log("Password updated successfully");

                // After successful password update, navigate to the home page
                navigate("/"); // Assuming you use react-router-dom for navigation
            } else {
                setErrorMessage(response.data.message || "Failed to update password.");
            }
        } catch (error) {
            console.error("Error setting password:", error.message);
            setErrorMessage("Error setting password. Please try again.");
        }
    };

    return (
        <Box>
            <h2>Set Your Password</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={(e) => { e.preventDefault(); handlePasswordSubmit(password); }}>
                {/* Display email in a read-only field */}
                <input
                    type="email"
                    value={userEmail}
                    readOnly
                    required
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit">Set Password</Button>
            </form>
        </Box>
    );
};

export default PasswordField;
