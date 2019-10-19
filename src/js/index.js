import * as searchView from "./view/searchView";
import * as recipeView from "./view/recipeView";
import * as listView from "./view/listView"
import * as likesView from "./view/likesView"
import { elements, renderLoader, clearLoader } from "./view/base";
import Search from "./models/search";
import Recipe from "./models/recipe";
import List from "./models/list"
import Likes from "./models/likes"

//////console.log(element);
const state = {};

const searchController = async event => {
  //get query
  const query = searchView.getInput();
  if (query) {
    //create search object
    state.search = new Search(query);

    //clear input and list
    searchView.clearList();
    searchView.clearPaginationButtons();
    searchView.clearInput();
    //wait for the data to load
    await loadSearchResults(1);
    ////console.log(state.search.result);
    searchView.renderResults(state.search.result, 1);
    recipeView.clearRecipe();

  }
};
const loadSearchResults = async page => {
  renderLoader(elements.resultsList);
  await state.search.getResults(page);

  clearLoader(elements.resultsList);
};

// *****************************************SEARCH***************************

const listPaginationController = async event => {
  const btn = event.target.closest(".btn-inline");
  const page = parseInt(btn.dataset["goto"]);
  ////console.log(btn, page);
  searchView.clearList();
  searchView.clearPaginationButtons();
  await loadSearchResults(page);
  searchView.renderResults(state.search.result, page);
};

// *****************************************LIST PAGINATION*********************

const recipeController = async (event, listName) => {
  const recipeIdLink = event.target.closest(`.${listName}`).href;
  let recipeId = recipeIdLink.substring(recipeIdLink.lastIndexOf("#") + 1);
  //only for TESTING
  //recipeId = "35107";

  //console.log(recipeId);


  state.recipe = new Recipe(recipeId);

  //load recipe
  try {
    recipeView.clearRecipe();
    renderLoader(elements.recipeContainer);
    await state.recipe.getRecipe();
    state.recipe.loadIngredients();
  } catch (error) {
    alert("unable to process recipe");
    recipeView.clearRecipe();
    return;
  }
  clearLoader(elements.recipeContainer);
  const recipe = {
    title: state.recipe.title,
    publisher: state.recipe.publisher,
    imageURL: state.recipe.imageURL,
    sourceURL: state.recipe.sourceURL,
    ingredients: state.recipe.ingredients,
    time: state.recipe.time,
    servings: state.recipe.servings,
    id: state.recipe.id,
  };
  recipeView.renderRecipe(recipe);

  //check if recipe already liked
  //console.log(state.search.ifLiked(recipe.id));
  if (state.search.ifLiked(recipe.id))
    recipeView.like();
  else
    recipeView.unLike();

  let buttonIncDOM = document.querySelector(".btn-increase");
  let buttonDecDOM = document.querySelector(".btn-decrease");

  if (buttonIncDOM && buttonDecDOM) {
    buttonIncDOM.addEventListener("click", e => {
      state.recipe.incServings();
      recipeView.renderIngredientsList(recipe);
      recipeView.updateServings(state.recipe.servings);
    })

    buttonDecDOM.addEventListener('click', e => {
      state.recipe.decServings();
      recipeView.renderIngredientsList(recipe);
      recipeView.updateServings(state.recipe.servings);
    })
  }
};

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchController();
});

elements.resultsPage.addEventListener("click", async e => {
  e.preventDefault();
  listPaginationController(e);
});

elements.resultsList.addEventListener("click", async e => {
  e.preventDefault();
  await recipeController(e, "results__link");
  // add listener for the buttons


});

elements.likesList.addEventListener("click", async e => {
  e.preventDefault();
  await recipeController(e, "likes__link");
})


elements.recipeContainer.addEventListener("click", (e) => {
  
  let addToShoppingListDOM = e.target.closest(".recipe__add_to_cart");
  if (!addToShoppingListDOM)
    return;

  //getList of Ingredients and add to list model
  if (!state.list)
    state.list = new List();
  state.list.addBulk(state.recipe.ingredients);

  state.list.logList();
  listView.renderShoppingList(state.list.List)



})
elements.shoppingContainer.addEventListener("click",(e) => {
  
})
elements.shoppingList.addEventListener("click", (e) => {
  
  if (!e.target.closest(".shopping__item svg"))
    return;
  let id = e.target.closest(".shopping__item").id;
  id = id.substring(id.lastIndexOf('#') + 1, id.length);
  // //console.log(id)
  state.list.removeIngredient(parseInt(id));
  state.list.logList();
  listView.removeElement(id);
})

elements.recipeContainer.addEventListener("click", (e) => {
  let buttonEl = e.target.closest(".recipe__love");
  if (!buttonEl)
    return;

  //add elements to likes list  - back
  state.likes = new Likes();
  const { title, publisher, imageURL, id, servings } = state.recipe;
  const recipe = { title, publisher, imageURL, id, servings };
  //console.log(recipe);
  //console.log(state.search.ifLiked(recipe.id));
  if (state.search.ifLiked(recipe.id) === false) {
    state.likes.add(recipe);
    // add element to the likes View - front
    likesView.renderElement(recipe);
    //change the icon of the heart
    recipeView.like();
    state.search.like(recipe.id);
  } else {
    state.likes.remove(recipe.id);
    // add element to the likes View - front
    likesView.removeElement(recipe.id);
    //change the icon of the heart
    recipeView.unLike();
    state.search.unLike(recipe.id);
  }


  // where to maintain all the list of liked elements
})

