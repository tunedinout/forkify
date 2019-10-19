import { elements } from "./base";

const recipeHeaderMarkup = recipe => {
  return `<figure class="recipe__fig">
    <img src="${recipe.imageURL}" alt="${recipe.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
    recipe.time
    }</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
    recipe.servings
    }</span>
        <span class="recipe__info-text"> servings</span>

        <div class="recipe__info-buttons">
            <button class="btn-tiny btn-decrease">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-minus"></use>
                </svg>
            </button>
            <button class="btn-tiny btn-increase">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-plus"></use>
                </svg>
            </button>
        </div>

    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart-outlined"></use>
        </svg>
    </button>
</div>
`;
};
export const updateServings = servings => {
  let servingsDOM = document.querySelector(".recipe__info-data--people");
  if (!servingsDOM) return;

  servingsDOM.textContent = servings;
};
const recipeFooterMarkup = (publisher, sourceURL) => {
  return `<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${publisher}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${sourceURL}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>`;
};

const ingredientMarkup = (measure, unit, text) => {
  return `<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${measure ? measure : ""}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${unit ? unit : ""}</span>
        ${text ? text : ""}
    </div>
</li>`;
};
export const renderIngredientsList = (
  recipe,
  ingredientList = "recipe__ingredient-list"
) => {
  let listDOM = document.querySelector(`.${ingredientList}`);
  if (listDOM) listDOM.innerHTML = "";
  recipe.ingredients.forEach(element => {
    listDOM.insertAdjacentHTML(
      "beforeend",
      ingredientMarkup(element.measure, element.unit, element.text)
    );
  });
};
export const renderRecipe = recipe => {


  let recipeIngredients = "recipe__ingredients";
  let ingredientList = "recipe__ingredient-list";
  let recipeDirections = "recipe__directions";
  //add HEADER
  //////console.log(recipeHeaderMarkup(recipe));
  elements.recipeContainer.insertAdjacentHTML(
    "afterbegin",
    recipeHeaderMarkup(recipe)
  );
  //create RECIPE INGREDIENT div
  elements.recipeContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="${recipeIngredients}"></div>`
  );

  //create INGREDIENT LIST
  document
    .querySelector(`.${recipeIngredients}`)
    .insertAdjacentHTML("afterbegin", `<ul class="${ingredientList}"></ul>`);

  renderIngredientsList(recipe, ingredientList);
  document
    .querySelector(`.${recipeIngredients}`)
    .insertAdjacentHTML("beforeend", shoppingPaneMarkup());

  elements.recipeContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="${recipeDirections}"></div>`
  );

  document
    .querySelector(`.${recipeDirections}`)
    .insertAdjacentHTML(
      "afterbegin",
      recipeFooterMarkup(recipe.publisher, recipe.sourceURL)
    );
};
export const clearRecipe = () => {
  elements.recipeContainer.innerHTML = '';
}
const shoppingPaneMarkup = () => {
  return `<button class="btn-small recipe__btn recipe__add_to_cart">
  <svg class="search__icon">
      <use href="img/icons.svg#icon-shopping-cart"></use>
  </svg>
  <span>Add to shopping list</span>
</button>`;
};

export const like = () => {
  let el = document.querySelector(".recipe__love use");
  let elHref = el.attributes["href"].nodeValue;
  if (elHref.toString() === 'img/icons.svg#icon-heart-outlined')
    el.attributes["href"].nodeValue = 'img/icons.svg#icon-heart';
}

export const unLike = () => {
  let el = document.querySelector(".recipe__love use");
  let elHref = el.attributes["href"].nodeValue;
  if (elHref.toString() === 'img/icons.svg#icon-heart')
    el.attributes["href"].nodeValue = 'img/icons.svg#icon-heart-outlined';
}
