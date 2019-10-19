import { elements, limitString } from "./base"

const likesElementMarkup = (recipe) => {
    return `
    <li>
        <a class="likes__link" href="#${recipe.id}">
            <figure class="likes__fig">
                <img src="${recipe.imageURL}" alt="${recipe.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitString(recipe.title)}</h4>
                <p class="likes__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `
}

export const renderElement = (recipe) => {
    elements.likesList.insertAdjacentHTML('beforeend', likesElementMarkup(recipe));
}

export const removeElement = (recipe_id) => {
    let likesList = document.querySelectorAll("li a.likes__link");
    ////console.log(likesList)
    for (let i = 0; i < likesList.length; i++) {
        let el = likesList[i];
        // ////console.log(i, el, el.attributes[1].nodeValue.toString())
        //first attribute will class
        if (el.attributes[1].nodeValue.toString() === `#${recipe_id}`)
            el.parentNode.parentNode.removeChild(el.parentNode)
    }
}