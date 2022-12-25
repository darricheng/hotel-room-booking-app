// React context provider for Firebase authentication throughout the app
// Referenced from: https://stackoverflow.com/questions/74016589/how-can-i-provide-options-when-not-being-deployed-to-hosting-via-source

import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebaseConfig";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  // Properties available for the user object
  // See: https://firebase.google.com/docs/reference/js/v8/firebase.User
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
