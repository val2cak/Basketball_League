import React from "react";
import ImageSlider from "../../components/ImageSlider";
import "./Home.css";
import SliderData from "../../components/SliderData";
import ball from "./ball.png";

function Home() {
     return (
          <div>
               <div className="ball">
                    <img
                         className="ball"
                         src={ball}
                         alt="ball"
                    />
               </div>
          </div>
     )}

export default Home;
