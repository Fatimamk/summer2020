// need to create a class so new objects can be created (and then displayed.)

class Github {
  constructor() {
    //adds the variables in the new object
    this.client_id = "c5e5f98667adbac46b6c";
    // The client ID you received from GitHub for your GitHub App.(so it knows it's me)
    this.client_secret = "8dc7a440aa92e00a0bc01af7a229646f3a6a231c";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }
  //now for methods
  async getUser(user) {
    //async means a function always return a promise (so we're probs waiting for .then or await)
    //we could use a promise here
    //this is used in app.js where user is the text from the input
  
    const profileResponse = await fetch(
      //await only works inside (wrapped by) async funcs.
      //makes js wait until that promise settles and returns the result of that promise

      // do fetch and assign that value to profileResponse
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const repoReponse = await fetch (
      //then do this fetch and assign it to repoResponse
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );
    const profile = await profileResponse.json();
    //can also have await here because json awaits a promise, here just making profile readable
    const repos = await repoResponse.json();
    //making reporesponse readable
    return {
      profile,
      repos
    }
  }
  //async function ends
}

//has method  getUser(user)
