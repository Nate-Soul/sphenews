import axios from "axios";
import { useEffect, useState } from "react";
import defaultArticleImg from "../assets/images/blog-img4.jpg";
import { Link } from "react-router-dom";


const SimilarArticles = ({ slug }) => {

    const [similar, setSimilar] = useState([]);
  
    useEffect(() => {
      fetchSimilarArticles(slug);
    }, [slug]);
  
    const fetchSimilarArticles = async (articleSlug) => {
      try{
        const res = await axios.get(`http://localhost:5000/api/articles/similar/${articleSlug}`);
        setSimilar(res.data);
      } catch(err) {
        console.log(err);
      }
    }

  return (
    <div className="similar-post-area">
    {similar && (<>
      <h4 className="text-2xl font-bold mb-4">Similar Posts</h4>
      <div>
        {
            similar.map(post => (
                <article className="similar-posts flex flex-col gap-2 mb-4" key={post.id}>
                    <img src={post.featured_image ? "/uploads/" + post.featured_image.toString() : defaultArticleImg} alt={post.title} className="h-48 w-full object-cover"/>
                    <h5 className="text-lg font-medium">{post.title}</h5>
                    <Link to={`/article/${post.slug}`} className="border border-main text-main py-1 px-2 text-sm bg-white rounded w-max transition hover:border-transparent hover:bg-main-700 hover:text-white">Read More </Link>
                </article>))
        }
      </div>
      </>)}
    </div>
  )
  
}

export default SimilarArticles
