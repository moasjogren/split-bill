// const form = document.querySelector("form");
// const result = document.querySelector("p");
// const tip = document.querySelector(".input-tip");
// const button = document.querySelectorAll(".section-btn");
// const friends = document.querySelector(".input-friends");
// document.querySelector(".dricks").innerHTML = tip.value + "%";

// const splitBill = (friends, bill, tip) => {
//   const parsedFriends = parseInt(friends);
//   if (isNaN(parsedFriends) || parsedFriends < 2) {
//     throw new Error("Antal vänner måste vara ett nummer och minst 2");
//   }

//   const parsedBill = parseInt(bill * 100);
//   if (isNaN(parsedBill) || parsedBill < 0) {
//     throw new Error("Summan måste vara ett nummer och större än 0");
//   }

//   const parsedTip = parseInt(tip);
//   if (isNaN(parsedTip) || parsedTip < 0 || parsedTip > 100) {
//     throw new Error("Dricksen måste vara ett nummer och mellan 0 och 100");
//   }

//   const tipPercentage = parsedTip / 100;

//   const tipAmount = parsedBill * tipPercentage;

//   const billWithTip = parsedBill + tipAmount;

//   const pricePerFriend = billWithTip / parsedFriends;

//   const rest = billWithTip % parsedFriends;

//   return {
//     pricePerFriend: pricePerFriend / 100,
//     rest: rest / 100,
//   };
// };

// form.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const formData = new FormData(form);

//   const friends = formData.get("friends");
//   const bill = formData.get("sum");
//   const tip = formData.get("tip");

//   try {
//     const share = splitBill(friends, bill, tip);
//     result.textContent = `Ni ska betala ${share.pricePerFriend} kronor var. Det blir ${share.rest} kronor över.`;
//     button.forEach((btn) => {
//       btn.addEventListener("click", function (event) {
//         event.preventDefault();
//         if (btn.innerHTML === "Tillbaka") {
//           form.reset();
//         }
//         document.querySelector(".card").classList.toggle("flipped");
//       });
//     });
//   } catch (error) {
//     alert(error.message);
//   }
// });

// tip.addEventListener("input", function () {
//   document.querySelector(".dricks").innerHTML = tip.value + "%";
// });

const form = document.querySelector("form");
const friends = document.querySelector(".input-friends");
const sum = document.querySelector(".input-sum");
const tip = document.querySelector(".input-tip");
const result = document.querySelector("p");
const total = document.querySelector(".total-sum");
const btn = document.querySelectorAll(".section-btn");
const randomTip = document.querySelector(".random-tip");
const cat = document.querySelector(".cat");

document.querySelector(".dricks").innerHTML = tip.value + "%";

btn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (btn.innerHTML !== "Tillbaka") {
      totalSum();
    } else if (btn.innerHTML === "Tillbaka") {
      friends.value = 0;
      sum.value = 0;
      tip.value = 0;
      document.querySelector(".dricks").innerHTML = tip.value + "%";
      randomTip.innerHTML = "";
      cat.classList.add("active");
    }
    document.querySelector(".card").classList.toggle("flipped");
  });
});

document.querySelector(".random").addEventListener("click", (event) => {
  event.preventDefault();
  result.innerHTML = "";
  let randomProcent = Math.floor(Math.random() * 25) + 1;

  let tips = +sum.value * (+randomProcent / 100);
  const randomGuest = Math.floor(Math.random() * +friends.value) + 1;
  total.innerHTML = `Unlucky one: <br/>Guest ${randomGuest} <br/> Pays it all: <br/>${
    +sum.value + +tips
  } kronor`;
  randomTip.innerHTML = `(Random dricks: ${
    randomProcent >= 20
      ? `<span style="color: red; font-weight:bold; font-size:1.5rem;">${randomProcent}%</span>`
      : randomProcent + "%"
  })`;
  document.querySelector(".card").classList.toggle("flipped");
  if (randomProcent >= 20) {
    cat.classList.remove("active");
  }
});

tip.addEventListener("input", function () {
  document.querySelector(".dricks").innerHTML = tip.value + "%";
});

function totalSum() {
  let totalTip = +sum.value * (+tip.value / 100);
  let totalPrice = +totalTip + +sum.value;
  let eachPrice = +totalPrice / +friends.value;
  total.innerHTML = `Den totala summan: <br/>${totalPrice.toFixed(
    2
  )} kronor.<br/> Ni ska betala: <br/> ${
    friends.value > 0 ? Math.ceil(eachPrice) : 0
  } kronor var.`;
}
