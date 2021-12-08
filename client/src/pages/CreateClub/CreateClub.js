import React, { useContext, useEffect, useState } from "react";
import './CreateClub.css';
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { Image } from "cloudinary-react";
import { BiArrowBack } from 'react-icons/bi';

function CreateClub() {
    const { authState } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [logo, setLogo] = useState([]);

    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
      }, []);

      const upload = () => {
        const formData = new FormData();
        formData.append("file", logo[0]);
        formData.append("upload_preset", "gqezlymj");
        axios
          .post(`https://api.cloudinary.com/v1_1/val2cak/image/upload`, formData)
          .then((response) => {
            const fileName = response.data.public_id;
    
            axios
              .post(
                "http://localhost:3001/clubs",
                {
                  name: name,
                  logoId: fileName,
                },
                {
                  headers: { accessToken: localStorage.getItem("accessToken") },
                }
              )
              .then(() => {
                history.push("/klubovi");
              });
          });
        };

    return ( 
        <div>
            <Link to="/klubovi" className="backI" ><BiArrowBack/></Link>
            <div className="clubContainer">
                <h1>Dodaj klub</h1>
                <label>Ime kluba: </label>
                <input  
                    autoComplete="off"
                    id="nameCreateClub"
                    name="name"
                    placeholder="(Klub...)"
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
                <label>Logo kluba: </label>
                <input
                    name="logoId"
                    type="file"
                    onChange={(e) => setLogo(e.target.files)}
                />

                <button onClick={upload}>Stvori</button>
            </div>
        </div>
    )
}

export default CreateClub;
