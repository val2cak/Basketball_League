import React, { useContext, useEffect, useState } from "react";
import "./CreateGame.css";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { BiArrowBack } from "react-icons/bi";
import DatePicker, { registerLocale } from "react-datepicker";
import hr from "date-fns/locale/hr";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("hr", hr);

function CreateGame() {
     const { authState } = useContext(AuthContext);
     const [listOfClubs, setListOfClubs] = useState([]);
     const [firstClub, setFirstClub] = useState("");
     const [secondClub, setSecondClub] = useState("");
     const [date, setDate] = useState(new Date());

     let history = useHistory();

     useEffect(() => {
          if (!localStorage.getItem("accessToken")) {
               history.push("/login");
          }
     }, []);

     useEffect(() => {
          axios.get("http://localhost:3001/clubs", {}).then((response) => {
               setListOfClubs(response.data.listOfClubs);
          });
     }, []);

     const upload = () => {
          axios.post(
               "http://localhost:3001/games",
               {
                    firstClub: firstClub,
                    secondClub: secondClub,
                    dateTime: date,
               },
               {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }
          ).then(() => {
               history.push("/utakmice");
          });
     };

     return (
          <div>
               <Link to="/utakmice" className="backI">
                    <BiArrowBack />
               </Link>
               <div className="gameContainer">
                    <h1>Dodaj utakmicu</h1>
                    <label>Izaberi prvi klub: </label>
                    <select
                         id="option"
                         value={firstClub}
                         onChange={(e) => setFirstClub(e.target.value)}
                    >
                         {listOfClubs.map((value, key) => (
                              <option key={key} value={value.name}>
                                   {value.name}
                              </option>
                         ))}
                    </select>

                    <label>Izaberi drugi klub: </label>
                    <select
                         id="option"
                         value={secondClub}
                         onChange={(e) => setSecondClub(e.target.value)}
                    >
                         {listOfClubs.map((value, key) => (
                              <option key={key} value={value.name}>
                                   {value.name}
                              </option>
                         ))}
                    </select>

                    <label>Izaberi datum i vrijeme:</label>
                    <DatePicker
                         locale="hr"
                         showTimeSelect
                         timeFormat="HH:mm"
                         dateFormat="d. MMMM yyyy. HH:mm"
                         selected={date}
                         onChange={(date) => setDate(date)}
                         id="time"
                    />

                    <button onClick={upload}>Stvori</button>
               </div>
          </div>
     );
}

export default CreateGame;
