import firebase from 'firebase';
import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Button, Spinner } from 'reactstrap';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import SignIn from 'features/Auth/SignIn';
import productApi from 'api/productApi';
import { useDispatch } from 'react-redux';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const Photo = React.lazy(() => import('./features/Photo'))

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};
firebase.initializeApp(config);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await productApi.getAll(params);
        console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProductList();
  }, [])

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      // setIsSignedIn(!!user);
      console.log(user);
      if (!user) {
        // users logs out, handle something here
        console.log('User is not logged in');
        return;
      }

      // getMe in signin
      const action = getMe();
      const actionResult = await dispatch(action);
      const currentUser = unwrapResult(actionResult);
      console.log('Logged in user: ', currentUser);

      // console.log('Logged in user: ', user.displayName);
      // const token = await user.getIdToken();
      // console.log('Logged in user: ', token);
      localStorage.setItem('firebaseui::rememberedAccounts', JSON.stringify(user.providerData))
    }); // ComponentDidMount
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleFetchData = async () => {
    try {
      const params = {
        _page: 1,
        _limit: 10,
      };
      const response = await productApi.getAll(params);
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Suspense fallback={<Spinner style={{ width: '3rem', height: '3rem' }} />}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
