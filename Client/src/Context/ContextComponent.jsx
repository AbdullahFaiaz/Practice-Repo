import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import auth from "../Firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

// const p = new GithubAuthProvider()
// p.addScope("read:user");
// p.addScope("read:user");



export const AuthContext = createContext(null);

//social auth providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const ContextComponent = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
    const [log, setLog] = useState(false)
  // create state for showing toast 



  // create user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //update profile
  const updateUserProfile = (displayName,photoURL) => {

    return updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    })
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

    //update profile from Update Profile Page
    const updateUserProfilePage = (displayName,photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: displayName,
            photoURL: photoURL,
        })
            .then(() => {
              
            setLoading(false)
            })
            .catch((error) => {
            console.log(error.message);
            });
        };


  //google login
  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  //github login
  const githubLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };
  //log out
  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("logged out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email 
      const loggedUser = {email: userEmail}
      setUser(currentUser);
      setLoading(false);
      console.log("on auth state change: current user ", currentUser);

      //if user exists then issue a token
      if(currentUser){
        axios.post("http://localhost:5000/jwt", loggedUser, {withCredentials: true})
        .then(res => {
          console.log("token response", res.data)
        })
      }
      else{
        axios.post("http://localhost:5000/logout" ,loggedUser, {withCredentials: true})
        .then(res => {
          setLoading(false);
          console.log("logging out", res.data)
        })
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user]);

// giving values to auth info context
  const authInfo = {
    setUser,
    createUser,
    user,
    signInUser,
    googleLogIn,
    githubLogIn,
    logOut,
    loading,
    setLoading,
    updateUserProfile,
    updateUserProfilePage
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

ContextComponent.propTypes = {
  children: PropTypes.node,
};
export default ContextComponent;
