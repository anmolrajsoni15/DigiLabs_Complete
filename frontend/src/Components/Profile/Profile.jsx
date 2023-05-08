import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import MetaData from '../layout/MetaData'
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Loader from "../Loader/Loader";
import { logoutUser } from "../../Actions/User";
import { useAlert } from "react-alert";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState("https://tinypic.host/images/2022/12/19/img_avatar.png");

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged Out");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signup");
    }
    if(user && user.avatar){
        setAvatar(user.avatar.url);
    }
  }, [user, isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <MetaData title={`${user.name}'s Profile`} /> */}
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img
                src={user.avatar ? user.avatar.url : avatar}
                alt={user.name}
              />
              <Link to="/update/profile">Edit Profile</Link>
              <button onClick={logoutHandler} className="logoutButton">Logout</button>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="updatePageVal">
                <Link to="/page/update">
                Update SignUp Page Data
                </Link>
                </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
