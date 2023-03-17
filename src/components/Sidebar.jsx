import SimilarArticles from "./SimilarArticles";

const Sidebar = ({ slug  }) => {

  return (
    <aside className="col-span-1">
      <SimilarArticles slug={slug}/>
    </aside>
  )
}

export default Sidebar
