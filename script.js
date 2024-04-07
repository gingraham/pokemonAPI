async function getPokemon() {
  //grab the input value
  let input = $("#input").val();
  //check if input is empty and throw error if so.
  if (input === "") {
    console.log(input);
    $("#error").text("add something first").css("color", "red");
  } else {
    //grab the data from the pokemon fetch api passing the input as the query param.
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    //throw error if there's a server issue
    if (!data.ok) {
      throw new Error("Something wrong on the server side.");
    } else {
      //parse our json data
      const response = await data.json(),
        //store the pokemon image in the variable
        pokemon = response.sprites.other.dream_world.front_default;
      console.log(response);
      //add the pokemon image to the pokeball
      $("#pokeball").html(`<img src="${pokemon}" width="120" height="120">`);
      //add the name of the pokemon
      $("#name").text(`You summoned: ${response.name}`).css("color", "white");
      //and its ability.
      $("#ability")
        .text(`With the ${response.abilities[0].ability.name} ability`)
        .css("color", "white");
      //clear the input after all is done.
      $("#input").val("");
      //clear the error if called after all is done.
      $("#error").text("");
    }
  }
}
