import React, { useState } from 'react'
import "./UpdateProfile.css"
import { Avatar, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

function UpdateProfile() {

    const { loading, error, user, message } = useSelector((state) => state.user);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
        navigate("/profile");
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatar(reader.result);
                setAvatarPrev(reader.result);
            }
        };

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, alert, message, navigate]);


    return (
        loading ? <Loader /> : (
            <div className='updateProfile'>
                <form className='updateProfileForm' onSubmit={submitHandler}>
                    <Typography variant='h3' style={{ padding: "2vmax" }} >Update Profile</Typography>
                    <Avatar src={avatarPrev} alt="User" sx={{ height: "10vmax", width: "10vmax" }} ></Avatar>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <input className='updateProfileInputs' type="text" placeholder='Name' required value={name} onChange={(e) => setName(e.target.value)} />
                    <input className='updateProfileInputs' type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button type='submit' sx={{background: "#437ef7", color: "white"}}>Update</Button>
                </form>
            </div>
        )
    )
}

export default UpdateProfile