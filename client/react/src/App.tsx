import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./managers/auth/Auth-Context";
import ApplicationViews from "./components/ApplicationViews";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<ApplicationViews />} />
          <Route />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
