export const elements = {
  resultsList: document.querySelector(".results__list"),
  resultsPage: document.querySelector(".results__pages"),
  resultsLink: document.querySelector(".results__link"),
  searchForm: document.querySelector(".search"),
  recipeContainer: document.querySelector(".recipe"),
  searchButton: document.querySelector(".btn.search__btn"),
  inputText: document.querySelector(".search__field"),
  loaderElement: document.querySelector(".loader"),
  shoppingList: document.querySelector(".shopping__list"),
  shoppingContainer: document.querySelector(".shopping"),
  likesList: document.querySelector(".likes__list")
};

export const renderLoader = parent => {
  //LOADER CLASS
  const loaderClass = "loader";
  const markup = `
      <div class="${loaderClass}">
      <svg>
          <use href="img/icons.svg#icon-cw"/>
      </svg>
      </div>
      `;
  parent.insertAdjacentHTML("afterbegin", markup);
};

export const clearLoader = parent => {
  parent.innerHTML = "";
};

export const limitString = str => {
  //set a limit
  const limit = 20;
  if (str.length > 15) return str.slice(0, 16) + "...";
  else return str;
};
