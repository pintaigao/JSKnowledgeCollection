/* 1. Basic Prototype Chain */
function Parent() {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {

}

Child.prototype = new Parent();

var child1 = new Child();
console.log(child1.getName()) // kevin
/* 问题一：引用类型的属性被所有实例共享，举个例子：*/
function Parent() {
    this.names = ['kevin', 'daisy'];
}
function Child() { }
Child.prototype = new Parent();
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy", "yayu"]
/* 问题二：在创建 Child 的实例时，不能向Parent传参 */
function Parent() { this.names = ['kevin', 'daisy']; }
function Child() { Parent.call(this); }
var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]

/* 3.组合继承：原型链继承和经典继承双剑合璧。 */
function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
