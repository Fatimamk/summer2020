const baseUrl = "https://api.github.com/users/" + username;
  console.log(baseUrl);

    fetch(baseUrl)
      .then(function (response) {
        response
          .json()
          .then((userData) => {
            console.log("User Location: ", userData.location);
          })
          .catch((err) => {
            console.log("Aww...", err);
          });
      })
      .catch((err) => {
        console.log("Aww...", err);
      });
    // fetch(baseUrl)
    //   .then(function (response) {
    //     response
    //       .json()
    //       .then((userData) => {
    //         console.log("User Location: ", userData.location);
    //       })
    //       .catch((err) => {
    //         console.log("Aww...", err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log("Aww...", err);
    //   });

  try {
    const response = await fetch(baseUrl);