import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { Image } from "cloudinary-react";
import "./Club.css";
import { BiArrowBack } from "react-icons/bi";
import { FaUserPlus, FaUserMinus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Club() {
     let { id } = useParams();
     const [clubObject, setClubObject] = useState({});
     const [listOfPlayers, setListOfPlayers] = useState([]);
     const [newPlayer, setNewPlayer] = useState("");
     const { authState } = useContext(AuthContext);

     let history = useHistory();

     useEffect(() => {
          axios.get(`http://localhost:3001/clubs/byId/${id}`).then(
               (response) => {
                    setClubObject(response.data);
               }
          );

          axios.get(`http://localhost:3001/players/${id}`).then((response) => {
               setListOfPlayers(response.data);
          });
     }, []);

     const addPlayer = () => {
          let playerName = window.prompt("Upiši ime i prezime igrača:");
          axios.post(
               "http://localhost:3001/players",
               {
                    name: playerName,
                    ClubId: id,
               },
               {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }
          ).then((response) => {
               if (response.data.error) {
                    console.log(response.data.error);
               } else {
                    const playerToAdd = {
                         name: playerName,
                    };
                    setListOfPlayers([...listOfPlayers, playerToAdd]);
                    setNewPlayer("");
               }
          });
     };

     const deletePlayer = (id) => {
          let r = window.confirm("Sigurno želite izbrisati igrača?");
          if (r == true) {
               axios.delete(`http://localhost:3001/players/${id}`, {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }).then(() => {
                    setListOfPlayers(
                         listOfPlayers.filter((val) => {
                              return val.id !== id;
                         })
                    );
               });
          }
     };

     const deleteClub = (id) => {
          let r = window.confirm("Sigurno želite izbrisati klub?");
          if (r == true) {
               axios.delete(`http://localhost:3001/clubs/${id}`, {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }).then(() => {
                    history.push("/klubovi");
               });
          }
     };

     return (
          <div>
               <div>
                    <Link to="/klubovi" className="back">
                         <BiArrowBack />
                    </Link>
               </div>
               <div className="editDelete">
                    {authState.status && (
                         <div
                              className="deleteClub"
                              onClick={() => {
                                   deleteClub(clubObject.id);
                              }}
                         >
                              <AiFillDelete />
                         </div>
                    )}
                    )}
                    {authState.status && (
                         <div className="addPlayer" onClick={addPlayer}>
                              <FaUserPlus />
                         </div>
                    )}
               </div>

               <div className="club">
                    <div id="individual">
                         <div className="name">{clubObject.name}</div>
                         <Image
                              className="logoClub"
                              cloudName="val2cak"
                              publicId={clubObject.logoId}
                         />
                    </div>
               </div>
               <h1>IGRAČI</h1>
               <div className="players">
                    {listOfPlayers.map((value, key) => {
                         return (
                              <div key={key} className="player">
                                   <div className="playerName">
                                        {" "}
                                        {value.name}{" "}
                                   </div>
                                   {authState.status && (
                                        <div
                                             className="deletePlayer"
                                             onClick={() => {
                                                  deletePlayer(value.id);
                                             }}
                                        >
                                             <FaUserMinus />
                                        </div>
                                   )}
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}

export default Club;
