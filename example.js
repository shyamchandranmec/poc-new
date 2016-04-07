/**
 * Created by shyam on 26/03/16.
 */

"use strict";
/**
 * Class Product with two public functions
 * @param name
 * @param price
 * @constructor
 */
function Product (name, price) {
    this.name = name;
    this.price = price;
    console.log("Product object created");
};

Product.prototype.getName = function () {
    return this.name;
};

Product.prototype.getPrice = function () {
    return this.price;
};

var computer = new Product("Computer", 27000);
console.log(computer.getName(), computer.getPrice(), computer.constructor);

/**
 * Food inherits from Product - Pseudo Classical inheritance - Constructor based inheritance
 * http://stackoverflow.com/questions/19633762/classical-inheritance-vs-prototypal-inheritance-in-javascript
 * @param name
 * @param price
 * @constructor
 */
function Food (name, price) {
    Product.call(this, name, price);
    console.log("Food object created");
};

Food.prototype = Object.create(Product.prototype);
Food.prototype.constructor = Food;
var apple = new Food("Apple", 30);


console.log(apple.getName(), apple.getPrice(), apple.constructor);

/**
 http://stackoverflow.com/questions/2800964/benefits-of-prototypal-inheritance-over-classical
 http://theoryapp.com/javascript-inheritance-pseudoclassical-vs-prototypal/
 http://markdalgleish.com/2012/10/a-touch-of-class-inheritance-in-javascript/
 http://www.bennadel.com/blog/2184-object-create-improves-constructor-based-inheritance-in-javascript---it-doesn-t-replace-it.htm
 **/

/**
 * Equilent of Object.create
 * @param o
 * @returns {F}
 */
function inherit (o) {
    function F () {
    };
    F.prototype = o;
    return new F();
}

/**
 * Prototypal inheritance - Object.create()
 *
 * */

var person = {
    name: "",

    age: null,

    address: {
        street: "",
        houseNo: null
    },

    getName: function () {
        return this.name;
    },

    getAge: function () {
        return this.age;
    },

    getStreet: function () {
        return this.address.street;
    },

    getHouseNo: function () {
        return this.address.houseNo;
    }

};

var boy = Object.create(person);
boy.name = "John";
boy.age = 15;

var girl = Object.create(person);
girl.name = "Dany";
girl.age = 10;

console.log(boy.getName(), boy.getAge(), boy.constructor);
console.log(girl.getName(), girl.getAge(), Object.getPrototypeOf(girl));

/**
 * Problem with Object.create
 * It can't replace constructor based inheritance. It just improves it.
 * When you change address of girl the address of boy is also changed.
 * This happens only to the objects inside objects because its passed with reference.
 * To get this working add an init method and reinitialize all the properties with new values
 * Reinitialise objects with objects and return (this)
 * http://www.bennadel.com/blog/2184-object-create-improves-constructor-based-inheritance-in-javascript---it-doesn-t-replace-it.htm
 * */

girl.address.street = "K.P.K";
girl.address.houseNo = 33;

console.log(boy.getName(), boy.getStreet(), boy.getHouseNo());


/**
 * Functional inheritance
 *  http://stackoverflow.com/questions/2800964/benefits-of-prototypal-inheritance-over-classical
 * @param options
 * @returns {{}}
 * @constructor
 */
function Human (options) {
    var that = {};
    that.name = options.name;
    that.age = options.age;
    that.getName = function () {
        return this.name;
    };
    that.getAge = function () {
        return this.age;
    };
    return that;
}

function Man (options) {
    var that = Human(options);
    that.getMansName = function () {
        return "Man's name - " + this.getName();
    };
    return that;
}

function Woman (options) {
    var that = Human(options);
    that.getWomansName = function () {
        return "Woman's name - " + this.getName();
    };
    return that;
}

var human = Human({name: "Human", age: 1});
console.log(human.getName(), human.getAge());

var man = Man({name: "Man", age: 33});
console.log(man.getName(), man.getAge(), man.getMansName());

var woman = Woman({name: "Woman", age: 25});
console.log(woman.getName(), woman.getAge(), woman.getWomansName());


/**
 * Closure example
 * @param name
 * @constructor
 */
function Company (name) {
    this.name = name;
    var licenceId = name + "#23DXRGT295839X";
    this.getLicenceId = function () {
        /**
         * This function creates a closure
         * It has access to the local variable licenceId in the function Company
         */
        return licenceId;
    };
};

var google = new Company("Google");
console.log(google.getLicenceId());

var a;
console.log(a);
console.log("asdf");

/**
 * Currying
 * */
function greet (greeting) {
    return function (name) {
        return function lastCharacter (character) {
            console.log(greeting + "  " + name + " " + character);
        };

    };
};

greet("hello")("Shyam")(".");
var greetHello = greet("Hello");
var greetGoodBye = greet("Good Bye");
greetHello("Vishesh")("!");
greetGoodBye("Shyam")("!!!");


/**
 * Memoization
 * This method requirs a global variable to hold the cache
 * */

var cache = {};
function addTen (x) {
    var key = x.toString();
    var value = null;
    if (cache[key]) {
        value = cache[key];
        console.log("returning from cache " + value);
    } else {
        // Expensive operation :)
        value = x + 10;
        cache[key] = value;
        console.log("Storing result in cache " + value);
    }
    return value;
}
addTen(10);
addTen(1);
addTen(10);
addTen(20);
addTen(1);

function memoize20 () {
    var cache = {};
    return function (x) {
        var key = x.toString();
        var value = null;
        if (cache[key]) {
            value = cache[key];
            console.log("returning from cache " + value);
        } else {
            // Expensive operation :)
            value = x + 20;
            cache[key] = value;
            console.log("Storing result in cache " + value);
        }
        return value;
    };
}


console.log("Memoize 20 20 20 20 20 20 20 20");
var add20 = memoize20();
add20(10);
add20(1);
add20(10);
add20(20);
add20(1);


console.log("Memoize multiple...... ###################");
var memoizeMultiple = function () {
    var slice = Array.prototype.slice;
    var cache = {};
    var value = null;
    return function (x, y) {
        var args = slice.call(arguments);
        var key = args.toString();
        if (cache[key]) {
            value = cache[key];
            console.log("returning from cache " + value);
        } else {
            // Expensive operation :)
            value = x + y;
            cache[key] = value;
            console.log("Storing result in cache " + value);
        }
        return value;
    };
};
var memoizeTwoNumbers = memoizeMultiple();
memoizeTwoNumbers(10, 20);
memoizeTwoNumbers(20, 20);
memoizeTwoNumbers(10, 20);
memoizeTwoNumbers(30, 20);
memoizeTwoNumbers(20, 20);

console.log("Generalized memoization ################");

function memoize (func) {
    var slice = Array.prototype.slice;
    var cache = {};
    var value = null;
    return function () {
        var args = slice.call(arguments);
        var key = args.toString();
        if (cache[key]) {
            value = cache[key];
            console.log("returning from cache " + value);
        } else {
            // Expensive operation :)
            value = func.call(this, args);
            cache[key] = value;
            console.log("Storing result in cache " + value);
        }
        return value;
    };
}

var addOne = function (x) {
    x = parseInt(x);
    return x + 1;
};
var addOneMemoized = memoize(addOne);
addOneMemoized(10);
addOneMemoized(11);
addOneMemoized(10);
addOneMemoized(12);
addOneMemoized(11);


/* var {foo} = {foo: 'bar'};

 function es({a, b, c}) {
 console.log(a, b, c);
 }

 es({a: 10, b: 5, c: 10});*/


/**
 * Mixins
 * */
var rectangle = {
    setWidth: function (w) {
        console.log("Setting width");
        this.width = w;
    },
    getWidth: function () {
        return this.width;
    },
    setHeight: function (h) {
        console.log("Setting height");
        this.height = h;
    },
    getHeight: function () {
        return this.height;
    },
    draw: function () {
        console.log("Drawing rectangle");
    }
};

var button = {
    setLink: function (link) {
        console.log("Setting link " + link);
        this.link = link;
    }
};

var clickControl = {
    onClick: function (cb) {
        console.log("Clicked:  Redirecting to link " + this.link);
        cb();
    }
};

function RectangleButton (w, h, link, callback) {
    this.setWidth(w);
    this.setHeight(h);
    this.setLink(link);
    this.onClick(callback);
};

extend(RectangleButton.prototype, rectangle);
extend(RectangleButton.prototype, button);
extend(RectangleButton.prototype, clickControl);

function extend (destination, source) {
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            destination[prop] = source[prop];
        }
    }
}

function facebookWebPage () {
    console.log("Reached facebook web page");
}
var rectangleButton = new RectangleButton(10, 20, "www.facebook.com", facebookWebPage);

/**
 * Factory
 * */

function Bus () {
    this.type = "Bus";
}

function Car () {
    this.type = "Car";
}

var factoryMapping = {
    "bus": Bus,
    "car": Car
};

function vehicleFactory (param) {
    var theClass = factoryMapping[param];
    return new theClass();
}

var bus = vehicleFactory("bus");
var car = vehicleFactory("car");
console.log(bus.type);
console.log(car.type);


/**
 * IIFE
 * */
/* function printCounter() {
 for (var i = 0; i < 5; i++) {
 setTimeout(function () {
 console.log(i);
 }, 1000);
 }
 }

 printCounter();
 function iifeCounter() {
 for (var i = 0; i < 5; i++) {
 (function (j) {
 setTimeout(function () {
 console.log(j);
 },1000);
 })(i)

 }
 }

 iifeCounter();
 */

var car = {
    wheels: 4
};


function carDetails (paramOne, paramTwo, paramThree) {
    console.log("Wheels :" + this.wheels);
    console.log(paramOne);
    console.log(paramTwo);
    console.log(paramThree);
}

carDetails.call(car, "Benz", "White color", "New Model");

carDetails.apply(car, ["Jaguar", "Black color", "Old Model"]);

var ford = carDetails.bind(car, "Ford", "Green Color");

ford("Latest Model");

/**
 * ES6 Classes
 * */


class Polygon {
    constructor (width, height) {
        this.width = width;
        this.height = height;
    }

    get area () {
        return this.calculateArea();
    }

    calculateArea () {
        return this.width * this.height;
    }

    static printName () {
        console.log("I am a polygon");
    }
}


var rectangle = new Polygon(4, 3);
console.log("Area of rectangle is " + rectangle.area);
Polygon.printName();

class Animal {
    constructor (name) {
        this.name = name;
    }

    speak () {
        console.log("I am gonna make some noise");
    }
}

class Dog extends Animal {
    speak () {
        super.speak();
        console.log("Bow Bow");
    }
}

var dog = new Dog();
dog.speak();

/**
 * With Arrow function
 * */

/* function House() {
 this.address = "xyz";

 setTimeout(() => {
 console.log(this.address)
 })
 }

 var x = new House();*/

/**
 * Without Arrow functions
 *
 * */
/* function House() {
 this.address = "xyz";
 var self = this;
 setTimeout(function printAddress() {
 console.log(self.address)
 })
 }*/

// var x = new House();

let nameSymbol = Symbol("name");

class Person {
    constructor (name) {
        this[nameSymbol] = name;
    }

    get name () {
        return this[nameSymbol];
    }
}

var john = new Person("John Samuel");
console.log(john.name);
var x = Object.getOwnPropertySymbols(john);
console.log(x);
