import Article from "./Article"

const Articles = ( { articles }) => {
  return (
    <div className="articles-container flex flex-col gap-32">
      {articles.length > 0 ? articles.map((article, index) => (
        <Article article={article} key={index}/>
      )): 
      <div className="text-center">No published articles yet</div> }
    </div>
  )
}

export default Articles
