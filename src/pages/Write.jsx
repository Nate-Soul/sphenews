import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../context/authContext";

const Write = () => {

  const navigate = useNavigate(); 
  const article = useLocation().state;
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [content, setContent] = useState(article?.content || "");
  const [status, setStatus] = useState(article?.status || "draft");
  const [visibility, setVisibility] = useState(article?.visibility || "public");
  const [featuredImg, setFeaturedImg] = useState(article?.featured_image || null);

  const [postCategories, setPostCategories] = useState([]);
  const [articleCats, setArticleCats] = useState([]);

  const [categories, setCategories] = useState([]);
  
  const { currentUser} = useContext(AuthContext);

  const fetchArticleCategories = async (slug) => {
    try{
      const res = await axios.get(`http://localhost:5000/api/categories/in/${slug}`);
      setArticleCats(res.data);
    } catch(err) {
      console.log(err);
    }
  }

  const compareArticleCatsId = (categoryId) => {
    if(articleCats && articleCats.length > 0 ){
      for(let i = 0; i < articleCats.length; i++){
        if(articleCats[i].id === categoryId){
          return true;
        }
      }
    } else {
      return false;
    }
  }

  useEffect(() => {
    if(!currentUser){
      navigate("/login");
    }
    fetchCategories();
    if(slug) { fetchArticleCategories(slug) };
  }, [slug, currentUser, navigate]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFeaturedImg = async () => {
    try{
      const formData = new FormData();
      formData.append("file", featuredImg);
      const res = await axios.post(`http://localhost:5000/api/upload/article/featured`, formData);
      return res.data;
    } catch(err) {
      console.log(err);
    }
  }
  
  const makeSlug = (string, delimiter = "-", unwanted_keywords = ["and",]) => {
    let slug = "";
    if(string){
        //PHASE 1
        slug = string
                .toString() //convert to string
                .trim() //remove trailing whitespaces
                .toLowerCase() //convert to lowercase
                .split(/[^a-zA-Z0-9\s-]/).join(""); //remove any non-alphanumeric characters
        //PHASE 2: remove unwanted keywords              
        unwanted_keywords.forEach(unwanted_keyword => {
            slug = slug.replace(unwanted_keyword, "");
        });
        //PHASE 3
        slug = slug.split(" ").join(delimiter) //convert spaces to dashes
                .replace(/-+/g, delimiter) //convert multiple dashes to single dash
                .replace(/^-+/g, "") //trim dash(es) from the beginning
                .replace(/-+$/g, ""); //trim dash(es) from the end
    }
    return slug;
  }

  const makeExcerpt = (string, len = 200) => {
    if(string.length > len){
        string = string.trim().substring(0, len) + "...";
    } else {
        string += "...";
    }
    return string;
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await uploadFeaturedImg();
    let res;
    try {
      if(article){
        res = await axios.put(`http://localhost:5000/api/articles/${article.id}`, {
          title, 
          slug,
          excerpt,
          content, 
          status, 
          visibility, 
          featured_image: !imgUrl ? featuredImg : imgUrl,
          userId: currentUser.id
        })
        postCategories.forEach(postCategory => {
          axios.put(`http://localhost:5000/api/article-categories/${article.id}`, {
            categoryId: postCategory
          })
        })
      } else {
        res = await axios.post(`http://localhost:5000/api/articles`, {
          title, 
          slug,
          excerpt,
          content, 
          status, 
          visibility, 
          featured_image: featuredImg ? imgUrl : "",
          userId: currentUser.id
        })
        postCategories.forEach(postCategory => {
          axios.post(`http://localhost:5000/api/article-categories`,  { 
            articleId: res.data.lastInsertedId, 
            categoryId: postCategory
          });
        })
      }
      setMessage(res.data.msg);
      clearFields();
    } catch (err) {
      setError(err);
    }
  };

  const clearFields = () => {
    setArticleCats(null);
    setTitle("");
    setSlug("");
    setContent("");
    setStatus("draft");
    setExcerpt("");
    setVisibility("public");
    setFeaturedImg(null);
  }

  return (
    <section id="writePage" className="py-16">
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <main className="col-span-3 shadow-custom p-10 rounded-2xl">
            {error && ( <div className="alert text-red-500 text-white">{error}</div> )}
            {message && ( <div className="alert bg-white rounded border border-green-500 text-green-500 text-center mb-4">{message}</div> )}
            <form action="#">
              <div className="mb-4">
                <label htmlFor="title" className="form-control-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Article Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value) }
                  onInput={(e) => setSlug(makeSlug(e.target.value)) }
                />
              </div>
              <div className="mb-4">
                <label htmlFor="slug" className="form-control-label">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  className="form-control"
                  placeholder="Article Unique Slug"
                  value={slug}
                  onChange={(e) => setSlug(makeSlug(e.target.value)) }
                />
              </div>
              <div className="editor-container h-72 border border-gray-200 focus:border-main-200 overflow-y-scroll mb-4">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  onBlur={(e) => setExcerpt(makeExcerpt(content))}
                  className="border-none h-full"
                />
              </div>
            </form>
          </main>
          <aside className="col-span-1">
            <div className="item rounded-xl border border-gray-200 flex flex-col gap-6 p-3 flex-1 text-sm mb-4">
              <h4 className="text-xl font-medium">Publish</h4>
              <p>
                {" "}
                <strong>Save as:</strong> <span className="capitalize">{status ? status : "Draft"}</span>
              </p>
              <div className="stats flex gap-2">
                <input
                  type="radio"
                  name="status"
                  id="draft"
                  value="draft"
                  onChange={(e) => setStatus(e.target.value)}
                  defaultChecked={status === "draft"}
                />
                <label htmlFor="draft">Draft</label>
                <input
                  type="radio"
                  name="status"
                  id="publish"
                  value="publish"
                  onChange={(e) => setStatus(e.target.value)}
                  defaultChecked={status === "publish"}
                />
                <label htmlFor="publish">Publish</label>&nbsp;
              </div>
              <span>
                {" "}
                <strong>Visibility:</strong> <span className="capitalize">{visibility ? visibility : "public"}</span>
              </span>
              <div className="stats flex gap-2">
                <input
                  type="radio"
                  name="visibility"
                  id="public"
                  value="public"
                  defaultChecked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="public">Public</label>&nbsp;
                <input
                  type="radio"
                  name="visibility"
                  id="private"
                  value="private"
                  onChange={(e) => setVisibility(e.target.value)}
                  defaultChecked={visibility === "private"}
                />
                <label htmlFor="private">Private</label>
              </div>
              <div className="form-input-file">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => setFeaturedImg(e.target.files[0])}
                />
                <label
                  htmlFor="file"
                  className="underline cursor-pointer form-control-label"
                >
                  Upload Featured Image
                </label>
              </div>
              <div className="btn-group">
                {article ? (<button
                  className="btn btn-main-outline-700 py-1 px-2 w-full"
                  onClick={handleSubmit}
                >
                  Update
                </button>) : (<button
                  className="btn btn-main-700 py-1 px-2 w-full"
                  onClick={handleSubmit}
                >
                  Save
                </button>)}
              </div>
            </div>
            <div className="item rounded-xl border border-gray-200 flex flex-col gap-6 p-3 flex-1 text-sm">
              <h4 className="text-xl font-medium">Select Categories</h4>
              <div className="form-select">
                {categories.map((category, index) => (
                  <div
                    className="cat flex items-center gap-2 text-main-700"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      id={category.slug}
                      name="categories"
                      value={category.id}
                      onChange={(e) => setPostCategories(prev=>([...prev, parseInt(e.target.value)]))}
                      defaultChecked={compareArticleCatsId(category.id)}
                    />
                    <label htmlFor={category.slug}>{category.name}</label>
                  </div>
                ))}
              </div>
              <button className="btn rounded-full btn-main-700">+</button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Write;