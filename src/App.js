import './logo.svg';
import './assets/css/index.css';
import './assets/css/extend.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Write from './pages/Write';
import Category from './pages/Category';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticlesByAuthor from './pages/ArticlesByAuthor';
import MyArticles from './pages/MyArticles';

const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/article/:slug",
        element: <Single/>
      },
      {
        path: "/write",
        element: <Write/>
      },
      {
        path: "/category/:slug",
        element: <Category/>
      },
      {
        path: "/articles/by/:author",
        element: <ArticlesByAuthor/>
      },
      {
        path: "/myarticles",
        element: <MyArticles/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }
]);


function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
