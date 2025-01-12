
import React, { useState } from 'react';
import AuthForm from '../Auth/AuthForm';
import { sendUserAuthRequest } from '../../api-helper/api_helper';
import { userActions } from '../store/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar component
import Alert from '@mui/material/Alert';

const Auth = () => {
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null); // State for storing error message
  

  const onResReceived = (data) => {
    console.log(data);
    disPatch(userActions.login());
    localStorage.setItem('userId', data.id); // Save user id to localStorage
    navigate('/'); // Navigate to the homepage or dashboard
  };

  const getData = (data) => {
    console.log('Auth', data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived) // If successful, call onResReceived
      .catch((err) => {
        setErrorMessage('Error: ' + (err.message || 'Something went wrong')); // Set error message
      });
  };

  return (
    <div>
      {/* Render the AuthForm component */}
      <AuthForm onSubmit={getData} isAdmin={false} />

      {/* Snackbar to show error message */}
      <Snackbar
        open={!!errorMessage} // Show Snackbar if errorMessage is set
        autoHideDuration={12000} // Automatically hide after 6 seconds
        onClose={() => setErrorMessage('')} // Close the Snackbar when clicked or timeout
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top-right
      >
        <Alert
          onClose={() => setErrorMessage('')} // Close the Alert
          severity="error" // Set severity to error
          variant="filled" // Filled alert style
          sx={{ width: '100%' }} // Make the Alert fill the width of the Snackbar
        >
          {errorMessage} {/* Display error message */}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default Auth;
