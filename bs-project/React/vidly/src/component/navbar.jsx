import React, { Component } from 'react';
import { Link,NavLink } from 'react-router-dom';

class NavBar extends Component {
    render() { 
        return ( 
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Vidly
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="nav-item nav-link active"  to="/movies">Movies</NavLink>
                            <NavLink className="nav-item nav-link " to="/customers">Customers</NavLink>
                            <NavLink className="nnav-item nav-link " to="/rentals">Rentals</NavLink>
                            <NavLink className="nnav-item nav-link " to="/login">Login</NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default NavBar;