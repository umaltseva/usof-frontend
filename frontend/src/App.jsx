import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PostsPage from "./components/posts/PostsPage";
import Header from "./components/posts/Header";
import Login from "./components/posts/Login";
import Register from "./components/posts/Register";
import Filter from "./components/posts/Filtering";
import Profile from "./components/posts/Profile";
import Sidebar from "./components/posts/Sidebar";
import ProfileCard from "./components/posts/ProfileCard";
import EditProfile from "./components/posts/EditProfile";
import ChangePassword from "./components/posts/ChangePassword";
import CreatePost from "./components/posts/CreatePost";
import EditPost from "./components/posts/EditPost";
import CreateComment from "./components/posts/CreateComment";
import CommentsPage from "./components/posts/CommentsPage";
import CommentList from "./components/posts/CommentList";

const App = () => {
  return (
    <BrowserRouter>
      {<Header />}
      <Routes>
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/login/:token?" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/profilecard" element={<ProfileCard />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/editpost" element={<EditPost />} />
        <Route path="/createcomment" element={<CreateComment />} />
        <Route path="/comments/:postId" element={<CommentsPage />} />
        <Route path="/commentlist" element={<CommentList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
