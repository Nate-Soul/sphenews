import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import moment from "moment";


const MyArticles = () => {

    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    const { currentUser } =  useContext(AuthContext);

    useEffect(() => {
        if(!currentUser) navigate("/login");
        fetchArticles(currentUser?.username);
    }, [currentUser, navigate]);

    const fetchArticles = async (username) => {
        try{
            const res = await axios.get(`http://localhost:5000/api/articles/by/${username}?loggedIn=true`);
            setArticles(res.data);
        } catch(err) {
            console.log(err);
        }
    }

    
  const handleDelete = async (slug) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${slug}`);
      navigate("/myarticles");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="py-14" id="myArticlesPage">
        <div className="container">
            {articles.length > 0 ? articles.map((article, index) => (
                <div className="grid grid-cols-8 gap-4 border-b py-4 px-2 items-center justify-center" key={index}>
                    <img src={`/uploads/${article.featured_image}`} alt={article.title} height="25" width={50} />
                    <div>{article.title}</div>
                    <div>{moment(article.createdAt).fromNow()}</div>
                    <div>{moment(article.updatedAt).fromNow()}</div>
                    <button className="btn bg-green-600 text-white text-sm"> {article.status === "publish" ? "Save as draft" : "Publish"} </button> 
                    <button className="btn bg-gray-500 text-white text-sm">Set as {article.visibility}</button> 
                    <Link to={`/write?edit=${article.slug}`} className="btn bg-yellow-500 text-sm" state={article}> Edit </Link>
                    <button className="btn bg-red-500 text-white text-sm" onClick={() => handleDelete(article.slug)}> Delete </button>
                </div>
            )) : (
                <p className="text-yellow-400 text-center">You haven't published any article yet! <Link to="/write" className="text-main">Start Writing</Link></p>
            )
            }
        </div> 
    </section>
  )
}

export default MyArticles
