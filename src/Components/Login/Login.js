import React,{ useContext, useState } from 'react';
import {Button, Card, Container, Form } from 'react-bootstrap';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from '../firebase.config';
import { Link, useHistory, useLocation } from 'react-router-dom';
import image from '../../images/download.png';

import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else {
    firebase.app(); // if already initialized, use that one
  }
  




const Login = () => {
const [newUser, setNewUser] = useState(false)
  const  [user, setUser] = useState({
  isSignedIn: false,
  name:'',
  email:'',
  password:'',
  confirm:'',
  photo:''
  
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const  provider = new firebase.auth.GoogleAuthProvider();
   const handleSignIn = () => {
  firebase.auth().signInWithPopup(provider)
  .then(res => {
  
  const {displayName, photoURL, email} = res.user;
  

  const signedInUser ={
    isSignedIn: true,
    name:displayName,
    email:email,
    photo:photoURL
  }
  setUser(signedInUser)
  setLoggedInUser(signedInUser);
    history.replace(from);
  console.log(displayName, photoURL, email)
  })
  .catch(err => {
    console.log(err, err.message);
  })
   }
  const handleSignOut = () =>{
firebase.auth().signOut()
.then(res => {
const signOutUser ={
  isSignedIn: false,
  name:'',
  photo:'',
  email:'',
  error:'',
  success: false
}
setUser(signOutUser)
})
.catch(err => {



})
  }
  const handleBlur = (e) => {
    let isFormValid = true;
console.log(e.target.value)
if (e.target.name === 'email') {
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    console.log(isFormValid)
}
// if (('#password').attr('value') == ('#cPassword').attr('value')) {
//   alert("match")
//     const isValidPassword = e.target.value.length > 6;
//     isFormValid= isValidPassword;
// }
if (isFormValid===true) {
  const newUserInfo = {...user}
  newUserInfo[e.target.name] = e.target.value;
  setUser(newUserInfo)
}


}
const handleSubmit = (e) => {
if(newUser && user.email && user.password){

  firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user}
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    updateUserName(user.name)
    history.replace(from);
  }).catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });
}

if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res => {
    const newUserInfo = {...user}
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
    console.log('sign in user info', res.user)
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo)
  });
}
   e.preventDefault();
}
const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
      
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });

}


    return (

        <Container className="d-flex  align-items-center justify-content-center" style={{maxWidth: "100vh"}}>
            <div className="w-10" style={{maxWidth:"400px"}}>
            <Card>
              <Card.Body>
               <h2 className="text-center mb-4">Log in!</h2>
            
                <Form onSubmit={handleSubmit}>

                 <Form.Group id = 'email'>
                   <Form.Label>Email</Form.Label>
                   <Form.Control onBlur={handleBlur} name="email" type="email"  placeholder="Your Email" required/>
                 </Form.Group>
                 <Form.Group id = 'password'>
                   <Form.Label>Password</Form.Label>
                   <Form.Control onBlur={handleBlur} name="password" id="password" type="password" required/>
                 </Form.Group>
                 <Form.Control onBlur={handleBlur} type="submit"/>

                </Form>
              </Card.Body>
            </Card>
           <div className="w-10 text-center mt-2">
             Already have an account?<Link to="/signup">Sign up!</Link>
           </div>
             <p style={{color: 'red'}}>{user.error}</p>
             {user.success && <p style={{color:'green'}}>User {newUser ? 'created' : 'Logged in'} successfully</p>}
             
      
            <div className="button">
               <Button variant="light" onClick={handleSignIn}>Sign In With Google</Button>
               <img src={image} alt=""/>
            </div>
          
        


        </div>
        </Container>
    
    );
};

export default Login;