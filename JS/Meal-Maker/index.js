menu = {
    _courses: {
      appetizers: [],
      mains: [],
      desserts: []
    },
    get appetizers () {
      return this._courses.appetizers;
    },
    set appetizers (appetizers) {
      this._courses.appetizers = appetizers;
    },
    get mains () {
      return this._courses.mains;
    },
    set mians (mians) {
      this._courses.mians = mians;
    },
    get desserts () {
      return this._courses.desserts;
    },
    set desserts (desserts) {
      this._courses.desserts = desserts;
    },
      get courses () {
      return {
        appetizers: this.appetizers,
        mains: this.mains,
        desserts: this.desserts
      };
    },
    addDishToCourse(courseName, dishName, dishPrice) {
      const dish = {
        name: dishName,
        price: dishPrice
      };
      return this._courses[courseName].push(dish);
    },
    getRandomDishFromCourse(courseName) {
      const dishes = this._courses[courseName];
      const randomIndex = Math.floor(Math.random() * dishes.length);
      return dishes[randomIndex];
    },
    generateRandomMeal() {
      const appetizer = this.getRandomDishFromCourse('appetizers');
      const main = this.getRandomDishFromCourse('mains');
      const dessert = this.getRandomDishFromCourse('desserts');
      const totalPrice = appetizer.price + main.price + dessert.price;
      return `You meal is ${appetizer.name}, ${main.name} and ${dessert.name}, and the total price is ${totalPrice}.`
    }
  };
  
  menu.addDishToCourse('appetizers', 'shit', 4.00);
  menu.addDishToCourse('appetizers', 'popo', 5.00);
  menu.addDishToCourse('appetizers', 'fuck', 4.50);
  
  menu.addDishToCourse('mains', 'shit steak', 20.50);
  menu.addDishToCourse('mains', 'fuck rice', 15.50);
  menu.addDishToCourse('mains', 'xi jiping', 10.50);
  
  menu.addDishToCourse('desserts', 'shit ice', 3.50);
  menu.addDishToCourse('desserts', 'fuck cookie', 2.50);
  menu.addDishToCourse('desserts', 'bat', 1.50);
  
  const meal = menu.generateRandomMeal();
  console.log(meal)
  