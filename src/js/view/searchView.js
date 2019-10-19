import { elements, limitString } from "./base";
const renderRecipe = recipe => {
  //   console.log(resultsListDOM);

  const param = {
    link: recipe.source_url,
    imgSrc: recipe.image_url,
    name: recipe.title,
    author: recipe.publisher,
    id: recipe.recipe_id
  };

  var markup = `<li>
        <a class="results__link results__link--active" href="#${param.id}">
            <figure class="results__fig">
                <img src="${param.imgSrc}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitString(param.name)}</h4>
                <p class="results__author">${param.author}</p>
            </div>
        </a>
    </li>`;
  //   console.log(markup);
  elements.resultsList.insertAdjacentHTML("beforeend", markup);

  //   var els = document.querySelectorAll(`a[href="#${param.name}"]`);
  //   els[0].addEventListener("onHover",onHoveringOnTheName)
};

const createButton = (page, type) => `
<button class="btn-inline results__btn--${type}" data-goto=${
  type === "next" ? page + 1 : page - 1
  }>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${
  type === "prev" ? "left" : "right"
  }"></use>
</svg>
<span>Page ${type === "next" ? page + 1 : page - 1}</span>
</button>
`;


const renderButtons = page => {
  let button;
  if (page === 1) {
    //button next
    button = createButton(page, "next");
  } else if (page > 1) {
    //button - both
    button = `
    ${createButton(page, "prev")}
    ${createButton(page, "next")}`;
  }
  elements.resultsPage.insertAdjacentHTML("beforeend", button);
};
export function renderResults(recipes, page = 1, resPerPage = 30) {
  recipes = Array.from(recipes);
  if (!recipes || recipes.length === 0)
    return;
  //RENDER THE RECIPES
  recipes.forEach(renderRecipe);
  //RENDER PAGINATION
  const numResults = recipes.length;
  renderButtons(page, numResults, resPerPage);
}

export function getInput() {
  var inputValue = elements.inputText.value;
  return inputValue;
}

export function clearInput() {
  elements.inputText.value = "";
}

export function clearList() {
  elements.resultsList.innerHTML = "";
}

export function clearPaginationButtons() {
  elements.resultsPage.innerHTML = "";
}
