import React from "react";
import "./Account.css";
import Logo from "../../Images/Company_Logo.png";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

function Account() {
  return (
    <>
      <div className="container">
        <div className="logo">
        <img src={Logo} alt="" className="logoImg" />
        </div>
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
                <input type="text" />
                <div className="info">
                  <InfoOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="inputField">
              <div className="label">Email*</div>
              <div className="inputBox">
                <input type="email" />
                <div className="info">
                  <InfoOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="passwordSec">
              <div className="inputField1">
                <div className="label">Password*</div>
                <div className="inputBox">
                  <input type="password" />
                  <div className="info">
                    <InfoOutlinedIcon />
                  </div>
                </div>
              </div>
              <div className="inputField1">
                <div className="label">Confirm Password*</div>
                <div className="inputBox">
                  <input type="password" />
                  <div className="info">
                    <InfoOutlinedIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="checkBox">
              <input type="checkbox" />
              <div className="textContainer">
                <span className="text">I accept the Terms and Privacy Policy</span>
              </div>
            </div>
            {/* <div className="inputField"></div> */}
          </div>
          <div className="bottomSection">
            <div className="button">
              <span className="val">Next</span>
              <ChevronRightOutlinedIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
