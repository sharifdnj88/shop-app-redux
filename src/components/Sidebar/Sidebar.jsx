import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuthUser();
  return (
    <>
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                    <ul>
                        <li className="menu-title"> 
                            <span>Main</span>
                        </li>
                        { user?.role?.permissions?.includes("Dashboard") && <li className={`${location.pathname === "/" ? "active" : ""}`}> 
                            <Link to="/"><i className="fe fe-home"></i> <span>Dashboard</span></Link>
                        </li>  }   
                        { user?.role?.permissions?.includes("Orders") && <li className={`${location.pathname === "/orders" ? "active" : ""}`}> 
                            <Link to="/users"><i className="fa fa-bolt"></i> <span>Orders</span></Link>
                        </li> }            
                        { user?.role?.permissions?.includes("Products") && <li className={`${location.pathname === "/products" ? "active" : ""}`}> 
                            <Link to="/users"><i className="fa fa-shopping-cart"></i> <span>Products</span></Link>
                        </li> }
                        { user?.role?.permissions?.includes("Category") && <li className={`${location.pathname === "/category" ? "active" : ""}`}> 
                            <Link to="/users"><i className="fa fa-apple"></i> <span>Category</span></Link>
                        </li> }
                        { user?.role?.permissions?.includes("Tags") && <li className={`${location.pathname === "/tags" ? "active" : ""}`}> 
                            <Link to="/users"><i className="fa fa-tags"></i> <span>Tags</span></Link>
                        </li> }
                        { user?.role?.permissions?.includes("Users") && <li className={`${location.pathname === "/users" ? "active" : ""}`}> 
                            <Link to="/users"><i className="fe fe-user"></i> <span>Users</span></Link>
                        </li> }
                        { user?.role?.permissions?.includes("Roles") && <li className={`${location.pathname === "/role" ? "active" : ""}`}> 
                            <Link to="/role"><i className="fa fa-anchor"></i> <span>Roles</span></Link>
                        </li> }
                        { user?.role?.permissions?.includes("Permission") &&  <li className={`${location.pathname === "/permission" ? "active" : ""}`}> 
                            <Link to="/permission"><i className="fe fe-lock"></i> <span>Permission</span></Link>
                        </li> }                       
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar