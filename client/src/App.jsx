import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Friends from "./pages/Friends";
import History from "./pages/History";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import MyProfile from "./pages/MyProfile";
import SavedNotes from "./pages/SavedNotes";
function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <main>
      <LoginButton />
      {isAuthenticated && (
        <BrowserRouter>
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/history" element={<History />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/savednotes" element={<SavedNotes />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </main>
  );
}

export default App;
