// Init GitHub
const github = new Github;
//making object with everything that class Github has access to

// Init UI
const ui = new UI;
//made our 2 new objects

// Search input 
const searchUser = document.getElementById('searchUser');
//searchUser is input box in HTML

// Search input event listener
searchUser.addEventListener('keyup', (e) => {
  // Get input text
  const userText = e.target.value;
  
  if(userText !== ''){
    // Make hhtp call
    // if there's at least comething written there
    github.getUser(userText)
    //get profile response and repo from github class
    //this method contains promises so i assume we treat is as a promise so .then keyword (could also make whole thing async)

    .then(data => {
      //when promise is successfully fulfilled
      if(data.profile.message === 'Not Found'){
        // Show alert
        ui.showAlert('User not found', 'alert alert-danger');
      } else{
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    })
    //end of .then 


  } else{
    // Clear profile
    ui.clearProfile();
    //could probs also do catch error here
  }
});