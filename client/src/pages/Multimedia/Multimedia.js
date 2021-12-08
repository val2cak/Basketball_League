import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { FiPlusSquare } from "react-icons/fi";
import "./Multimedia.css";

function Multimedia() {
     const { authState } = useContext(AuthContext);

     return (
          <div>
               {authState.status && (
                    <Link to="/objavi" className="plusIcon">
                         <FiPlusSquare />
                    </Link>
               )}
          </div>
     );
}

export default Multimedia;
