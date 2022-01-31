import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddBook from './components/AddBook';
import AddShelf from './components/AddShelf';
import NavBar from './components/NavBar';
import DeleteBook from './components/DeleteBook';
import DeleteShelf from './components/DeleteShelf';

function App() {
  return (
    <Router>
      <div>
        <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/addBook" element={<AddBook></AddBook>}></Route>
        <Route path="/addShelf" element={<AddShelf></AddShelf>}></Route>
        <Route path="/deleteBook" element={<DeleteBook></DeleteBook>}></Route>
        <Route path="/deleteShelf" element={<DeleteShelf></DeleteShelf>}></Route>
      </Routes>
      </div>
    
    </Router>
  );
}

export default App;
