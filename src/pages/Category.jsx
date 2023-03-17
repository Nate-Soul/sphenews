import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Articles from "../components/Articles";

const Category = () => {

  const { slug } = useParams();

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(slug);
  }, [slug]);

  const fetchArticles = async (slug) => {
    try{
      const res = await axios.get(`http://localhost:5000/api/articles/in/${slug}`);
      setArticles(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="categoryPage" className="py-10">
      <div className="container">
          <Articles articles={articles}/>
      </div>      
    </section>
  )
}

export default Category
