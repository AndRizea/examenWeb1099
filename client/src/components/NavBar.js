import { Link } from "react-router-dom"; 
 
function NavBar() { 
 
    const linkStyle = { 
        "color": 'white', 
        "textDecoration": "none", 
        "paddingLeft": "20px", 
        "paddingRight": "20px", 
        "fontSize": "20px", 
        "display": "flex", 
        "alignItems": "center" 
    }; 
 
  return ( 
    <nav className="navbar navbar-dark bg-primary" style={{ backgroundColor: "#e3f2fd" }}> 
      <ul className="navbar-nav"> 
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            paddingTop: "10px", 
            paddingBottom: "10px", 
          }} 
        > 
          <Link style={linkStyle} to="/"> 
            <li style={{ fontSize: "20px", marginRight:"30px",marginLeft:"20px" }}>Home</li> 
          </Link> 
          <Link style={linkStyle} to="/addBook"> 
            <li style={{ fontSize: "20px", marginRight:"30px" }}>Add book</li> 
          </Link> 
          <Link style={linkStyle} to="/addShelf"> 
            <li style={{ fontSize: "20px", marginRight:"30px" }}>Add shelf</li> 
          </Link> 
          <Link style={linkStyle} to="/deleteBook"> 
            <li style={{ fontSize: "20px", marginRight:"30px" }}>Delete book</li> 
          </Link> 
          <Link style={linkStyle} to="/deleteShelf"> 
            <li style={{ fontSize: "20px", marginRight:"30px" }}>Delete shelf</li> 
          </Link>
        </div> 
      </ul> 
    </nav> 
  ); 
} 
 
export default NavBar;