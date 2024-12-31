import { Box, Dialog, FormLabel, TextField, Typography, Button, IconButton } from '@mui/material';
import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google'; // Import Google icon for the button
const labelStyle = { mt: 1, mb: 2 };

const AuthForm = ({ onSubmit, isAdmin }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    //     console.log(inputs);
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simulate calling the onSubmit prop function and awaiting a response
        try {
            const response = await onSubmit({ inputs, signup: isAdmin ? false : isSignup });
             console.log("response",response);
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
    }
    const [isSignup, setisSignup] = useState(false);

    const handleGoogleSignIn = () => {
        console.log("Google Sign-In triggered");
        // Add your Google Sign-In logic here
    };
    return (
        <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
            <Box sx={{ m1: "auto", padding: 2, display: "flex", justifyContent: "flex-end" }}>
                <IconButton LinkComponent={Link} to="/">
                    <CloseRoundedIcon />
                </IconButton>
            </Box>
            <Typography
                variant="h4"
                margin={'auto'}
                padding={3}
                textAlign={'center'}
                sx={{ color: "black", fontWeight: "bold" }}
            >
                {isSignup ? "Sign Up" : "Login"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection="column"
                    width={400}
                    margin={'auto'}
                    sx={{ padding: 2 }}
                    alignContent={"center"}
                >

                    {!isAdmin && isSignup && (<>
                        {" "}
                        <FormLabel sx={labelStyle}>Name</FormLabel>
                        <TextField margin="normal" value={inputs.name} onChange={handleChange}
                            variant="standard" type="text" name="name" placeholder="Enter Name" /></>)}

                    <FormLabel sx={labelStyle}>Email</FormLabel>
                    <TextField margin="normal"
                        value={inputs.email} onChange={handleChange}
                        variant="standard" type="email" name="email" placeholder="Enter Email" />

                    <FormLabel sx={labelStyle}>Password</FormLabel>
                    <TextField margin="normal" onChange={handleChange}
                        value={inputs.password}
                        variant="standard" type="password" name="password" placeholder="Enter Password" />

                    {errorMessage && (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            bgcolor: "black",
                            color: "white",
                            ":hover": { bgcolor: "gray" },
                        }}
                        type="submit"
                        variant="contained"
                    >
                        {isSignup ? "Sign Up" : "Login"}
                    </Button>
                    {!isAdmin && (
                        <Button
                            onClick={() => setisSignup(!isSignup)}
                            sx={{ mt: 2, borderRadius: 10 }}
                            fullWidth
                        >
                            Switch To {isSignup ? "Login" : "Signup"}
                        </Button>
                    )}
                    {!isAdmin && (
                        <Button
                            onClick={handleGoogleSignIn}
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                mt: 2,
                                borderRadius: 2,
                                color: "#DB4437", // Google's red color
                                borderColor: "#DB4437",
                                ":hover": {
                                    bgcolor: "rgba(219, 68, 55, 0.1)",
                                },
                            }}
                            fullWidth
                        >
                            Sign in with Google
                        </Button>
                    )}
                </Box>
            </form>
        </Dialog>
    );
};

export default AuthForm;
