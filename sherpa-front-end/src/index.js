// import React from 'react';
// import ReactDOM from 'react-dom';

const BASE_URL = "http://localhost:3000"

document.addEventListener("DOMContentLoaded", function(e){
  if(localStorage.getItem('user_id')){
    const userId = localStorage.getItem('user_id')
    fetch(`${BASE_URL}/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      displayUserPage(user)
    })
    
  } if(localStorage.getItem('coach_id')){
    const coachId = localStorage.getItem('coach_id')
    fetch(`${BASE_URL}/coaches/${coachId}`)
    .then(res => res.json())
    .then(coach => {
      displayCoachPage(coach)
    })
  } else {
    // displayCoachIndex()
    displayHomePage()
    //  can pass in "users" or "coaches" as arguments into Signup
    // //  need to remove "login" from users in order to create similar functionality for Login
    // displaySignup("users")
  }
})