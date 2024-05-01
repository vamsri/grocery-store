import {createContext, useContext, useState, UseEffect} from 'react';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const login = (username, password) => {
      // Here you would normally handle the login logic,
      // possibly calling an API to authenticate the user
      // For simplicity, we'll just set the user directly
      setUser({ id: '1', username: username });
    };
  
    const logout = () => {
      // Handle logout logic, like clearing the session
      setUser(null);
    };
  
    const value = {
      user,
      login,
      logout
    };
  
    useEffect(() => {
      // Optionally load the user from storage when the app loads
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  
    useEffect(() => {
      // Optionally sync the user to storage when it changes
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  