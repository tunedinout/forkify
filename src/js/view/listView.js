import { elements } from "./base"


const shoppingItemMarkup = (value, step, text, unit, id) => {
    return `<li class="shopping__item" id="shopping__item#${id}">
                    <div class="shopping__count">
                        <input type="number" value="${value}" step="${step}">
                        <p>${unit}</p>
                    </div>
                    <p class="shopping__description">${text}</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
    </li>`
}
const getStep = (number) => {

    const countDigit = (number) => {
        let count = 0;
        while (Math.floor(number / 10) !== 0) {
            number = number / 10;
            count++;
        }

        return count;
    }

    let numberStr = new String(number)
    let digitCount = 0;
    //console.log(numberStr);
    let ifDecimal = numberStr.search(/\./) >= 0 ? numberStr.search(/\./) : null;
    if (ifDecimal) {
        //console.log('re')
        number = parseInt(numberStr.substring(ifDecimal + 1, numberStr.length));
        //console.log(number);
        digitCount = countDigit(number);
        return (1 / (Math.pow(10, digitCount + 1)))
    } else {
        digitCount = countDigit(number);
        return Math.pow(10, digitCount);
    }
}
const renderShoppingItem = (measureValue, text, unit, id) => {
    let listMarkup = shoppingItemMarkup(measureValue, getStep(measureValue), text, unit, id);
    //console.log(listMarkup);
    elements.shoppingList.insertAdjacentHTML('beforeend', listMarkup);
}
export const removeElement = (id) => {
    let el = document.getElementById(`shopping__item#${id}`);
    elements.shoppingList.removeChild(el);
}
export const renderShoppingList = (list) => {
    list.forEach(element => {
        renderShoppingItem(element.measureValue, element.text, element.unit, element.id)
    });
}

export const clearShoppingList = () => {
    elements.shoppingList.innerHTML = '';
}