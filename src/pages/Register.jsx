import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import NavbarAlt from "../components/NavbarAlt";

const Register = () => {

  const url = "http://localhost:5000/api/";

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  // const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${url}auth/register`, inputs);
      navigate("/login");
    } catch(err) {
      setError(err.response.data);
    }
  }

  return (
    <>
    <NavbarAlt/>
    <section id="loginArea" className="flex flex-col items-center justify-center w-full py-12">
      <div className="container">
        <div className="block mx-auto w-4/5 md:w-1/2 shadow-custom p-6 md:p-10 rounded-2xl">
            <h4 className="font-semibold text-3xl text-center text-main-700 mb-6">Create a writers <br/><strong>Nest</strong></h4>
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="font-medium block mb-2">Username</label>
                    <input type="text" name="username" id="username" className="form-control" autoComplete="off" required onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="font-medium block mb-2">Email Address</label>
                    <input type="text" name="email" id="email" className="form-control" autoComplete="off" required onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="font-medium block mb-2">Password</label>
                    <input type="password" name="password" id="password" className="form-control" required onChange={handleChange}/>
                </div>
                {/* <div className="mb-4"> 
                    <label htmlFor="cPassword" className="font-medium block mb-2">Confirm Password</label>
                    <input type="password" name="cPassword" id="cPassword" className="form-control" required/>
                </div> */}
                <div className="mb-4">
                <button type="submit" className="btn btn-main-700 p-2 rounded-lg w-full" onClick={handleSubmit}>Register</button>
                </div>
                {error && (<p className="text-red-500 text-center text-sm">{error}</p>)}
                <div className="mb-4  text-center">
                    <p>Already have an account? <Link to="/login" className="font-semibold">Login</Link></p>
                </div>
            </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default Register
