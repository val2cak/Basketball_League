import React, { useContext, useState, useEffect } from "react";
import {
     BrowserRouter as Router,
     Route,
     Switch,
     Link,
     useHistory,
} from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { FiPlusSquare } from "react-icons/fi";
import "./News.css";

function News() {
     const [listOfPosts, setListOfPosts] = useState([]);
     const { authState } = useContext(AuthContext);
     let history = useHistory();

     useEffect(() => {
          axios.get("http://localhost:3001/posts", {}).then((response) => {
               setListOfPosts(response.data.listOfPosts.reverse());
          });
     }, []);

     return (
          <div>
               {authState.status && (
                    <Link to="/objavi" className="plusIcon">
                         <FiPlusSquare />
                    </Link>
               )}

               <div className="flex">
                    {listOfPosts.map((value, key) => {
                         return (
                              <div
                                   key={key}
                                   className="post"
                                   onClick={() => {
                                        history.push(`/novosti/${value.id}`);
                                   }}
                              >
                                   <Image
                                        className="body"
                                        cloudName="val2cak"
                                        publicId={value.pictureId}
                                   />
                                   <div className="title">{value.title}</div>
                              </div>
                         );
                    })}
               </div>
          </div>
     );
}

export default News;
