import "./App.css";
import Header from "./components/headers/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/forms/login";
import Register from "./pages/forms/register";
import PostPage from "./pages/post-pages/poatPage";
import AdminDaxhboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/createPost";
import Footer from "./components/footer/footer";
import PostDetails from "./pages/postDetails/postDetails";
import { ToastContainer } from "react-toastify";
import NotFont from "./pages/notFont/NotFon";
import Category from "./pages/category/Category";
import RecetPassword from "./pages/forms/recetPassword";
import Porfile from "./pages/profile/Profile";
import UserTable from "./pages/admin/UserTable";
import PostTable from "./pages/admin/Post-table";
import CommentTable from "./pages/admin/CommentTable";
import CategoryTable from "./pages/admin/CategoryTable";
import { useSelector } from "react-redux";
import AboutMe from "./pages/Aboutme/About";
function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Router>
      <ToastContainer theme="dark" position="top-center" autoClose={4000} />
      <Header />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/posts" /> : <Home />} />
        <Route path="/profile/1/:username" element={user ? <Porfile /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/posts" /> : <Login />} />
        <Route path="/recetPassword/:token/:id" element={<RecetPassword />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/posts" /> : <Register />}
        />
        <Route
          path="/posts"
          element={user ? <PostPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-post"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
        <Route path="/posts/category/:categoryId" element={<Category />} />
        <Route path="/post/details/:id" element={user ? <PostDetails /> : <Navigate to="/login" />} />
        <Route
          path="/Admin-Dashboard"
          element={user?.isAdmin ? <AdminDaxhboard /> : <Navigate to="/posts" />}
        />
        <Route
          path="/Admin-Dashboard/users-table"
          element={user?.isAdmin ? <UserTable /> : <Navigate to="/posts" />}
        />
        <Route
          path="/Admin-Dashboard/posts-table"
          element={user?.isAdmin ? <PostTable /> : <Navigate to="/posts" />}
        />
        <Route
          path="/Admin-Dashboard/comments-table"
          element={user?.isAdmin ? <CommentTable /> : <Navigate to="/posts" />}
        />
        <Route
          path="/Admin-Dashboard/categories-table"
          element={user?.isAdmin ? <CategoryTable /> : <Navigate to="/posts" />}
        />

        <Route
          path="/about"
          element={<AboutMe />}
        />
        <Route path="*" element={<NotFont />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
