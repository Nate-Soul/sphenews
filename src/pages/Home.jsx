import { useEffect, useState } from "react";
import axios from "axios";
import Articles from "../components/Articles";

const Home = () => {

  // const articles = posts;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try{ 
      const res = await axios.get(`http://localhost:5000/api/articles`);
      setArticles(res.data);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section id="homeArea" className="py-14">
      <div className="container">
        <Articles articles={articles}/>
      </div>
    </section>
  );
};

export default Home;
