

export default class List {
    constructor() {
        this.List = [];
    }

    /**
     * 
     * @param {Array} arr An array of ingredients 
     */
    add(obj) {
        this.List.push(obj);
    }

    addBulk(arr) {
        arr.forEach(element => {

            let obj = {};
            obj.measure = element.measure;
            obj.measureValue = element.measureValue;
            obj.unit = element.unit;
            obj.text = element.text;
            obj.id = this.List.length;
            console.log(`The obj = ${obj}`)
            this.add(obj);
        });
    }
    /**
     * 
     * @param {Number} index 
     * @param {Number} subIndex
     */
    removeIngredient(id) {

        let elIndex = -1;
        this.List.forEach((element, index) => {
            if (element.id === id) {
                elIndex = index;
            }
        });
        // console.log(elIndex)
        if (elIndex !== -1)
            this.List.splice(elIndex, 1);
    }

    clear() {
        this.List = [];
    }


    logList() {
        console.log("the whole list below")
        let arr = [];
        this.List.forEach(element => {
            arr.push(element.text)
        });
        console.log(arr);
    }


}