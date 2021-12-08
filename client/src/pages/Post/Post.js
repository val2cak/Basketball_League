import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { Image } from "cloudinary-react";
import "./Post.css";
import { BiArrowBack } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function Post() {
     let { id } = useParams();
     const [postObject, setPostObject] = useState({});
     const { authState } = useContext(AuthContext);

     let history = useHistory();

     useEffect(() => {
          axios.get(`http://localhost:3001/posts/byId/${id}`).then(
               (response) => {
                    setPostObject(response.data);
               }
          );
     }, []);

     const deletePost = (id) => {
          let r = window.confirm("Sigurno želite izbrisati članak?");
          if (r == true) {
               axios.delete(`http://localhost:3001/posts/${id}`, {
                    headers: {
                         accessToken: localStorage.getItem("accessToken"),
                    },
               }).then(() => {
                    history.push("/novosti");
               });
          }
     };

     return (
          <div className="postPage">
               <Link to="/novosti" className="backIcon">
                    <BiArrowBack />
               </Link>

               <div className="individualPost" id="individual">
                    <div className="title">{postObject.title}</div>
                    <Image
                         className="body"
                         cloudName="val2cak"
                         publicId={postObject.pictureId}
                    />
                    <div className="text">{postObject.text}</div>
               </div>

               <div className="delete">
                    {authState.status && (
                         <div
                              className="deletePost"
                              onClick={() => {
                                   deletePost(postObject.id);
                              }}
                         >
                              <AiFillDelete />
                         </div>
                    )}
               </div>
          </div>
     );
}

export default Post;
