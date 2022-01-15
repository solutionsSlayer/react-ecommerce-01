import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import { onSnapshot } from "firebase/firestore";

import { setCurrentUser } from './features/user/user.actions';
import { selectCurrentUser } from './features/user/user.selectors';

class App extends React.Component {
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        onSnapshot(userRef, userDoc => {
          setCurrentUser({
            currentUser: {
              id: userDoc.id,
              ...userDoc.data()
            }
          }, () => console.log(this.state))
        });
      } else {
        console.log(false)
      }

      // const newArr = collectionsToAdd.map(({ title, items }) => ({ title, items }))

      setCurrentUser(userAuth);

      // FUNCTION FOR FEED DATABASE WITH PROGRAMMING CODE (Faster than manually in DB)
      // addCollectionAndDocuments('collections', newArr);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='shop/*' element={<ShopPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='sign-in' element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapsDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapsDispatchToProps)(App);
