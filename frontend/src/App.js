import logo from './logo.svg';
import './App.css';
import { Navbar } from "./components/Navbar"
import { Route, Routes } from 'react-router-dom'
import { Hotnews } from "./components/hotnews"
import { Read } from "./components/Read"
import { Dashboard } from "./components/Dashboard"
import { Signin } from "./components/signin"
import { AddNews } from './components/AddNews';
import { EditNews } from './components/EditNews';
import { Logout } from './components/logout';
import Footer from "./components/Footer"
import { Courtside } from './components/courtside';

function App() {
  return (

    <div className="App">
      <Navbar />
      <div className="mx-auto px-4 xl:max-w-7xl pt-[30px]">
      <Routes>
        <Route path="/hotnews" element={<Hotnews />} />
        <Route path="/" element={<Hotnews />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/dashboard/edit/:id" element={<EditNews />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<AddNews />} />
        <Route path="/courtside" element={<Courtside />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer />
      </div>
    </div>

  )
}

export default App;
