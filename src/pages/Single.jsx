import { 
  useState, useEffect, useContext 
} from "react";
import { 
  Link, useNavigate, useParams 
} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Avatar1 from "../assets/images/user-1.jpg";
import Img1 from "../assets/images/blog-img4.jpg";
import { AuthContext } from "../context/authContext";
import Sidebar from "../components/Sidebar";

const Single = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { currentUser } = useContext(AuthContext);

  const [article, setArticle] = useState({});

  useEffect(() => {
    fetchArticle(slug);
  }, [slug]);

  const fetchArticle = async (slug) => {
    try{ 
      const res = await axios.get(`http://localhost:5000/api/articles/${slug}`);
      const data = res.data;
      setArticle(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${article.slug}`);
      navigate("/myarticles");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="singlePage" className="py-14">
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <main className="col-span-3">
            <article className="content">
              <div className="article-header">
                  <img src={article.featured_image ? "/uploads/" + article.featured_image.toString() : Img1} alt="Post title" className="h-72 object-cover w-full"/>
                <div className="author my-4 flex gap-3 items-center text-sm">
                  <img src={article.avatar ? article.avatar : Avatar1} alt="John Doe" className="rounded-full w-12 h-12 object-cover"/>
                  <div className="author-info">
                    <span className="font-semibold text-main hover:text-main-700">By <Link to={`/articles/by/${article.author}`}>{article.author}</Link></span>
                    <p>Posted {moment(article.date).fromNow()}</p>
                  </div>
                  
                  {currentUser?.id === article.userId && (<div className="author-options">
                    <Link to={`/write?edit=${article.slug}`} className="mx-1 text-yellow-500" state={article}>Edit</Link>
                    <span onClick={handleDelete} className="mx-1 text-red-500 cursor-pointer">Delete</span>
                  </div>)}
                </div>
              </div>
              <div className="article-body">
                <h3 className="font-bold text-4xl text-gray-700 mb-6 capitalize">{article.title}</h3>
                <div className="article-body-content text-justify leading-7">
                  {article.content}
                </div>
              </div>
            </article>
          </main>
          <Sidebar slug={article.slug}/>
        </div>
      </div>
    </section>
  )
}

export default Single
