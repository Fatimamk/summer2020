const signupForm = document.getElementById("signupForm");

signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user unfo
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    
    // sign up the user
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function() {
        console.log("error");
    });

    //this returns a promise
    email="";
    password="";
    
})

const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user unfo
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  // sign in the user
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      console.log("try again");
      // ...
    });
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
    //   var displayName = user.displayName;
      var email = user.email;
    //   var emailVerified = user.emailVerified;
    //   var photoURL = user.photoURL;
    //   var isAnonymous = user.isAnonymous;
    //   var uid = user.uid;
    //   var providerData = user.providerData;
    // ...
    window.location.assign("tasks.html")

    console.log(user.email);
    } else {
      // User is signed out.
      // ...
    }
  });

  const logout = document.getElementById("logout");

  logout.addEventListener("click", (e) => {
      e.preventDefault();
      firebase.auth().signOut()
      .then(() => {
          console.log("signed out");
          window.location.assign("index.html")
      });
    //   .catch(function (error) {
    //     // Handle Errors here.
    //     console.log("uh oh");
    //     // ...
    //   });

  });

  


    


