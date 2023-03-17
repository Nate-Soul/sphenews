import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import {Link, useNavigate } from "react-router-dom";
import NavbarAlt from "../components/NavbarAlt";

const Login = () => {


  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);


  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/myarticles");
    } catch(err) {
      setError(err.response.data);
    }
  }

  return (
    <>
    <NavbarAlt/>
    <section id="loginArea" className="flex flex-col items-center justify-center w-full py-12">
      <div className="container">
        <main className="block mx-auto w-4/5 md:w-1/2 shadow-custom p-6 md:p-10 rounded-2xl">
            <h4 className="font-semibold text-3xl text-center text-main-700 mb-6">Let's get you <br /><strong>Posted</strong></h4>
            <form action="#">
                <div className="mb-4">
                    <label htmlFor="username" className="form-control-label">Username</label>
                    <input type="text" name="username" id="username" className="form-control" autoComplete="off" required onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="form-control-label">Password</label>
                    <input type="password" name="password" id="password" className="form-control" required onChange={handleChange}/>
                </div>
                <div className="mb-4 text-right">
                    <Link to="/login" className="font-semibold text-center">Forgotten Password?</Link>
                </div>
                <div className="mb-4">
                <button type="submit" className="btn btn-main-700 p-2 rounded-lg w-full" onClick={handleSubmit}>Login</button>
                </div>
                {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}
                <div className="mb-4  text-center">
                    <p>Don't have an access card? <Link to="/register" className="font-semibold">Create One</Link></p>
                </div>
            </form>
        </main>
      </div>
    </section>
    </>
  )
}

export default Login
