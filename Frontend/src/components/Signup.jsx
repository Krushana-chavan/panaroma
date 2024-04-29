import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillFacebook } from "react-icons/ai";
import { CgCopyright } from "react-icons/cg";
import "./signUp.css";
import { useDispatch } from "react-redux";
import { SignupReq } from "../Redux/action";
import { Box, Image } from "@chakra-ui/react";
const initialState = {
  email: "",
  name: "",
  password: "",
};

const SignupComponent = () => {
  const [data, setData] = useState(initialState);
  // const [signUpData, setSignUpData] = useState({});
  const Dispatch = useDispatch();
  const navigate=useNavigate()
  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSignUp = (e) => {
    e.preventDefault();
 
   
    Dispatch(SignupReq(data)).then((res)=>{
      console.log(res)
      if(res.payload==='User Created Successfully!'){
        alert(res.payload);
        navigate("/login")
      }else{
        alert(res.payload)
      }
    })
    setData(initialState);
  };

  return (
    <>
      <div className="signUp-container">
      <Box  width={"90%"} alignContent={"center"} alignItems={"center"} textAlig={"center"} marginLeft="18px">
          <Image
            className="logo"
            margin="auto"
            padding="20px"
            width={"100%"}
            
            src="https://panaroma.finance/wp-content/uploads/2022/03/panaroma-website-logo.png"
            alt="panaromaLogo"
          />
        </Box>

        <form className="signUp-form" onSubmit={handelSignUp}>
          <input
            type="email"
            placeholder=" Email"
            name="email"
            value={data.email}
            onChange={handelInputChange}
            required
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={handelInputChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handelInputChange}
            required
          />

          <div>
          

            <p className="info mt-1">
              By signing up, you agree to our{" "}
              <span className="learn-more">
                {" "}
                Terms , Privacy Policy and Cookies Policy .
              </span>
            </p>
          </div>

          <div className="SignUpBtn">
            <button>Sign up</button>
          </div>
        </form>
      </div>

      <div className="log-account">
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      

    </>
  );
};

export default SignupComponent;
