import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext} from "../../helpers/AuthContext";
import axios from "axios";
import { Image } from "cloudinary-react";
import './Clubs.css';
import { FiPlusSquare } from 'react-icons/fi';

function Clubs() {
    const [listOfClubs, setListOfClubs] = useState([]);
    const { authState } = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        axios
          .get("http://localhost:3001/clubs", {
          })
          .then((response) => {
            setListOfClubs(response.data.listOfClubs);
          });
    }, []);

    return (
        <div>
            {authState.status && (
                <Link to="/dodajklub" className="plusIcon" ><FiPlusSquare/></Link>
            )}

            <div  className="clubs">
            {listOfClubs.map((value, key) => {
                return (
                    <div key={key}>
                        <Image className="clubsLogo" onClick={() => {
                            history.push(`/klubovi/${value.id}`);
                        }}
                        cloudName="val2cak"
                        publicId={value.logoId} />
                    </div>
                );
            })}
            </div>
        </div>
    );
}

export default Clubs;
