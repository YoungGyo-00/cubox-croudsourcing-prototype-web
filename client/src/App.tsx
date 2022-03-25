import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from 'pages/Main/MainPage';
import SignInPage from 'pages/SignIn/SignInPage';
import CertificationPage from 'pages/SignUp/CertificationPage';
import SignUpPage from 'pages/SignUp/SignUpPage';
import CenterDetailPage from 'pages/CenterDetail/CenterDetailPage';
import Modal from 'react-modal';
import Auth from 'pages/Auth';
import Project from 'pages/Project/Project';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/certification" element={<CertificationPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/center/:centerId" element={<CenterDetailPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

Modal.setAppElement('#root');

export default App;
