var pokemonRepository = (() => {
  var repository = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  var $modalContainer = document.querySelector(".modal");
  var $overlay = document.querySelector(".overlay");

  function loadList() {
    return fetch(apiUrl)
      .then(res => res.json())
      .then(pokemonList => {
        var response = pokemonList.results;
        response.forEach((item, index) => {
          var nameCapitalized = item.name.charAt(0).toUpperCase() + item.name.slice(1)
          var pokemon = {
          name: nameCapitalized,
          detailsUrl: item.url,
          index: index + 1
          };
          add(pokemon);
        });
      }).catch(err => {
        console.log(err);
      });
  }

  function add(item) {
    repository.push(item);
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(res => res.json())
      .then(details => {
        var types = details.types;
        var typeList = [];

        types.forEach(iterate => {
          typeList.push(iterate.type.name);
        });

        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.type = typeList.join(", ");
      }).catch(err => console.log(err))
  }

  function addListItem(pokemon) {
    var $pokemonList = document.querySelector("ul");
    var $listItem = document.createElement("li");
    var $button = document.createElement("button");
    $button.innerText = pokemon.index + ". " + pokemon.name;
    $button.classList.add("list-button");
    $pokemonList.appendChild($listItem);
    $listItem.appendChild($button)
    addListener($button, pokemon);
  }

function addListener(button, pokemon) {
  button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }
  
function showDetails(item) {
  var $pokemonName = document.querySelector(".pokemon-name");
  var $pokemonImg = document.querySelector(".pokemon-img");
  var $pokemonHeight = document.querySelector(".pokemon-height");
  var $pokemonWeight = document.querySelector(".pokemon-weight");
  var $pokemonType = document.querySelector(".pokemon-type");
  
  pokemonRepository.loadDetails(item)
    .then(() => {
       $modalContainer.removeClass("modal-visible");
       $overlay.addclassList("overlay-visible");
       $modalContainer.removeclassList("modal");
       $pokemonName.text(item.name);
       $pokemonImg.src = item.imageUrl;
       $pokemonHeight.textContent = item.height;
       $pokemonWeight.textContent = item.weight;
       $pokemonType.textContent = item.type;
    });
}

function hideDetails() {
    $modalContainer.remove.classList("modal-visible");
    $overlay.remove.classList("overlay-visible");
    $modalContainer.add.classList("modal");
  }

  document.querySelector(".modal-close").addEventListener("click", () => {
    hideDetails();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $modalContainer.classList.contains("modal-visible")) {
      hideDetails();
    }
  });

  $overlay.addEventListener("click", (e) => {
    var target = e.target;
    if (target === $overlay) {
      hideDetails();
    }
  });
  
function getAll() {
  return repository;
}

return {
  loadList: loadList,
  loadDetails: loadDetails,
  addListItem: addListItem,
  getAll: getAll
};
})();

pokemonRepository.loadList()
  .then(() => {
    pokemonRepository.getAll().forEach(pokemon => {
      pokemonRepository.addListItem(pokemon);
    });
  }); 
