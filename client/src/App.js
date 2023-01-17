import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "scenes/LoginPage";
import HomePage from "scenes/HomePage";
import ProfilePage from "scenes/ProfilePage";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={ <HomePage />}/>
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
