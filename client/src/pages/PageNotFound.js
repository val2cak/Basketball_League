import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
     return (
          <div>
               <h1>Stranica nije pronađena!</h1>
               <h3>
                    Vrati se na naslovnu stranicu: <Link to="/"> Naslovna</Link>
               </h3>
          </div>
     );
}

export default PageNotFound;
