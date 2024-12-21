import { useState, useContext, useEffect, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  useEffect(() => {
    // Use JSON.parse, not JSON.stringify
    const data = localStorage.getItem('auth');

    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token
      });
    }
  }, []); // Correctly set the dependency array

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
   const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useAuth, AuthProvider };
