import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreatePost from "./pages/CreatePost/CreatePost";
import CreateClub from "./pages/CreateClub/CreateClub";
import CreateGame from "./pages/CreateGame/CreateGame";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post/Post";
import News from "./pages/News/News";
import Clubs from "./pages/Clubs/Clubs";
import Games from "./pages/Games/Games";
import Multimedia from "./pages/Multimedia/Multimedia";
import History from "./pages/History/History";
import AboutUs from "./pages/AboutUs/AboutUs";
import Club from "./pages/Club/Club";
import Partners from "./pages/Partners/Partners";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import logo from "./SKL.png";
import duje from "./duje_logo.png";

function App() {
     const [authState, setAuthState] = useState({
          username: "",
          id: 0,
          status: false,
     });

     useEffect(() => {
          axios.get("http://localhost:3001/auth/auth", {
               headers: {
                    accessToken: localStorage.getItem("accessToken"),
               },
          }).then((response) => {
               if (response.data.error) {
                    setAuthState({ ...authState, status: false });
               } else {
                    setAuthState({
                         username: response.data.username,
                         id: response.data.id,
                         status: true,
                    });
               }
          });
     }, []);

     const logout = () => {
          localStorage.removeItem("accessToken");
          setAuthState({ username: "", id: 0, status: false });
          window.location.pathname = "/";
     };

     return (
          <div className="App">
               <AuthContext.Provider value={{ authState, setAuthState }}>
                    <Router>
                         <div className="computer">
                         <div className="top-strip">
                              {!authState.status ? (
                                   <>
                                        <FaUserAlt className="login-icon" />
                                        <Link to="/login">Admin</Link>
                                   </>
                              ) : (
                                   <>
                                        <GoSignOut className="logout-icon" />
                                        <Link to="/" onClick={logout}>
                                             Odjava
                                        </Link>
                                   </>
                              )}
                         </div>
                         <div className="navbar">
                              <div className="logo">
                                   <img
                                        className="homeLogo"
                                        src={logo}
                                        alt="logo"
                                   />
                              </div>

                              <div className="links">
                                   <Link to="/">Naslovna</Link>
                                   <Link to="/novosti">Novosti</Link>
                                   <Link to="/klubovi">Klubovi</Link>
                                   <Link to="/utakmice">Utakmice</Link>
                                   <Link to="/multimedija">Multimedija</Link>
                                   <Link to="/povijest">Povijest</Link>
                                   <Link to="/partneri">Partneri</Link>
                                   <Link to="/o-nama">O nama</Link>
                              </div>

                         </div>
                         </div>
                         <div className="mobile">
                         <div className="top-strip">
                              {!authState.status ? (
                                   <>
                                        <FaUserAlt className="login-icon" />
                                        <Link to="/login">Admin</Link>
                                   </>
                              ) : (
                                   <>
                                        <GoSignOut className="logout-icon" />
                                        <Link to="/" onClick={logout}>
                                             Odjava
                                        </Link>
                                   </>
                              )}
                         </div>
                         <div className="navbar">
                              <div className="logo">
                                   <img
                                        className="homeLogo"
                                        src={logo}
                                        alt="logo"
                                   />
                              </div>

                              <div className="links">
                                   <Link to="/">Naslovna</Link>
                                   <Link to="/novosti">Novosti</Link>
                                   <Link to="/klubovi">Klubovi</Link>
                                   <Link to="/utakmice">Utakmice</Link>
                                   <Link to="/multimedija">Multimedija</Link>
                                   <Link to="/povijest">Povijest</Link>
                                   <Link to="/partneri">Partneri</Link>
                                   <Link to="/o-nama">O nama</Link>
                              </div>
  
                         </div>
                         </div>
                         <Switch>
                              <Route path="/" exact component={Home} />
                              <Route
                                   path="/objavi"
                                   exact
                                   component={CreatePost}
                              />
                              <Route
                                   path="/dodajklub"
                                   exact
                                   component={CreateClub}
                              />
                              <Route
                                   path="/dodajutakmicu"
                                   exact
                                   component={CreateGame}
                              />
                              <Route path="/novosti" exact component={News} />
                              <Route path="/klubovi" exact component={Clubs} />
                              <Route path="/utakmice" exact component={Games} />
                              <Route
                                   path="/multimedija"
                                   exact
                                   component={Multimedia}
                              />
                              <Route
                                   path="/povijest"
                                   exact
                                   component={History}
                              />
                              <Route path="/o-nama" exact component={AboutUs} />
                              <Route
                                   path="/novosti/:id"
                                   exact
                                   component={Post}
                              />
                              <Route
                                   path="/klubovi/:id"
                                   exact
                                   component={Club}
                              />
                              <Route path="/login" exact component={Login} />
                              <Route
                                   path="/partneri"
                                   exact
                                   component={Partners}
                              />
                              <Route path="*" exact component={PageNotFound} />
                         </Switch>
                    </Router>
               </AuthContext.Provider>
          </div>
     );
}

export default App;
