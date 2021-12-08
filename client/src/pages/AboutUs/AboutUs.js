import React from "react";
import "./AboutUs.css";

function AboutUs() {
     return (
          <div className="aboutUs">
               <label className="aboutUsLabel">KONTAKT</label>
               <div className="aboutUsDiv">
                    splitskakosarkaskaliga@gmail.com
               </div>
               <label className="aboutUsLabel">LOKACIJA</label>
               <div className="aboutUsDiv">
                    Spaladium arena <br />
                    Ul. Zrinsko Frankopanska 211, 21000, Split
               </div>
          </div>
     );
}

export default AboutUs;
