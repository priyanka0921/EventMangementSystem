import React from 'react'
import AuthForm from '../Auth/AuthForm';
import { sendUserAuthRequest } from '../../api-helper/api_helper';
import { userActions } from '../store/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate=useNavigate();
  const disPatch = useDispatch();
  const onResReceieved =(data)=>
  {
    console.log(data);
    disPatch(userActions.login());
    // localStorage.setItem("token",data.token);
    localStorage.setItem("userId",data.id);
    navigate("/");
  }
  const getData = (data) => {
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceieved)
      .catch(err => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth
