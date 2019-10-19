import axios from "axios";
import { apiKey, proxy } from "../config";


//getResults("pizza");
//https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search
//820c5d4071msh4d380bffbde947cp18a0d7jsn633cfd2c6685

export default class Search {
  constructor(query) {
    this.query = query;
    this.result = [];
  }

  async getResults(page = 1) {
    let dummyJSONdata = [
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/16553",
        title: "Homemade Black Bean Veggie Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Homemade-Black-Bean-Veggie-Burgers/Detail.aspx",
        recipe_id: "16553",
        image_url: "http://static.food2fork.com/507107991f.jpg",
        social_rank: 100,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "Closet Cooking",
        f2f_url: "http://food2fork.com/view/35107",
        title: "Bacon Double Cheese Burger Dip",
        source_url:
          "http://www.closetcooking.com/2012/01/bacon-double-cheese-burger-dip.html",
        recipe_id: "35107",
        image_url:
          "http://static.food2fork.com/Bacon2BDouble2BCheese2BBurger2BDip2B5002B3557cdaa745d.jpg",
        social_rank: 100,
        publisher_url: "http://closetcooking.com"
      },
      {
        publisher: "What's Gaby Cooking",
        f2f_url: "http://food2fork.com/view/9eb23b",
        title: "Cheddar Jalapeno Chicken Burgers with Guacamole",
        source_url:
          "http://whatsgabycooking.com/cheddar-jalapeno-chicken-burgers-with-guacamole/",
        recipe_id: "9eb23b",
        image_url:
          "http://static.food2fork.com/CheddarJalapenoChickenBurgerswithGuacamole4fdb.jpg",
        social_rank: 99.99999999998766,
        publisher_url: "http://whatsgabycooking.com"
      },
      {
        publisher: "Closet Cooking",
        f2f_url: "http://food2fork.com/view/35119",
        title: "Bacon Wrapped Jalapeno Popper Burgers",
        source_url:
          "http://www.closetcooking.com/2012/05/bacon-wrapped-jalapeno-popper-burgers.html",
        recipe_id: "35119",
        image_url:
          "http://static.food2fork.com/Jalapeno2BPopper2BBurgers2B5002B186755e06e2b.jpg",
        social_rank: 99.9999999996593,
        publisher_url: "http://closetcooking.com"
      },
      {
        publisher: "BBC Good Food",
        f2f_url: "http://food2fork.com/view/6132fc",
        title: "Falafel burgers",
        source_url: "http://www.bbcgoodfood.com/recipes/5605/falafel-burgers",
        recipe_id: "6132fc",
        image_url: "http://static.food2fork.com/5605_MEDIUMe040.jpg",
        social_rank: 99.99999997278992,
        publisher_url: "http://www.bbcgoodfood.com"
      },
      {
        publisher: "The Pioneer Woman",
        f2f_url: "http://food2fork.com/view/46895",
        title: "Pepperoni Pizza Burgers",
        source_url:
          "http://thepioneerwoman.com/cooking/2012/10/pepperoni-pizza-burgers/",
        recipe_id: "46895",
        image_url: "http://static.food2fork.com/pizzaburgera5bd.jpg",
        social_rank: 99.99999990525365,
        publisher_url: "http://thepioneerwoman.com"
      },
      {
        publisher: "101 Cookbooks",
        f2f_url: "http://food2fork.com/view/48034",
        title: "Ultimate Veggie Burger",
        source_url: "http://www.101cookbooks.com/archives/001567.html",
        recipe_id: "48034",
        image_url:
          "http://static.food2fork.com/ultimateveggieburgerrecipe49ac.jpg",
        social_rank: 99.99999887616337,
        publisher_url: "http://www.101cookbooks.com"
      },
      {
        publisher: "Jamie Oliver",
        f2f_url: "http://food2fork.com/view/bc8acd",
        title: "A cracking burger",
        source_url:
          "http://www.jamieoliver.com/recipes/beef-recipes/a-cracking-burger",
        recipe_id: "bc8acd",
        image_url: "http://static.food2fork.com/7_1_1350663561_lrgf1c4.jpg",
        social_rank: 99.99999543148996,
        publisher_url: "http://www.jamieoliver.com"
      },
      {
        publisher: "BBC Good Food",
        f2f_url: "http://food2fork.com/view/1db784",
        title: "Mexican bean burgers with lime yogurt &amp; salsa",
        source_url:
          "http://www.bbcgoodfood.com/recipes/9978/mexican-bean-burgers-with-lime-yogurt-and-salsa",
        recipe_id: "1db784",
        image_url: "http://static.food2fork.com/9978_MEDIUM0908.jpg",
        social_rank: 99.99999309625808,
        publisher_url: "http://www.bbcgoodfood.com"
      },
      {
        publisher: "The Pioneer Woman",
        f2f_url: "http://food2fork.com/view/46892",
        title: "Supreme Pizza Burgers",
        source_url:
          "http://thepioneerwoman.com/cooking/2012/10/supreme-pizza-burgers/",
        recipe_id: "46892",
        image_url: "http://static.food2fork.com/burger53be.jpg",
        social_rank: 99.99999283988569,
        publisher_url: "http://thepioneerwoman.com"
      },
      {
        publisher: "Simply Recipes",
        f2f_url: "http://food2fork.com/view/36765",
        title: "Portobello Mushroom Burger",
        source_url:
          "http://www.simplyrecipes.com/recipes/portobello_mushroom_burger/",
        recipe_id: "36765",
        image_url:
          "http://static.food2fork.com/portabellomushroomburgera300x20048d12011.jpg",
        social_rank: 99.9999903941977,
        publisher_url: "http://simplyrecipes.com"
      },
      {
        publisher: "101 Cookbooks",
        f2f_url: "http://food2fork.com/view/48053",
        title: "Vegetarian Lentil Burgers",
        source_url:
          "http://www.101cookbooks.com/archives/vegetarian-lentil-burgers-recipe.html",
        recipe_id: "48053",
        image_url: "http://static.food2fork.com/lentilburgerrecipe_07405f.jpg",
        social_rank: 99.99999031231295,
        publisher_url: "http://www.101cookbooks.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/679",
        title: "Actually Delicious Turkey Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Actually-Delicious-Turkey-Burgers/Detail.aspx",
        recipe_id: "679",
        image_url: "http://static.food2fork.com/6661337708.jpg",
        social_rank: 99.99998206477366,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "BBC Good Food",
        f2f_url: "http://food2fork.com/view/ee6fc1",
        title: "Superhealthy salmon burgers",
        source_url:
          "http://www.bbcgoodfood.com/recipes/7712/superhealthy-salmon-burgers",
        recipe_id: "ee6fc1",
        image_url: "http://static.food2fork.com/7712_MEDIUM6ec0.jpg",
        social_rank: 99.99995231810512,
        publisher_url: "http://www.bbcgoodfood.com"
      },
      {
        publisher: "The Pioneer Woman",
        f2f_url: "http://food2fork.com/view/46910",
        title: "Low-Carb Burgers",
        source_url:
          "http://thepioneerwoman.com/cooking/2012/07/low-carb-burgers/",
        recipe_id: "46910",
        image_url: "http://static.food2fork.com/lowcarbb3fe.jpg",
        social_rank: 99.99990489317642,
        publisher_url: "http://thepioneerwoman.com"
      },
      {
        publisher: "BBC Good Food",
        f2f_url: "http://food2fork.com/view/0d808d",
        title: "Halloumi aubergine burgers with harissa relish",
        source_url:
          "http://www.bbcgoodfood.com/recipes/2196638/halloumi-aubergine-burgers-with-harissa-relish",
        recipe_id: "0d808d",
        image_url: "http://static.food2fork.com/2196638_MEDIUM8f38.jpg",
        social_rank: 99.99987441370915,
        publisher_url: "http://www.bbcgoodfood.com"
      },
      {
        publisher: "Simply Recipes",
        f2f_url: "http://food2fork.com/view/36440",
        title: "Hawaiian Pork Burger",
        source_url:
          "http://www.simplyrecipes.com/recipes/hawaiian_pork_burger/",
        recipe_id: "36440",
        image_url:
          "http://static.food2fork.com/hawaiianporkburgera300x2006feebb1c.jpg",
        social_rank: 99.99987314475192,
        publisher_url: "http://simplyrecipes.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/28800",
        title: "Slider-Style Mini Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Slider-Style-Mini-Burgers/Detail.aspx",
        recipe_id: "28800",
        image_url: "http://static.food2fork.com/4124619927.jpg",
        social_rank: 99.99984643030041,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "The Pioneer Woman",
        f2f_url: "http://food2fork.com/view/47110",
        title: "Portobello-Prosciutto Burgers",
        source_url:
          "http://thepioneerwoman.com/cooking/2010/08/portobello-prosciutto-burgers/",
        recipe_id: "47110",
        image_url:
          "http://static.food2fork.com/4896232820_f0f8ef5934_ocdf2.jpg",
        social_rank: 99.99956759400102,
        publisher_url: "http://thepioneerwoman.com"
      },
      {
        publisher: "Cookie and Kate",
        f2f_url: "http://food2fork.com/view/aee407",
        title: "All Recipes",
        source_url:
          "http://cookieandkate.com/2013/sweet-potato-black-bean-veggie-burgers/",
        recipe_id: "aee407",
        image_url:
          "http://static.food2fork.com/sweetpotatoblackbeanveggieburgersrecipe03a22.jpg",
        social_rank: 99.99999928863025,
        publisher_url: "http://cookieandkate.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/4151",
        title: "Blue Cheese Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Blue-Cheese-Burgers/Detail.aspx",
        recipe_id: "4151",
        image_url: "http://static.food2fork.com/382212430f.jpg",
        social_rank: 99.99783669156724,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "Chow",
        f2f_url: "http://food2fork.com/view/08de30",
        title: "Black-Eyed Pea Vegan Burgers  Recipe",
        source_url:
          "http://www.chow.com/recipes/29433-black-eyed-pea-vegan-burgers",
        recipe_id: "08de30",
        image_url:
          "http://static.food2fork.com/29433_black_bean_burger_620b533.jpg",
        social_rank: 99.99749738103058,
        publisher_url: "http://www.chow.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/30009",
        title: "Spicy Chipotle Turkey Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Spicy-Chipotle-Turkey-Burgers/Detail.aspx",
        recipe_id: "30009",
        image_url: "http://static.food2fork.com/6770736050.jpg",
        social_rank: 99.99744134898533,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "Chow",
        f2f_url: "http://food2fork.com/view/e370f7",
        title: "Juicy Lucy Burger (a.k.a. Jucy Lucy) Recipe",
        source_url:
          "http://www.chow.com/recipes/29721-juicy-lucy-burger-aka-jucy-lucy",
        recipe_id: "e370f7",
        image_url:
          "http://static.food2fork.com/29721_RecipeImage_620x413_juicy_lucy_burger380a3.jpg",
        social_rank: 99.99999999999454,
        publisher_url: "http://www.chow.com"
      },
      {
        publisher: "Tasty Kitchen",
        f2f_url: "http://food2fork.com/view/4a243d",
        title: "Boyfriend-Approved Spicy Black Bean Burgers",
        source_url:
          "http://tastykitchen.com/recipes/main-courses/boyfriend-approved-spicy-black-bean-burgers/",
        recipe_id: "4a243d",
        image_url:
          "http://static.food2fork.com/BoyfriendApprovedSpicyBlackBeanBurgers410x2722f25.jpg",
        social_rank: 99.99631193508553,
        publisher_url: "http://tastykitchen.com"
      },
      {
        publisher: "BBC Good Food",
        f2f_url: "http://food2fork.com/view/b99682",
        title: "Chickpea &amp; coriander burgers",
        source_url:
          "http://www.bbcgoodfood.com/recipes/1364634/chickpea-and-coriander-burgers",
        recipe_id: "b99682",
        image_url: "http://static.food2fork.com/1364634_MEDIUM6d58.jpg",
        social_rank: 99.99587538836975,
        publisher_url: "http://www.bbcgoodfood.com"
      },
      {
        publisher: "Closet Cooking",
        f2f_url: "http://food2fork.com/view/35108",
        title: "Bacon Double Cheese Burger Salad",
        source_url:
          "http://www.closetcooking.com/2012/04/bacon-double-cheese-burger-salad.html",
        recipe_id: "35108",
        image_url:
          "http://static.food2fork.com/Bacon2BDouble2BCheese2BBurger2BSalad2B5002B61668d04f9e9.jpg",
        social_rank: 99.99516239055096,
        publisher_url: "http://closetcooking.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/5104",
        title: "Burger or Hot Dog Buns",
        source_url:
          "http://allrecipes.com/Recipe/Burger-Or-Hot-Dog-Buns/Detail.aspx",
        recipe_id: "5104",
        image_url: "http://static.food2fork.com/34791858bf.jpg",
        social_rank: 99.99505588972939,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "All Recipes",
        f2f_url: "http://food2fork.com/view/34815",
        title: "Yummy Lemon Salmon Burgers",
        source_url:
          "http://allrecipes.com/Recipe/Yummy-Lemon-Salmon-Burgers/Detail.aspx",
        recipe_id: "34815",
        image_url: "http://static.food2fork.com/2336900af5.jpg",
        social_rank: 99.99209069949582,
        publisher_url: "http://allrecipes.com"
      },
      {
        publisher: "101 Cookbooks",
        f2f_url: "http://food2fork.com/view/47998",
        title: "Tofu Burgers",
        source_url:
          "http://www.101cookbooks.com/archives/tofu-burgers-recipe.html",
        recipe_id: "47998",
        image_url: "http://static.food2fork.com/tofu_burger_recipe7c06.jpg",
        social_rank: 99.99140591261518,
        publisher_url: "http://www.101cookbooks.com"
      }
    ];
    // try {
    //   const res = await axios(
    //     `https://www.food2fork.com/api/search?key=${apiKey}&q=${
    //     this.query
    //     }&page=${page}`
    //   );
    //   this.result = res.data.recipes;

    // } catch (error) {
    //   alert(error);
    // }



    this.result = dummyJSONdata;

    for (let index = 0; index < this.result.length; index++) {
      this.result[index].liked = false;
    };
  }

  //make recipe liked
  like(recipe_id) {


    for (let index = 0; index < this.result.length; index++) {
      if (this.result[index].recipe_id === recipe_id) {
        this.result[index].liked = true;
      }
    }

    console.log(this.ifLiked(recipe_id))
  }

  unLike(recipe_id) {
    for (let index = 0; index < this.result.length; index++) {
      if (this.result[index].recipe_id === recipe_id) {
        this.result[index].liked = false;
      }
    };
  }

  ifLiked(recipe_id) {
    for (let index = 0; index < this.result.length; index++) {
      if (this.result[index].recipe_id === recipe_id) {
        return this.result[index].liked;
      }
    };

    return false;
  }

}
