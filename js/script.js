const form = document.querySelector("form");
const friends = document.querySelector(".input-friends");
const sum = document.querySelector(".input-sum");
const tip = document.querySelector(".input-tip");
const result = document.querySelector("p");
const total = document.querySelector(".total-sum");

document.querySelector(".dricks").innerHTML = "0%";

form.addEventListener("submit", function (event) {
  event.preventDefault();
  result.innerHTML = `Ni är ${friends.value} antal gäster som ska betala ${sum.value} kronor. Ni har valt att dricksa ${tip.value} procent.`;
  totalSum();
});

tip.addEventListener("input", function () {
  document.querySelector(".dricks").innerHTML = tip.value + "%";
});

function totalSum() {
  let totalTip = +sum.value * (+tip.value / 100);
  let totalPrice = +totalTip + +sum.value;
  let eachPrice = +totalPrice / +friends.value;
  total.innerHTML = `Den totala summan är ${totalPrice} kronor. Ni ska betala ${eachPrice} kronor var.`;
  console.log(eachPrice);
}

// function perPerson(totalSum, friends) {
//   if (friends <= 2 || typeof friends != "number") {
//     return;
//   }
// }
