import { apiKey, proxy } from "../config";
import axios from "axios";
import { Fraction } from "./helper";
export default class Recipe {
    constructor(recipeId) {
        this.id = recipeId;
        // this.getRecipeHelper();
    }

    async getRecipe() {

        let JSONData = {
            data: {
                recipe: {
                    publisher: "Closet Cooking",
                    f2f_url: "http://food2fork.com/view/35107",
                    ingredients: [
                        "1/2 pound ground beef",
                        "6 strips bacon, cut into 1 inch pieces",
                        "1 small onion, diced",
                        "1 clove garlic, chopped",
                        "4 ounces cream cheese, room temperature",
                        "1/2 cup sour cream",
                        "1/4 cup mayonnaise",
                        "1/2 cup mozzarella, shredded",
                        "1/2 cup cheddar cheese, shredded",
                        "1 tablespoon worcestershire sauce",
                        "2 tablespoon ketchup\n"
                    ],
                    source_url: "http://www.closetcooking.com/2012/01/bacon-double-cheese-burger-dip.html",
                    recipe_id: "35107",
                    image_url: "http://static.food2fork.com/Bacon2BDouble2BCheese2BBurger2BDip2B5002B3557cdaa745d.jpg",
                    social_rank: 100,
                    publisher_url: "http://closetcooking.com",
                    title: "Bacon Double Cheese Burger Dip"
                }
            },
            status: 200,
            statusText: "OK",
            headers: {
                "cache-control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
                "content-type": "text/html; charset=utf-8",
                expires: "Tue, 30 Jul 2019 18:00:45 GMT",
                pragma: "no-cache"
            },
            config: {
                transformRequest: {},
                transformResponse: {},
                timeout: 0,
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                maxContentLength: -1,
                headers: {
                    Accept: "application/json, text/plain, */*"
                },
                method: "get",
                url: "https://www.food2fork.com/api/get?key=2164dcb29f2ce15b5ff116b900720efb&rId=35107"
            },
            request: {}
        };

        try {
            let res = await axios(
                `https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`
            );
            //console.log(res);
            this.result = res;
        } catch (error) {
            //console.log(error);
        }


        this.recipe = JSONData.data.recipe;
        this.title = this.recipe.title;
        this.publisher = this.recipe.publisher;
        this.imageURL = this.recipe.image_url;
        this.sourceURL = this.recipe.source_url;
        this.ingredients = this.recipe.ingredients;
        this.servings = 4;
        this.time = "60";
    }
    loadIngredients() {
        this.recipe.ingredients.forEach((element, i) => {
            ////console.log(element);
            let { measureText, measureValue } = this.getCurrentMeasure(element);
            if (!measureText) {
                throw error("Measure can not be null");
            }
            measureText = measureText ? measureText + ' ' : null;
            ////console.log(`[${measureText}]`)
            let unit = this.getUnit(element);
            let text = this.getText(element, measureText, unit);

            this.ingredients[i] = {
                measure: this.removeTrailingSpaces(measureText),
                measureValue: measureValue,
                unit: unit ? unit.replace("tablespoon", "tbsp") : "",
                text: this.removeTrailingSpaces(text)
            };
        });
    }

    removeTrailingSpaces(text) {
        if (text[0] === " ") {
            text = text.substring(1);
        }

        if (text[text.length - 1] === " ") {
            text = text.substring(0, text.length - 1);
        }

        return text;
    }
    getText(sentence, measure, unit) {

        unit = unit ? unit : "";
        let str = measure + unit;

        return sentence.substring(measure.length + unit.length);
    }
    getFraction(sentence) {
        const fraction = /[1-9][0-9]*\/[1-9][0-9]*\ /;
        let fract = sentence.match(fraction);
        fract = fract ? fract[0].substring(0, fract[0].length - 1) : null;
        return fract;
    }

    getNumber(sentence) {
        const number = /^[1-9][0-9]*\ /;
        let num = sentence.match(number);
        num = num ? num[0].substring(0, num[0].length - 1) : null;
        return num;
    }
    getMeasureValue(num, fract) {
        if (num && !fract) {
            return parseInt(num);
        } else if (!num && fract) {
            let fraction = new Fraction(fract);
            return fraction.getValue();
        } else if (num && fract) {
            let fraction = new Fraction(num + '/1');
            fraction = fraction.add(new Fraction(fract));
            return fraction.getValue;
        }
    }
    getCurrentMeasure(sentence) {

        let fract = this.getFraction(sentence);
        let num = this.getNumber(sentence);
        ////console.log("[1]", fract, num);

        if (fract && num) {
            if (sentence.lastIndexOf(num + ' ' + fract) > 0) {

                return { measureValue: this.getMeasureValue(num, fact), measureText: num + ' ' + fract };
            } else {
                let i1 = sentence.search(num);
                let i2 = sentence.search(fract);

                if (i1 === 0) {
                    return { measureText: num, measureValue: this.getMeasureValue(num, null) };
                }

                if (i2 === 0)
                    return { measureText: fract, measureValue: this.getMeasureValue(null, fract) };
            }
        } else if (!num && fract) {
            if (sentence.search(fract) === 0) {
                return { measureText: fract, measureValue: this.getMeasureValue(null, fract) };
            }
        } else if (num && !fract) {
            if (sentence.search(num) === 0) {
                return { measureText: num, measureValue: this.getMeasureValue(num, null) }
            }
        }

    }


    getNewMeasure(servingsFraction, measureText) {
        if (!measureText) return;
        measureText = measureText + ' ';
        let amountNumber,
            amountFraction,
            retvalue = measureText,
            num,
            fract;

        num = this.getNumber(measureText);
        // //console.log(`[${num}]`);
        fract = this.getFraction(measureText);
        //  //console.log(`[${fract}]`);

        amountNumber = num ? new Fraction(`${num}/1`) : null;
        amountFraction = fract ? new Fraction(fract) : null;

        if (amountNumber && !amountFraction) {
            retvalue = amountNumber.multiply(servingsFraction).getFractionNotation();
        } else if (amountNumber && amountFraction) {

            amountNumber = amountNumber.add(amountFraction);
            retvalue = amountNumber.multiply(servingsFraction).getFractionNotation();
        } else if (!amountNumber && amountFraction) {
            retvalue = amountFraction
                .multiply(servingsFraction)
                .getFractionNotation();
        }

        return retvalue + " ";
    }

    getUnit(sentence) {
        if (!(typeof sentence === typeof "name")) return;

        const unitsSingular = ["ounce", "tablespoon", "cup", "g", "kg", "pound"];
        const unitsPlural = ["ounces", "tablespoon", "cups", "g", "kg", "pounds"];
        const units = [...unitsSingular, ...unitsPlural];
        let unit = null;
        //splits sentence into array
        let sentenceArr = sentence.split(" ");
        sentenceArr.forEach(element => {
            units.forEach(u => {
                if (element === u) {
                    unit = u;
                }
            });
        });

        return unit;
    }
    parseIngredients(servingsFraction) {
        for (let i = 0; i < this.ingredients.length; i++) {
            let measureCur = this.ingredients[i].measure;

            let measureNew = this.getNewMeasure(servingsFraction, measureCur);
            this.ingredients[i].measure = measureNew;
            this.ingredients[i].measureValue = this.getMeasureValue(this.getNumber(measureNew), this.getFraction(measureNew))
            ////console.log(this.ingredients[i])
        }
    }
    incServings() {
        let servingPrev = this.servings;
        this.servings++;
        let servingsFraction = new Fraction(`${this.servings}/${servingPrev}`);
        this.parseIngredients(servingsFraction);
    }

    decServings() {
        let servingPrev = this.servings;
        this.servings--;
        let servingsFraction = new Fraction(`${this.servings}/${servingPrev}`);
        this.parseIngredients(servingsFraction);
    }
}

