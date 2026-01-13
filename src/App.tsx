import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Home, Login, Register } from "./page";
import { Profile } from "./page/home/Profile";
import { Topics } from "./page/topics/Topics";
import { Projects } from "./page/projects/Projects";
import { Groups } from "./page/groups/Groups";
import { Layout } from "./components/Layout";

function App() {
  axios.defaults.baseURL = import.meta.env.BACKEND_URL;
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="topics" element={<Topics />} />
        <Route path="projects" element={<Projects />} />
        <Route path="groups" element={<Groups />} />
      </Route>
    </Routes>
  );
}

export default App;
