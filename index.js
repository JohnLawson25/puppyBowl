/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

const API = "https://fsa-puppy-bowl.herokuapp.com/api/2605-FTB-ET-WEB-FT-John"

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
//State
let puppies = [];
let selectedPuppy;
////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  try{
    const response = await fetch(API + "/players")
    const result = await response.json();
    puppies = result.data;
  //console.log(response)
  console.log(puppies)
  }
  catch(error){
    console.log(error)
  }
};



/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 * @param {number} playerId
 */
/**
 * Note: In order to call fetchSinglePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to fetch, we cannot call fetchSinglePlayer()
 */
const fetchSinglePlayer = async (playerId) => {
  
  try{
    const response = await fetch(API + "/players/" + playerId);
    const result = await response.json();
    console.log(result)
    selectedPuppy = result.data.player;
  
    render()
  }
  catch(error){
    console.log(error)
  }
};

/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * What does that sound like we need?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */

const addNewPlayer = async (newPlayer) => {
  //TODO
};

/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to remove, we cannot call removePlayer()
 */

const removePlayer = async (playerId) => {
  //TODO
};


//Components
function puppyListItem(puppy){
  const $li = document.createElement("li");
    if(selectedPuppy && puppy.id === selectedPuppy.id) {
      $li.classList.add("selected");
    } 

    $li.innerHTML = `
    <a href="#selected">${puppy.name}</a>
    `;

    $li.addEventListener("click", () => fetchSinglePlayer(puppy.id));
    return $li;
}

function puppyList(){
  const $ul = document.createElement("ul")
  $ul.classList.add("puppies");
  console.log(puppies);
  const $puppies = puppies.players.map(puppyListItem);
  $ul.replaceChildren(...$puppies);

  return $ul;
}

function SelectedPuppy (){
  if(!selectedPuppy){
    const $p = document.createElement("p");
    $p.textContent = "Select a Player to see more.";
    return $p;
  };

  const $puppy = document.createElement("section");
  $puppy.innerHTML = `
  <h3>${selectedPuppy.name} #${selectedPuppy.id}</h3>
  <img src=${selectedPuppy.imageUrl}>
  <h4>Breed: ${selectedPuppy.breed}</h4>
  <h4>Status: ${selectedPuppy.status}</h4>
  <h4>TeamID: ${selectedPuppy.teamId}</h4>
  <button type="submit">Remove from Roster</button>
  `;
  

  return $puppy;
};



/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked such as: name, id, breed, status, image, and team or unassigned if no team
 * - Remove from roster. When a button is clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const render = () => {
  const app = document.querySelector("#app");
  app.innerHTML = `
  <main>
  <h1> Johnny's Puppy Bowl</h1>
  <h3> brought to you by John + FullStack Academy </h3>
  <section>
    <h2>Puppy Roster:</h2>
    <puppyList></puppyList>
  </section>
  <section id="selected">
    <h2>Player stats</h2>
    <selectedPuppy></selectedPuppy>
  </section>
  </section>
        <form>
            <label> Name: <label>
            <input type="text" name="add" /> 
            <label> Breed: <label>
            <input type="text" name="add" />
            <label> Status: <label>
            <select name="status">
              <option value="Default">Select</option>
              <option value="Bench">Bench</option>
              <option value="Field">Field</option>
              </select>
              <label> Prefered food: <label>
              <select  name="food">
                <option value="Default">Select</option>
                <option value="Puppy Chow">Puppy Chow</option>
                <option value="Mega Puppy Protein">Mega Puppy Protein</option>
                <option value="Purinna ONE">Purinna One</option>
              </select>
              <label>ImageURL: </label>
              <input type="text" name="imgUrl" />
              <button type="submit">Add Puppy</buton>
            
        </form>
        </main>`

  app.querySelector("puppyList").replaceWith(puppyList());
  app.querySelector("selectedPuppy").replaceWith(SelectedPuppy());
};

/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  //Before we render, what do we always need?
  await fetchAllPlayers();
  render();
};

init();


