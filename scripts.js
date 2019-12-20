var pokemonRepository = (() => {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  var $modalContainer = document.querySelector('.modal');
  var $overlay = document.querySelector(".overlay");
​
  function loadList() {
    return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      });
  }
​
  function add(item) {
    repository.push(item);
  }
​
  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(res => res.json())
      .then(details => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      }).catch(err => console.log(err))
  }
​
  function addListItem(pokemon) {
    var $pokemonList = $(".pokemon-list"); //Get <ul class="pokemon-list">
    var $listItem = $("<li>"); //Create an <li> element 
    var $button = $('<button>').text(pokemon.name);; //Create a <button> element and add the pokemon's name to the button
    $pokemonList.append($listItem); //Append the <li> element to the <ul>
    $listItem.append($button); //Append the <button to the <li> previously appended 
    $button.on('click', function (event) { //Finally, add a click event to each button 
      showDetails(pokemon); //The click will run the showDetails function on 'click' 
    });
  }
​
  function addListener(button, pokemon) {
    button.addEventListener("click", (e) => {
      showDetails(pokemon);
    });
  }
​
  function showDetails(item) {
    // We get all the dom elements in the modal
    var $modalContainer = $(".modal");
    var $overlay = $(".overlay");
    var $pokemonName = $(".pokeman-name") //Unsure? 
    var $pokemonImg = $(".pokemon-img");
    var $pokemonHeight = $("pokemon-height");
    var $pokemonWeight = $("pokemon-weight");
    // then we get the pokemon we want
    pokemonRepository.loadDetails(item)
      .then(() => {
        // then we add the pokemon to the HTML using JQuery
    var $modalContainer = $("modal-visible");
    var $overlay = $("overlay-visible");
    var $modalContainer = $(removeClass("modal");
    var $pokemonName = $(item.name);
    var $pokemonImg = $("src", item.imageUrl);
    var $pokemonHeight = $(item.height);
    var $pokemonWeight = $(item.weight);
        //$pokemonType.text(item.type); -- doesn't exist as a variable above nor in the HTML
      });
  }
​
  function hideDetails() {
    $modalContainer.removeClass("modal-visible");
    $overlay.remove.classList("overlay-visible");
    $modalContainer.addClass("modal-visable");
  }
​
  document.querySelector(".modal-close").addEventListener("click", () => {
    hideDetails();
  });
​
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains('modal-visible')) {
      hideDetails();
    }
  });
​
  $overlay.addEventListener('click', (e) => {
    var target = e.target;
    console.log(target);
    if (target === $overlay) {
      hideDetails();
    }
  });
​
  function getAll() {
    return repository;
  }
​
  return {
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    getAll: getAll
  };
})();
​
pokemonRepository.loadList()
  .then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  });
