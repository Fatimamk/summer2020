const inputBarElement = document.getElementById("inputBar");
const heightInfoElement = document.getElementById("heightInfo");
const BMIInfoElement = document.getElementById("BMIInfo");
const BMIHeadingElement = document.getElementById("BMIHeading")


// function get Data declaration
async function getPokemonData (pokemonName){
    const pokemonDataUnreadable = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    const pokemonData = await pokemonDataUnreadable.json();
    return pokemonData;
}

//function HTML add
function addHTML (message) {
    heightInfoElement.innerHTML = 
    `Height: As ${message}`
}

//function use height declaration
function compareHeight (height){
    if (height < 1) {
        let message = "small as a mouse";
        addHTML (message);

    } else if (height >= 1 && height < 5){
        let message = "short as my sister";
        addHTML (message);

    } else if (height >= 5 && height < 20) {
        let message = "tall as a house";
        addHTML (message);

    } else {
        let message = "tall as Godzilla!";
        addHTML (message);
    }
}

//function BMI
function compareBMI (height, weight) {
    let BMI = weight / (height * height);
    // console.log(BMI);
    return BMI;
}

//function write BMI
function writeBMI (BMI){
    BMIHeading.innerHTML = "BMI: "; 

    if(BMI < 18.4) {
    // document.getElementById("changingImage").src = "https://www.vhv.rs/dpng/d/360-3604841_skinny-man-cartoon-group-with-81-items-tall.png";
    BMIInfoElement.innerHTML = BMI + ": Please eat more...";
    // chnagePic()
    


    } else if (BMI >= 18.5 && BMI <= 24.9) {
        // document.getElementById("changingImage").src = "https://cdn.bulbagarden.net/upload/8/8f/068Machamp.png";
        BMIInfoElement.innerHTML = BMI + "Fainting all the time must be a great workout!"

    } else {
        // document.getElementById("changingImage").src = "https://vignette.wikia.nocookie.net/sonicpokemon/images/9/94/Snorlax_AG_anime.png/revision/latest?cb=20130621040305";
        BMIInfoElement.innerHTML = BMI + "Don't worry, it's cute!"

    }
}

//function picture insert

    // image.src = "https://www.vhv.rs/dpng/d/360-3604841_skinny-man-cartoon-group-with-81-items-tall.png";
    // image.alt = "skinny man";


//event listener
inputBarElement.addEventListener("keyup", function (e) {
  const intPokemonName = inputBarElement.value;
  
  if (intPokemonName.length > 2) {
      //make it work even if you type in caps
    let pokemonName = intPokemonName.toLowerCase();
    // console.log(pokemonName);

    //call function
    getPokemonData(pokemonName).then((pokemonData) =>{
        // console.log(pokemonData.height);
        let pokemonHeight = pokemonData.height;
        let pokemonWeight = pokemonData.weight;
        console.log("weight is " + pokemonWeight);

        // write functions here
        compareHeight(pokemonHeight);
        BMI = compareBMI (pokemonHeight, pokemonWeight);
        // console.log(BMI);
        
        writeBMI(BMI);
    })

  } else  {
    console.log("type something");
    heightInfoElement.innerHTML = ""
  }
});

//function expression
// let pokemonHeight = async function (pokemonName){
//     const pokemonDataUnreadable = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//     const pokemonData = await pokemonDataUnreadable.json();
//     return pokemonData.height;
// }



