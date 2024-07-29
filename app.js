// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PNoet5VYlzGmq9hFUAOlmeZJE-L_SmQ",
  authDomain: "newproject-4dcf2.firebaseapp.com",
  projectId: "newproject-4dcf2",
  storageBucket: "newproject-4dcf2.appspot.com",
  messagingSenderId: "15138848134",
  appId: "1:15138848134:web:118a7aa1458e237f030007",
  measurementId: "G-93NELRG7RE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get elements
const signupUsername = document.getElementById('signup_username');
const signupEmail = document.getElementById('signup_email');
const signupPassword = document.getElementById('signup_password');
const signupBtn = document.getElementById('signup_btn');

const signinEmail = document.getElementById('signin_email');
const signinPassword = document.getElementById('signin_password');
const signinBtn = document.getElementById('signin_btn');
const signInLink = document.getElementById('signin');

const authContainer = document.getElementById('auth_container');
const signinContainer = document.getElementById('signin_container');
const infoContainer = document.getElementById('info_container');
const userName = document.getElementById('user_name');
const logoutBtn = document.getElementById('logout_btn');
const infoForm = document.getElementById('info_form');
const infoDisplay = document.getElementById('info_display');

// Event listeners
signupBtn.addEventListener('click', createUserAccount);
signinBtn.addEventListener('click', signIn);
logoutBtn.addEventListener('click', logOut);
signInLink.addEventListener('click', showSignInForm);

// Functions
function createUserAccount() {
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then(() => {
      console.log('Account created successfully');
      authContainer.style.display = "none";
      signinContainer.style.display = "block";
      localStorage.setItem('username', signupUsername.value); // Store username
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signIn() {
  signInWithEmailAndPassword(auth, signinEmail.value, signinPassword.value)
    .then((userCredential) => {
      console.log('User signed in:', userCredential.user);
      signinContainer.style.display = "none";
      infoContainer.style.display = "block";
      userName.innerText = localStorage.getItem('username'); // Show username
    })
    .catch((error) => {
      alert(error.message);
    });
}

function logOut() {
  signOut(auth).then(() => {
    console.log("User signed out");
    authContainer.style.display = "block";
    signinContainer.style.display = "none";
    infoContainer.style.display = "none";
    localStorage.removeItem('username'); // Clear stored username
  }).catch((error) => {
    alert(error.message);
  });
}

function showSignInForm() {
  authContainer.style.display = "none";
  signinContainer.style.display = "block";
}

infoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('full_name').value;
  const address = document.getElementById('address').value;
  const phoneNumber = document.getElementById('phone_number').value;
  const yourImage = document.getElementById('your_image').files[0];
  
  const reader = new FileReader();
  reader.onload = function(event) {
    const imageUrl = event.target.result;
    displayInfo(fullName, address, phoneNumber, imageUrl);
  };
  reader.readAsDataURL(yourImage);
  
  // Reset form
  infoForm.reset();
});

function displayInfo(name, address, phone, imageUrl) {
  const infoCard = document.createElement('div');
  infoCard.classList.add('info_card');
  
  infoCard.innerHTML = `
    <img src="${imageUrl}" alt="${name}">
    <div>
      <h4 class="info_card_title">${name}</h4>
      <p class="info_card_description"><strong>Address:</strong> ${address}</p>
      <p class="info_card_description"><strong>Phone:</strong> ${phone}</p>
    </div>
  `;
  
  infoDisplay.appendChild(infoCard);
}
