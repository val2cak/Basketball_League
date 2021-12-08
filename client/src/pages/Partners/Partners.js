import React from "react";
import servisnk from "./images/ServisNK.png";
import "./Partners.css";

function Partners() {
     return (
          <div className="partners">
               <img className="partner" src={servisnk} alt="partner" />
          </div>
     );
}

export default Partners;
