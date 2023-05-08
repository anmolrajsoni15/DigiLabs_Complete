import React, { useEffect, useState } from "react";
import "./SignUp.css";
import Logo from "../Images/Company_Logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { signUpUser } from "../../Actions/User";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [text, setText] = useState("Next");
  const [image, setImage] = useState(Logo);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, user } = useSelector((state) => state.user);
  const { page, error: pageError} = useSelector((state) => state.page);


  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(name, email, password, confirmpassword);
    dispatch(signUpUser(name, email, password, confirmpassword));
  };

  useEffect(() => {
    if(page && page.text){
      setText(page.text);
    }
    if(page && page.image){
      setImage(page.image.url);
    }
    if (error || pageError) {
      if(error)
        alert.error(error);
      else if(pageError)
        alert.error(pageError);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error, page, pageError]);

  return (
    <>
      <div className="container">
        <div className="logo">
          <img src={image} alt="" className="logoImg" />
        </div>
        <form onSubmit={submitHandler}>
          <div className="details">
            <div className="upperSection">
              <div className="stepper">
                <div className="baseStepper">
                  <div className="icons">
                    <LockOutlinedIcon />
                  </div>
                  <div className="textCont">
                    <span className="name">Account</span>
                  </div>
                </div>
                <div className="dividerStepper">
                  <div className="divider"></div>
                </div>
                <div className="baseStepper">
                  <div className="icons">
                    <PersonOutlinedIcon />
                  </div>
                  <div className="textCont">
                    <span className="name">Personal</span>
                  </div>
                </div>
                <div className="dividerStepper">
                  <div className="divider"></div>
                </div>
                <div className="baseStepper">
                  <div className="icons">
                    <AttachMoneyOutlinedIcon />
                  </div>
                  <div className="textCont">
                    <span className="name">Billing</span>
                  </div>
                </div>
                <div className="dividerStepper">
                  <div className="divider"></div>
                </div>
                <div className="baseStepper">
                  <div className="icons">
                    <ThumbUpOutlinedIcon />
                  </div>
                  <div className="textCont">
                    <span className="name">Done</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="inputSection">
              <div className="inputField">
                <div className="label">Name</div>
                <div className="inputBox">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={user && user.name ? user.name : name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="info">
                    <InfoOutlinedIcon />
                  </div>
                </div>
              </div>
              <div className="inputField">
                <div className="label">Email*</div>
                <div className="inputBox">
                  <input
                    type="email"
                    placeholder="username@xyz"
                    required
                    value={user && user.email ? user.email : email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="info">
                    <InfoOutlinedIcon />
                  </div>
                </div>
              </div>
              <div className="passwordSec">
                <div className="inputField1">
                  <div className="label">Password*</div>
                  <div className="inputBox">
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="info">
                      <InfoOutlinedIcon />
                    </div>
                  </div>
                </div>
                <div className="inputField1">
                  <div className="label">Confirm Password*</div>
                  <div className="inputBox">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="info">
                      <InfoOutlinedIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="checkBox">
                <input type="checkbox" required />
                <div className="textContainer">
                  <span className="text">
                    I accept the Terms and Privacy Policy
                  </span>
                </div>
              </div>
              {/* <div className="inputField"></div> */}
            </div>
            <div className="bottomSection">
              <button className="button" disabled={loading} type="submit">
                <span className="val">{text}</span>
                <ChevronRightOutlinedIcon />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
