import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import DefaultAvatarImg from "../assets/images/user-1.jpg";
import axios from "axios";


const Navbar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try{
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  }

  return (
    <nav id="mainMenu" className="shadow-sm py-4 z-50 sticky top-0 bg-white bg-opacity-90">
      <div className="container flex items-center justify-between">
        <Link to="/" className="font-bold text-main-700">
          Sphenews
        </Link>
        <div className="flex md:hidden">
          <button>&bars;</button>
        </div>
        <div className="hidden md:flex items-center">
          <ul className="flex font-medium text-black text-sm capitalize">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 hover:text-main ${
                  location.pathname === "/"
                    && "text-main hover:text-main-700"
                }`}
              >
                Home
              </Link>
            </li>
            {categories && <li className="nav-item-alt relative">
              <span className="block py-2 px-3 hover:text-main"> 
                &#9783; Categories
              </span>
                <ul className="absolute z-50 bg-black bg-opacity-70 text-white rounded px-4 flex-col gap-2 justify-center py-2 w-max">
                  {categories.map((category, index) => (<li key={index}>
                    <Link to={`/category/${category.slug}`} className="hover:text-main">{category.slug}</Link>
                  </li>))}
                </ul>
            </li>}
          </ul>
          <ul className="flex">
            <li className="nav-item-alt px-1 relative text-sm">
              <img src={(currentUser && currentUser.avatar) ? currentUser.avatar : DefaultAvatarImg} alt={currentUser?.username} className="rounded-full w-6 h-6"/>
              <ul className="absolute z-50 bg-black bg-opacity-70 text-white rounded px-4 flex-col gap-2 justify-center py-2 w-max">
                {currentUser ? (<>
                <li>
                  <span className="capitalize">Howdy {currentUser?.username}</span>
                </li>
                <li>
                  <Link to="/write" className="py-2 hover:text-main" state={""}>
                    Write
                  </Link>
                </li>
                <li>
                  <Link to="/myarticles" className="py-2 hover:text-main">
                    My Articles
                  </Link>
                </li>
                <li>
                  <span onClick={handleLogout} className="py-2 cursor-pointer hover:text-main">
                    Logout
                  </span>
                </li></>) : (<>
                <li>
                  <Link to="/register" className="py-2 hover:text-main">
                    Become an Author
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="py-2 cursor-pointer hover:text-main">
                    Login
                  </Link>
                </li>
                </>)
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
