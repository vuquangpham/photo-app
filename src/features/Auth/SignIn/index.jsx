import React from 'react';
import { Container } from 'reactstrap';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    signInSuccessUrl: '/photos',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
};

function SignIn(props) {
    return (
        <Container className="text-center">
            <h2>Login Form</h2>

            <p>or login with social accounts</p>

            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Container>
    );
}

export default SignIn;