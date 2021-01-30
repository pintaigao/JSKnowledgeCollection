// Read the Property
let book = {};
Object.defineProperties(book, {
  year_: { value: 2017 },
  edition: { value: 1 },
  year: {
    get: function () {
      return this.year_;
    },
    set: function (newValue) {
      if (newValue > 2017) {
        this.year_ = newValue;
        this.edition += newValue - 2017;
      }
    },
  },
});
let descriptor = Object.getOwnPropertyDescriptor(book, "year_");
console.log(descriptor.value); // 2017
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // "undefined"

let descriptor2 = Object.getOwnPropertyDescriptor(book, "year");
console.log(descriptor2.value); // undefined
console.log(descriptor2.enumerable); // false
console.log(typeof descriptor2.get); // "function"
