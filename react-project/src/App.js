import { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import Router from './Router';
import Navbar from './components/Navbar';
import Snackbar from './components/Snackbar';
import Loader from './components/Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { RoleTypes } from './components/Navbar-config'
import RouterAuth from './RouterAuth';


export const GeneralContext = createContext();
export const token = 'd2960a9e-3431-11ee-b3e9-14dda9d4a5f0';


export default function App() {
  const [user, setUser] = useState();
  const [loader, setLoader] = useState(true);
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [snackbarText, setSnackbarText] = useState('');
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });


  const snackbar = text => {
    setSnackbarText(text);
    setTimeout(() => setSnackbarText(''), 3 * 1000);
  }


  useEffect(() => {
    fetch(`https://api.shipap.co.il/clients/login`, {
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then(x => {
            throw new Error(x);
          });
        }
      })
      .then(data => {
        setUser(data);
        setRoleType(RoleTypes.user);

        if (data.business) {
          setRoleType(RoleTypes.business);
        } else if (data.admin) {
          setRoleType(RoleTypes.admin);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoader(false));
  }, []);



  //check login status every 10 minutes
  useEffect(() => {
    setInterval(() => {
      fetch(`https://api.shipap.co.il/clients/login`, {
        credentials: 'include',
      })
        .then(res => {
          if (res.ok) {
            return;
          } else {
            setUser();
            setRoleType(RoleTypes.none);
            throw new Error("User is not logged in");
          }
        })
        .catch(err => console.log(err))

    }, 10 * 60 * 1000)
  }, [])




  return (
    <GeneralContext.Provider value={{ user, setUser, loader, setLoader, roleType, setRoleType, snackbar, navigate, searchWord, setSearchWord, darkMode, setDarkMode }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className='App' style={{ backgroundColor: darkMode ? "#121212" : "	#EEE9DC" }}>
          <Navbar />
          {user ? <RouterAuth /> : <Router />}
          <Footer />
          {loader && <Loader />}
          {snackbarText && <Snackbar text={snackbarText} />}
        </div>
      </ThemeProvider>
    </GeneralContext.Provider>
  );
}


