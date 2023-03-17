import { Link } from "react-router-dom";


const NavbarAlt = () => {
  return (
    <nav className="py-4 shadow">
      <div className="container">
        <div className="font-bold flex items-center text-main">
            <Link to="/">
                &#3345; Sphenenews
            </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavbarAlt
