import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./managers/auth/Auth-Context";
import ApplicationViews from "./components/ApplicationViews";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<ApplicationViews />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
