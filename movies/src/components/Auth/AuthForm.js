import {
    Box,
    FormLabel,
    TextField,
    Typography,
    Button,
    IconButton,
    Card,
    CardContent,
    Snackbar,
    Alert,
    InputAdornment
} from '@mui/material';
import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon for the button
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email'; // Icon for email
import LockIcon from '@mui/icons-material/Lock';   // Icon for password
import { auth, googleProvider, facebookProvider } from "../../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/index';
//port {  } from '@mui/material';

import axios from 'axios';
const labelStyle = { mt: 1, mb: 1, fontWeight: 'bold', color: '#333' };

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [error, setError] = useState(false);

    const isLoggedin = useSelector((state) => state.user.isLoggedIn);
    console.log(isLoggedin);
    const dispatch = useDispatch();
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowSnackbar(false);
    };
    const handleChange = (e) => {

        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setInputs((prevState) => ({
            ...prevState,
            email: value,
        }));

        // Check if the email does not end with "@gmail.com"
        if (value && !gmailRegex.test(value)) {
            setError(true); // Show error popup
        } else {
            setError(false); // Hide error popup
        }
    };

    const validatePassword = (password) => {
        // Ensure the password is at least 6 characters long and contains both alphabetic characters and numbers
        const regex = /^(?=.*[A-Z)(?=.*A-Z])(?=.*\d).{6,}$/;
        return regex.test(password);
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!isAdmin && isSignup && !inputs.name) {
    //         setErrorMessage("Please enter your name");
    //         return;
    //     }

    //     if (!inputs.email) {
    //         setErrorMessage("Please enter your email address");
    //         return;
    //     }

    //     if (error) { // email format error
    //         setErrorMessage("Please enter a valid Gmail ID (example@gmail.com)");
    //         return;
    //     }

    //     if (!inputs.password) {
    //         setErrorMessage("Please enter your password");
    //         return;
    //     }
    //     if (!validatePassword(inputs.password)) {
    //         setErrorMessage("Password must contain at least 6 characters, including letters and numbers");
    //         return;
    //     }
    //     // Simulate calling the onSubmit prop function and awaiting a response
    //     try {
    //         const response = await onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    //         console.log("response", response);
    //         console.log(response); // Full response
    //         console.log(response.data); // Data inside response (typical for axios)
    //         console.log(response.status); // Status code

    //         if (response.status === 200) {
    //             setErrorMessage(""); // Clear error message
    //             // Handle success (e.g., redirect or store user data)
    //         } else {
    //             // If response is not successful, show the error message from API
    //             setErrorMessage(response.data.message || "An error occurred. Please try again.");
    //         }


    //     } catch (error) {
    //         // Handle any unexpected errors (e.g., network issues)
    //         setErrorMessage(error.response?.data?.message || "An unexpected error occurred.");
    //     }

    //     console.log(inputs);  // Log the inputs for debugging purposes
    // }
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!isAdmin && isSignup && !inputs.name) {
        setErrorMessage("Please enter your name");
        return;
    }

    if (!inputs.email) {
        setErrorMessage("Please enter your email address");
        return;
    }

    if (error) { // email format error
        setErrorMessage("Please enter a valid Gmail ID (example@gmail.com)");
        return;
    }

    if (!inputs.password) {
        setErrorMessage("Please enter your password");
        return;
    }

    if (!validatePassword(inputs.password)) {
        setErrorMessage("Password must contain at least 6 characters, including letters and numbers");
        return;
    }

    // Log inputs and signup status for debugging
    console.log("Inputs being sent:", inputs);
    console.log("Is Admin:", isAdmin);
    console.log("Is Signup:", isSignup);

    try {
        const response = await onSubmit({ inputs, signup: isAdmin ? false : isSignup });
        
        if (response && !response.success) {
            // If the response indicates failure, set the error message
            setErrorMessage(response.message || "An error occurred. Please try again.");
        } else {
            // Clear the error message if the login/signup is successful
            setErrorMessage("");
        }
        
    } catch (error) {
        // Handle any unexpected errors (e.g., network issues)
        setErrorMessage("An unexpected error occurred.");
    }

    console.log(inputs);  // Log the inputs for debugging purposes
};


    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            console.log("Google Sign-In successful:", user);

            // Send user data and access token to the backend
            const response = await axios.post("http://localhost:5000/users/google-login", {
                email: user.email,
                name: user.displayName,
                accessToken: user.stsTokenManager.accessToken, // Send the access token
            });

            if (response.status === 200 || response.status === 201) {
                console.log("User logged in via Google:", response.data);

                // Save user details to localStorage or context
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("accessToken", user.stsTokenManager.accessToken);
                dispatch(userActions.login());
                // Redirect to home page
                navigate("/");
            } else {
                console.error("Google Login Error:", response.data.message);
                setErrorMessage(response.data.message || "Google Login failed.");
            }
        } catch (error) {
            console.log("Google Sign-In error:", error.message);
            setErrorMessage("Google Sign-In failed. Please try again.");
        }
    };

    // const handleFacebookSignIn = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, facebookProvider);
    //         const user = result.user;

    //         console.log("Facebook Sign-In successful:", user);

    //         // Send user data and access token to the backend
    //         const response = await axios.post("http://localhost:5000/users/facebook-login", {
    //             email: user.email,
    //             name: user.displayName,
    //             accessToken: user.stsTokenManager.accessToken, // Send the access token
    //         });

    //         if (response.status === 200 || response.status === 201) {
    //             console.log("User logged in via Facebook:", response.data);

    //             // Save user details to localStorage or context
    //             localStorage.setItem("userId", response.data.id);
    //             localStorage.setItem("accessToken", user.stsTokenManager.accessToken);
    //             dispatch(userActions.login());
    //             // Redirect to home page
    //             navigate("/");
    //         } else {
    //             console.error("Facebook Login Error:", response.data.message);
    //             setErrorMessage(response.data.message || "Facebook Login failed.");
    //         }
    //     } catch (error) {
    //         console.log("Facebook Sign-In error:", error.message);
    //         setErrorMessage("Facebook Sign-In failed. Please try again.");
    //     }
    // };

    const handleFacebookSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;

            console.log("Facebook Sign-In successful:", user);

            // Send user data to backend to check if they have a password
            const response = await axios.post("http://localhost:5000/users/facebook-login", {
                email: user.email,
                name: user.displayName,
                accessToken: user.stsTokenManager.accessToken, // Send the access token
            });

            if (response.status === 200 || response.status === 201) {
                const userData = response.data.user;
                localStorage.setItem("userEmail", user.email);
                localStorage.setItem("userId", userData._id);
                // If password is null, redirect to password setup page
                if (!userData.password) {

                    navigate("/set-password", { state: { userId: userData.id, email: user.email } });
                } else {
                    // If password exists, proceed to the home page
                    dispatch(userActions.login({ email: user.email, isLoggedIn: true }));
                    navigate("/");
                }
            } else {
                console.error("Facebook Login Error:", response.data.message);
                setErrorMessage(response.data.message || "Facebook Login failed.");
            }
        } catch (error) {
            console.log("Facebook Sign-In error:", error.message);
            setErrorMessage("Facebook Sign-In failed. Please try again.");
        }
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card sx={{
                maxWidth: 500,
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                background: 'white',
            }}>
                <Box sx={{
                    padding: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    borderBottom: '1px solid #eee'
                }}>
                    <IconButton
                        component={Link}
                        to="/"
                        sx={{
                            color: 'text.secondary',
                            marginBottom: '-19px'
                        }}
                    >
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                <Typography
                    variant="h5"
                    padding={2}
                    textAlign='center'
                    sx={{
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: '1.4rem',
                        marginBottom: '-17px'
                    }}
                >
                    {isSignup ? "Create Account" : "Welcome Back"}
                </Typography>

                <CardContent sx={{ padding: 2 }}>
                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {!isAdmin && isSignup && (
                                <>
                                    <FormLabel sx={labelStyle}>Name</FormLabel>
                                    <TextField
                                        fullWidth
                                        size='small'
                                        value={inputs.name}
                                        onChange={handleChange}
                                        variant="outlined"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        sx={{ mb: 0 }}
                                    />
                                </>
                            )}

                            <FormLabel sx={labelStyle}>Email</FormLabel>
                            <TextField
                                fullWidth
                                size='small'
                                value={inputs.email}
                                onChange={handleEmailChange}
                                variant="outlined"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                sx={{ mt: 0 }}
                                autoComplete="off"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}

                            />
                            {error && (
                                <div
                                    style={{
                                        marginTop: "10px",
                                        padding: "10px",
                                        color: "white",
                                        backgroundColor: "red",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Please enter a valid Gmail ID (e.g., example@gmail.com)
                                </div>
                            )}

                            <FormLabel sx={labelStyle}>Password</FormLabel>
                            <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={inputs.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"} // Toggle between text and password
                                    name="password"
                                    placeholder="Enter your password"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">

                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    sx={{
                                                        position: "absolute",
                                                        right: 10, // Inside the field
                                                        color: "gray",
                                                    }}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Box>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{
                                    py: 1,
                                    textTransform: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    borderRadius: 5,
                                    mt: '-10px',
                                    backgroundColor: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                        fontWeight: 'bold'
                                    },
                                }}
                            >
                                {isSignup ? "Sign Up" : "Login"}
                            </Button>

                            {!isAdmin && (
                                <>
                                    <Button
                                        onClick={() => setisSignup(!isSignup)}
                                        sx={{
                                            // mt: 0.5,
                                            mt: '0px',
                                            textTransform: 'none',
                                            color: 'text.secondary',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {isSignup
                                            ? "Already have an account? Login"
                                            : "Don't have an account? Sign Up"}
                                    </Button>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        my: 1
                                    }}>
                                        <Box sx={{ flex: 1, borderTop: '1px solid #eee', mt: '-23px' }} />
                                        <Typography sx={{ mx: 2, color: 'text.secondary', fontSize: '1rem', mt: '-25px' }}>
                                            or
                                        </Typography>
                                        <Box sx={{ flex: 1, borderTop: '1px solid #eee', mt: '-23px' }} />
                                    </Box>

                                    <Button
                                        fullWidth
                                        size="small"
                                        onClick={handleGoogleSignIn}
                                        variant="outlined"
                                        startIcon={<GoogleIcon sx={{ fontSize: 18 }} />}
                                        sx={{
                                            py: 1,
                                            textTransform: 'none',
                                            fontSize: '0.9rem',
                                            borderColor: '#DB4437',
                                            color: '#DB4437',
                                            mt: '-22px',
                                            '&:hover': {
                                                borderColor: '#DB4437',
                                                backgroundColor: 'rgba(219, 68, 55, 0.04)',
                                            },
                                        }}
                                    >
                                        Sign in with Google
                                    </Button>
                                    <Box>
                                        <Button
                                            fullWidth
                                            size="small"
                                            onClick={handleFacebookSignIn}
                                            variant="outlined"
                                            startIcon={<FacebookIcon sx={{ fontSize: 18 }} />}
                                            sx={{
                                                py: 1,
                                                textTransform: 'none',
                                                fontSize: '0.9rem',
                                                borderColor: '#DB4437',
                                                color: '#DB4437',
                                                mt: '-22px',
                                                '&:hover': {
                                                    borderColor: '#DB4437',
                                                    backgroundColor: 'rgba(219, 68, 55, 0.04)',
                                                },
                                            }}
                                        >
                                            Sign in with FaceBook
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </Box>
                    </form>
                </CardContent>
            </Card>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {isSignup ? "Signup successful! Please log in." : "Successfully logged in!"}
                </Alert>
            </Snackbar>

            {errorMessage && (
                <Snackbar
                    open={!!errorMessage}
                    autoHideDuration={6000}
                    onClose={() => setErrorMessage('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setErrorMessage('')}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorMessage}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};

export default AuthForm;
