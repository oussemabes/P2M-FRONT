import React from "react";
import { useState } from "react";
import Axios from "axios";
import { toast } from "react-hot-toast";

import { MDBInput } from "mdb-react-ui-kit";

export default function Login() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setisLoggedIn] = React.useState(false);
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const resp = await Axios.post(`http://194-195-247-34.ip.linodeusercontent.com/backend/user/login`, {
        email: formValue.email,
        password: formValue.password,
      });

      if (resp.data) {
        localStorage.setItem("token", resp.data);
        setisLoggedIn(true);
        toast.success("Welcome back :)", {
          position: "bottom-center",
          duration: 5000,
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error("Please enter a valid Email/Password");
      }
    }
  };
  React.useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);
  return (
  <section >
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img  alt="product" src="https://media.istockphoto.com/id/1194209555/vector/auction-online-vector-concept-for-web-banner-website-page.jpg?s=612x612&w=0&k=20&c=iKRTYOYmA1a4yE0Gy4a3Cx3W8qTgUdZvDWAOygT1IkY="
          className="img-fluid" style={{width:'60%'}}  />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>

        <div className="form-outline mb-4">

        <MDBInput
          value={formValue.email}
          name='email'
          onChange={onChange}
          id='validationCustom01'
          required
          label='Email'
          className="input"
        />
      </div>

      <div className="form-outline mb-4">

        <MDBInput
          value={formValue.password}
          name='password'
          onChange={onChange}
          type='password'
          required
          label='Password'
        />
   
      </div>
      <div className="d-flex justify-content-around align-items-center mb-4">
            <div className="form-check">
              <input  className="form-check-input b" type="checkbox" value="" id="form1Example3" checked onChange={()=>console.log("checked")} />
              <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
            </div>
            <a style={{color:"#226D68"}} href="#!">Forgot password?</a>
          </div>
        <button name="button" type='submit' style={{backgroundColor:"#226D68",color:"#ECF8F6"}} className="btn btn-block" onClick={LoginUser} >Sign In</button>
   
        </form>
        
        <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>

          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
