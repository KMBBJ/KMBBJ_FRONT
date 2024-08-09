/*건들일이 보통 없을것임*/

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/Auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import RoomListPage from "./pages/Matching/RoomListPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <AppRoutes />
        {/* <RoomListPage /> */}
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
