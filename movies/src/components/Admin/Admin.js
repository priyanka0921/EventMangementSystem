import React from 'react'
import AuthForm from '../Auth/AuthForm';
import { sendAdminAuthRequest } from '../../api-helper/api_helper';
import { useDispatch } from 'react-redux';
import { adminActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const navigate=useNavigate();
  const disPatch=useDispatch();
  const onResReceieved =(data)=>
   {
     console.log(data);
     disPatch(adminActions.login());
     localStorage.setItem("token",data.token);
     localStorage.setItem("adminId",data.id);
     navigate("/");
   }
  const getData=(data)=>
    {
      console.log("Admin",data);
      sendAdminAuthRequest(data.inputs)
      .then(onResReceieved)
     
      .catch(err=>console.log(err));
    }
    return (
      <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
      </div>
    )
  }

export default Admin
