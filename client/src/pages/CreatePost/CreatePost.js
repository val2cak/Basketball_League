import React, { useContext, useEffect, useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { Image } from "cloudinary-react";
import { BiArrowBack } from "react-icons/bi";

function CreatePost() {
     const { authState } = useContext(AuthContext);
     const [title, setTitle] = useState("");
     const [text, setText] = useState("");
     const [image, setImage] = useState([]);

     let history = useHistory();

     useEffect(() => {
          if (!localStorage.getItem("accessToken")) {
               history.push("/login");
          }
     }, []);

     const upload = () => {
          const formData = new FormData();
          formData.append("file", image[0]);
          formData.append("upload_preset", "gqezlymj");
          axios.post(
               `https://api.cloudinary.com/v1_1/val2cak/image/upload`,
               formData
          ).then((response) => {
               const fileName = response.data.public_id;

               axios.post(
                    "http://localhost:3001/posts",
                    {
                         title: title,
                         text: text,
                         pictureId: fileName,
                    },
                    {
                         headers: {
                              accessToken: localStorage.getItem("accessToken"),
                         },
                    }
               ).then(() => {
                    history.push("/novosti");
               });
          });
     };

     return (
          <div>
               <Link to="/novosti" className="backIc">
                    <BiArrowBack />
               </Link>
               <div className="formContainer">
                    <h1>Kreiraj članak</h1>
                    <label>Naslov: </label>
                    <input
                         autoComplete="off"
                         id="titleCreatePost"
                         name="title"
                         placeholder="(Naslov...)"
                         onChange={(event) => {
                              setTitle(event.target.value);
                         }}
                    />
                    <label>Tekst: </label>
                    <textarea
                         autoComplete="off"
                         id="textCreatePost"
                         name="text"
                         placeholder="(Tekst...)"
                         onChange={(event) => {
                              setText(event.target.value);
                         }}
                    />
                    <label>Naslovna slika: </label>
                    <input
                         name="pictureId"
                         type="file"
                         onChange={(e) => setImage(e.target.files)}
                    />

                    <button onClick={upload}>Objavi</button>
               </div>
          </div>
     );
}

export default CreatePost;
