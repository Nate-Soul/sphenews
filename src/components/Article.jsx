import defaultBlogImg from "../assets/images/blog-img4.jpg";
import { Link } from "react-router-dom";

const Article = ( { article } ) => {
  return (
    <article
      className="blog-article flex gap-32 even:flex-row-reverse"
      key={article.id}
    >
      <div className="after:w-full after:h-full after:absolute after:bg-main-200 after:top-4 after:-left-4 after:-z-10 img flex-1/4 relative">
        <img
          src={article.featured_image ? "/uploads/" + article.featured_image.toString() : defaultBlogImg}
          alt={article.title}
          className="h-96 w-full object-cover"
        />
      </div>
      <div className="content basis-3/4 flex flex-col justify-between">
        <Link
          to={`/article/${article.slug}`}
        >
          <h4 className="text-4xl font-bold mb-6">{article.title}</h4>
        </Link>
        <p className="text-lg">{article.excerpt}</p>
        <Link
          to={`/article/${article.slug}`} 
          className="w-max px-4 py-2 border border-main-700 bg-white text-main-700 rounded transition hover:border-transparent hover:bg-main-700 hover:text-white">
          Read More
        </Link>
      </div>
    </article>
  )
}

export default Article
