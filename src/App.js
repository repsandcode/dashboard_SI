import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AddUser, Auth, Dashboard, EditUser } from "./pages";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="container-lg">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/:id/edit" element={<EditUser />} />
          </Route>

          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
