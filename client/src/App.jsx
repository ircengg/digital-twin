
import _3DReporting from '././UI/3DReporting'
import Layout from './UI/Layout/Layout'

import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil"

import { alertState, appState, waitLoaderState } from "./Recoil/atom";


function AppInit() {
  const [options, setOptions] = useRecoilState(appState);
  const [loader, setLoader] = useRecoilState(waitLoaderState);
  const [alert_, setAlert] = useRecoilState(alertState);
 


  if (process.env.NODE_ENV === 'development') {
    console.log('Happy developing!');
  }



  // useEffect(() => {
  //   const checkAuth_ = async () => {
  //     setLoader(true);
  //     const auth = await checkAuth();
  //     if (auth.token === false) {
  //       return;
  //     }
  //     if (auth.auth === true) {
  //       let apps = auth.apps.map(a => ({ title: a.appName, link: a.appLink }))
  //         .sort((a, b) => a.title.localeCompare(b.title));
  //       apps.unshift({
  //         title: 'Home',
  //         path: '/',
  //         element: <Home />
  //       });
  //       setNavs(apps);
  //       setOptions({ ...options, isUserLoggedIn: true, ...auth.user });
  //       setAlert({ open: true, message: 'Authenticated', type: 'success' })
  //     }
  //     setLoader(false);
  //   }
  //   checkAuth_();

  // }, [])

  const loginUser_ = async ({ userEmail, userPassword }) => {
    // setLoader(true);
    // const auth = await loginUser({ userEmail, userPassword });
    // if (auth.auth === true) {
    //   let apps = auth.apps.map(a => ({ title: a.appName, link: a.appLink }))
    //     .sort((a, b) => a.title.localeCompare(b.title));
    //   apps.unshift({
    //     title: 'Home',
    //     path: '/',
    //     element: <Home />
    //   });
    //   setNavs(apps);
    //   setOptions({ ...options, isUserLoggedIn: true, ...auth.user });
    //   localStorage.setItem('tokenIrc', auth.user.tokenIrc);
    //   setAlert({ open: true, message: 'Authenticated', type: 'success' })
    // } else {
    //   setAlert({ open: true, message: 'Authention Failed', type: 'error' })
    // }
    // setLoader(false);
  }

  const logoutUser = () => {
   
  }


const navs = [
    {
      title: '3D Reporting',    
      path: '/',
      element: <_3DReporting />
    }
  ]




  return (
    <Layout
      options={options}
      navs={navs}
      loginUser={loginUser_}
      logoutUser={logoutUser}
      showAlert={alert_}
      showLoader={loader}
    />
  )
}





function App() {
  return (
    <RecoilRoot>
      <AppInit />
    </RecoilRoot>
  )
}

export default App

