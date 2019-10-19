export default class LikeList {
    constructor() {
        this.list = [];
    }

    add(obj) {
        this.list.push(obj);
    }

    remove(id) {
        let index;
        for (index = 0; index < this.list.length; index++) {
            if (this.list[index].id === id)
                break;
        };

        this.list.splice(index, 1);
    }
}