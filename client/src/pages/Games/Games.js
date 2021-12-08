import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import axios from "axios";
import "./Games.css";
import { FiPlusSquare } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Games() {
     const [listOfGames, setListOfGames] = useState([]);
     const { authState } = useContext(AuthContext);
     let history = useHistory();

     useEffect(() => {
          axios.get("http://localhost:3001/games", {}).then((response) => {
               setListOfGames(response.data.listOfGames);
          });
     }, []);

     const formatDate = (dateString) => {
          const options = {
               year: "numeric",
               month: "numeric",
               day: "numeric",
               hour: "numeric",
               minute: "numeric",
          };
          return new Date(dateString).toLocaleDateString("hr-HR", options);
     };

     const compareDate = (d1, d2) => {
          const date1 = new Date(d1);
          const date2 = new Date(d2);
          return date1 > date2;
     };

     const changeScore = (id) => {
     let newScore = prompt("Unesi novi rezultat:", "0 : 0");
      axios.put(
        "http://localhost:3001/games/score",
        {
          newScore: newScore,
          id: id,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      ).then((response) => {
               if (response.data.error) {
                    console.log(response.data.error);
               } else {
                    axios.get("http://localhost:3001/games", {}).then((response) => {
                         setListOfGames(response.data.listOfGames);
                    });
               }
          });
     };

     const deleteGame = (id) => {
          let r = window.confirm("Sigurno želite izbrisati utakmicu?");
          if (r == true) {
               axios.delete(`http://localhost:3001/games/${id}`, {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }).then(() => {
                    setListOfGames(
                         listOfGames.filter((val) => {
                              return val.id !== id;
                         })
                    );
               });
          }
     };

     return (
          <div>
               {authState.status && (
                    <Link to="/dodajutakmicu" className="plusIcon">
                         <FiPlusSquare />
                    </Link>
               )}
               <h2 className="headerGames">NADOLAZEĆE UTAKMICE</h2>
               <div className="upcomingGames">
                    {listOfGames.map((value, key) => {
                         return (
                              <>
                                   {compareDate(value.dateTime, Date.now()) && (
                                        <div>
                                        <div key={key} className="game">
                                             <div className="dateTime">
                                                  {formatDate(value.dateTime)}
                                             </div>
                                             <div className="gameClubs">
                                                  <div className="firstClub">
                                                       {value.firstClub}
                                                  </div>
                                                  <div className="vs">VS</div>
                                                  <div className="secondClub">
                                                       {value.secondClub}
                                                  </div>
                                                  
                                             </div>
                                             </div>
                                             {authState.status && (
                                                       <div
                                                            className="deleteGame"
                                                            onClick={() => {
                                                            deleteGame(value.id);
                                                            }}
                                                       >
                                                       <AiFillDelete />
                                                  </div>
                                                  )}
                                        </div>
                                   )}
                              </>
                         );
                    })}
               </div>
               <h2 className="headerGames">PROTEKLE UTAKMICE</h2>
               <div className="pastGames">
                    {listOfGames.map((value, key) => {
                         return (
                              <>
                                   {!compareDate(
                                        value.dateTime,
                                        Date.now()
                                   ) && (
                                        <div>
                                             <div key={key} className="game" onClick={() => {changeScore(value.id)}}>
                                                  <div className="dateTime">
                                                       {formatDate(value.dateTime)}
                                                  </div>
                                                  <div className="gameClubs">
                                                       <div className="firstClub">
                                                            {value.firstClub}
                                                       </div>
                                                       <div className="vs">VS</div>
                                                       <div className="secondClub">
                                                            {value.secondClub}
                                                       </div>
                                                       <div className="gameScore">
                                                            {value.gameScore}
                                                       </div>
                                                  </div>
                                             </div>
                                                  {authState.status && (
                                                       <div
                                                            className="deleteGame"
                                                            onClick={() => {
                                                            deleteGame(value.id);
                                                            }}
                                                       >
                                                       <AiFillDelete />
                                                  </div>
                                                  )}
                                        </div>
                                   )}
                              </>
                         );
                    })}
               </div>
          </div>
     );
}

export default Games;
