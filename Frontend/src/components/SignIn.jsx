import React, { useContext, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { CgCopyright } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import "./signIn.css";
import { useDispatch } from "react-redux";
import { SigninReq } from "../Redux/action";
import { AuthContext } from "../components/Context/AuthContextProvider";
import { background, Box, Image } from "@chakra-ui/react";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false); // Step 1: Introduce loading state
  const { setAuth } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handelSignIn = (e) => {
    e.preventDefault();
    setLoading(true); // Step 2: Set loading to true when sign-in is initiated
    dispatch(SigninReq(data)).then((res) => {
      setLoading(false); // Step 2: Set loading to false when request is resolved
      if (res.type === "SIGNIN_SUCCESS_REQUEST") {
        setAuth(true);
        navigate("/");
        alert("Login Successful!");
      } else {
        alert(res.payload);
      }
    });
    setData(initialState);
  };

  return (
    <>
      <div className="SignIn-container">
        <Box width={"90%"} alignContent={"center"} alignItems={"center"} textAlig={"center"} marginLeft="18px">
          <Image
            className="logo"
            margin="auto"
            padding="20px"
            width={"100%"}
            src="https://panaroma.finance/wp-content/uploads/2022/03/panaroma-website-logo.png"
            alt="pococare_logo"
          />
        </Box>

        <form className="signIn-form" onSubmit={handelSignIn}>
          <input
            type="email"
            placeholder="Mobile Number or Email"
            name="email"
            value={data.email}
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
          <div className="SignIn-Btn">
            <button>{loading ? 'Loading...' : 'Sign in'}</button> {/* Step 3: Conditional rendering based on loading state */}
          </div>
        </form>

        <div className="orPart">
          <hr className="hrTag me-3" />
          <p>or</p>
          <hr className="hrTag ms-3" />
        </div>

        <div>
          <p className="forgot-password">Forgot password?</p>
        </div>
      </div>
      <div className="log-account">
        <p>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default SignIn;
