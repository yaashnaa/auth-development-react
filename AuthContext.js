import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    .catch(error => console.log("Signup error:", error));
    // return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password){
    return auth.signInWithEmailAndPassword(email, password)
  }

  function updateEmail(email) {

    return currentUser.updateEmail(email)

  }
  function updatePassword(password) {

    return currentUser.updatePassword(password)
    
  }


  function logout(){
    return auth.signOut()
  }

  function resetPassword(email){
    return auth.sendPasswordResetEmail(email)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail, 
    updatePassword
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
