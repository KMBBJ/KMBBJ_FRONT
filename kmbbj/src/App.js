/*건들일이 보통 없을것임*/

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/Auth/AuthContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;