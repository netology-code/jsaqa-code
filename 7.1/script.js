let links = document.getElementsByTagName("a");
console.log(Array.isArray(links)); // false
let arr = Array.from(links);
console.log(Array.isArray(arr)); // true
console.log(links.length); // 3

let images = document.getElementsByTagName("img"); //получение всех изображений со страницы

const elementsRed = document.getElementsByClassName("red");
console.log(elementsRed.length); // 1
const elementsSelected = document.getElementsByClassName("selected");
console.log(elementsSelected.length); // 2
const elementsBlue = document.getElementsByClassName("blue");
console.log(elementsBlue.length); // 0

let listElements = document.getElementsByTagName("li");
let firstElement = listElements.item(0);
let secondElement = listElements[1];

console.log(firstElement.parentElement); // <ul class="exclusive">...</ul>
console.log(firstElement.closest("ul")); // <ul class="exclusive">...</ul>
console.log(firstElement.closest("*")); // <li>Element 1</li>
console.log(document.parentElement); // null

let ageInput = document.getElementsByTagName("input").namedItem("age");

let elements = document.getElementsByName("age");
console.log(elements.length); // 1
