import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Articles from "../components/Articles";

const ArticlesByAuthor = () => {

    const { author } = useParams();
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        fetchArticles(author);
    },[author]);

    const fetchArticles = async (author) => {
        try{
            const res = await axios.get(`http://localhost:5000/api/articles/by/${author}`);
            setArticles(res.data);
        } catch(err) {
            console.log(err);
        }
    }
  return (
    <section id="articlesByAuthorPage" className="py-14">
      <div className="container">
        <Articles articles={articles}/>
      </div>
    </section>
  )
}

export default ArticlesByAuthor
