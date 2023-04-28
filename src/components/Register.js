import React from "react";
import { useState } from "react";
import Axios from "axios";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBInput } from "mdb-react-ui-kit";
import { toast } from "react-hot-toast";

export default function Register() {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (
      formValue.email !== "" ||
      formValue.name !== "" ||
      formValue.password !== ""
    ) { 
      if (formValue.password === formValue.confirmPassword) {
        try {
          await Axios.post(`http://194-195-247-34.ip.linodeusercontent.com/backend/user/register`, {
            name: formValue.name,
            email: formValue.email,
            password: formValue.password,
          });
 
          window.location.href = "/login";
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.msg);
          }
        }
      } else {
        toast.error("Password dont match");
      }
    } else {
      toast.error("all field are required");
    }
  };

  return (
    <section >
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://media.istockphoto.com/id/1194209555/vector/auction-online-vector-concept-for-web-banner-website-page.jpg?s=612x612&w=0&k=20&c=iKRTYOYmA1a4yE0Gy4a3Cx3W8qTgUdZvDWAOygT1IkY="
              alt="product"
              className="img-fluid" style={{width:'75%'}}
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 ">
            <form>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <div className="form-outline mb-4">
                <MDBInput
                  value={formValue.name}
                  name="name"
                  onChange={onChange}
                  required
                  label="Name"
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  value={formValue.email}
                  name="email"
                  onChange={onChange}
                  required
                  label="Email"
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  value={formValue.password}
                  name="password"
                  onChange={onChange}
                  type="password"
                  required
                  label="Password"
                />
              </div>

              <div className="form-outline mb-4">
                <MDBInput
                  value={formValue.confirmPassword}
                  name="confirmPassword"
                  onChange={onChange}
                  type="password"
                  required
                  label="Confirm Password"
                />
              </div>

              <button
                type="submit"
                name="button"
                style={{ backgroundColor: '#226D68', color: '#ECF8F6' }}
                className="btn btn-block"
                onClick={addUser}
              >
                Register
              </button>
            </form>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0 text-muted">
                Already have an account?
              </p>
            </div>
            <p>
              <a href="/login" style={{ color: '#226D68' }} className="text-right">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
