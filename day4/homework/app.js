async function getPokemonHeight (pokeName) {

    const returnedData = await fetch("https://pokeapi.co/api/v2/pokemon/" + this.pokeName);
    
     const usableData = await returnedData.json();

     console.log(usableData);

    // return {
    //     usableData
    // }
}


inputBarElement = document.getElementById("inputBar");

inputBarElement.addEventListener("keyup", (e) => {
    const searchedPokemon = e.target.value;
    // const baseUrl = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`;

    getPokemonHeight(searchedPokemon);
    


    

    
});

    

// fetch(baseUrl)
//   //creating a promise, telling it to get the data using the base url pathway
//   .then((response) => {
//     //when that request is carried out successfully this func is activated. 
//     ///response contains the data from the fetched url
//     //arrow syntax so an anonymous function with parameter response
//     response.json()
//     // the data from fetch url made readable by json function, this function creates a promise
//     .then((userData) => {
//       //if jsonned successfully, create another anon function with userData as parameter - user data is the readable data from the original fetch
//       console.log("Yeeeahhhh Boooiiii!!!", userData);
//       console.log("User Location: ", userData.location);
//       //json treated as object
//       console.log("No. of followers:  ", userData.followers);
//       document.getElementById('profile').innerText = userData.location;
//       //id profile(the whole div)
//       //writing into the div
//       const profileElement = document.getElementById("profile");
//       //think this is just a different way of doing the same thing
//       profileElement.innerHTML = `
//       <div class="badge badge-primary">${userData.location}</div>
//       <div class="thisOne">Number of followers: ${userData.followers}</div>
//       `;
//       // declaration so finish with ;
//     });
//     // end of nested then
//   })
//   //end of initital then
//   .catch((err) => {
//     console.log("Ahh phuck...", err)
//     //catches all possible error so don't need a second one for nested
//   });
//   e.preventDefault();
//   //this was all done in the event listener
// });