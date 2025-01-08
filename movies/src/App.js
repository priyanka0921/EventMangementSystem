
import { Route, Routes } from "react-router-dom";

import Header from './components/Header';
import HomePage from './components/HomePage';
import Events from './components/Events/Events';
import Admin from './components/Admin/Admin';
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./components/store";
import Bookings from "./components/Bookings/Bookings";
import UserProfile from "./Profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./Profile/AdminProfile";
import DashBoard from "./components/DashBoard/DashBoard";
import NotFound from "./components/Error/NotFound";
import CreateEventPage from "./components/Events/CreateEventPage";
import ManageEvents from "./components/Admin/ManageEvents";
import PasswordField from "./components/Auth/PasswordField";
function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      {/* header */}
      <Header />
      <section>
        <Routes>
          
          <Route path="/events" element={<Events />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth" element={<Auth />} />
            </>)}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
            <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Bookings />} /></>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (<>
            <Route path="/user_admin" element={<AdminProfile />} />
            <Route path="/add" element={<AddMovie />} />
            <Route path="/" element={<DashBoard />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/manage_events" element={<ManageEvents/>} />
          </>)}
          <Route path="*" element={<NotFound />}/>
         <Route path="/createEvent" element={<CreateEventPage />} />
         <Route path="/set-password" element={<PasswordField/>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
