"use strict";

// PRICING

const pricingArray = [
  {
    header: "individual",
    secondaryHeader: "1 month free",
    price: 4.99,
    priceDescription: "/month after offer period",
    accountNum: "1 account",
    button: "choose now",
    listOne: "Stream any content",
    listTwo: "Unlimited streams",
    footer:
      "Terms and conditions apply. 1 month free not avaliable for users who have already tried Premium",
  },

  {
    header: "family",
    secondaryHeader: "1 month free",
    price: 9.99,
    priceDescription: "/month after offer period",
    accountNum: "Up to 7 accounts",
    button: "choose now",
    listOne: "7 Premium accounts for family members living under one roof",
    listTwo: "Block explicit content (Kids mode)",
    listThree: "Stream any content",
    listFour: "Unlimited streams",
    footer:
      "Terms and conditions apply. 1 month free not avaliable for users who have already tried Premium",
  },

  {
    header: "couple",
    secondaryHeader: "1 month free",
    price: 6.99,
    priceDescription: "/month after offer period",
    accountNum: "2 accounts",
    button: "choose now",
    listOne: "2 Premium accounts for a couple under one roof",
    listTwo: "Stream any content",
    listThree: "Unlimited streams",
    footer:
      "Terms and conditions apply. 1 month free not avaliable for users who have already tried Premium",
  },
];

const pricingPackets = document.querySelector(".pricing-packets-container");

const htmlIndividual = `
<div class='pricing-packets'>
  <h2>${pricingArray[0].header}</h2>
  <h3>${pricingArray[0].secondaryHeader}</h3>
  <p>${pricingArray[0].price}&#x20AC;</p>
  <p>${pricingArray[0].priceDescription}</p>
  <p>${pricingArray[0].accountNum}</p>
  <button>${pricingArray[0].button}</button>
  <ul>
    <li>${pricingArray[0].listOne}</li>
    <li>${pricingArray[0].listTwo}</li>
  </ul>
  <p>${pricingArray[0].footer}</p>
</div>
  `;

pricingPackets.insertAdjacentHTML("beforeend", htmlIndividual);

// FORM VALIDATION

const form = document.querySelector(".details");
const nameEl = document.getElementById("name");
const addressEl = document.getElementById("address");
const emailEl = document.getElementById("email");
const cardNumEl = document.getElementById("card-num");
const cvcEl = document.getElementById("cvc");
const dateEl = document.getElementById("date");
const couponEl = document.getElementById("coupon");

const errorMessageName = document.querySelector(".name-error");
const errorMessageAddress = document.querySelector(".address-error");
const errorMessageEmail = document.querySelector(".email-error");
const errorMessageCardNum = document.querySelector(".card-num-error");
const errorMessageCVC = document.querySelector(".cvc-error");
const errorMessageDate = document.querySelector(".date-error");
const errorMessageCoupon = document.querySelector(".coupon-error");

// FUNCTIONS

const isName = function (name) {
  return /\w+\s\w+/.test(name);
};

const isEmail = function (email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isDate = function (date) {
  return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date);
};

const isCardNum = function (cardNum) {
  return /^(\d{4}\s)?\(?\d{4}\)?[\s]\d{4}[\s]\d{4}$/.test(cardNum);
};

form.addEventListener("click", function (e) {
  // console.log(e.target);
  if (e.target.classList.contains("payment-btn")) {
    const nameInput = nameEl.value;
    const addressInput = addressEl.value;
    const emailInput = emailEl.value;
    const cardNumInput = cardNumEl.value;
    const cvcInput = cvcEl.value;
    const dateInput = dateEl.value;
    const couponInput = couponEl.value;

    if (!isName(nameInput)) {
      errorMessageName.style.opacity = "1";
      nameEl.classList.add("error");
    } else {
      errorMessageName.style.opacity = "0";
      nameEl.classList.remove("error");
    }

    if (addressInput.length === 0) {
      errorMessageAddress.style.opacity = "1";
      addressEl.classList.add("error");
    } else {
      errorMessageAddress.style.opacity = "0";
      addressEl.classList.remove("error");
    }

    if (emailInput.length === 0 || !isEmail(emailInput)) {
      errorMessageEmail.style.opacity = "1";
      emailEl.classList.add("error");
    } else {
      errorMessageEmail.style.opacity = "0";
      emailEl.classList.remove("error");
    }

    if (!isCardNum(cardNumInput)) {
      errorMessageCardNum.style.opacity = "1";
      cardNumEl.classList.add("error");
    } else {
      errorMessageCardNum.style.opacity = "0";
      cardNumEl.classList.remove("error");
    }

    if (cvcInput.length !== 3) {
      errorMessageCVC.style.opacity = "1";
      cvcEl.classList.add("error");
    } else {
      errorMessageCVC.style.opacity = "0";
      cvcEl.classList.remove("error");
    }

    if (!isDate(dateInput)) {
      errorMessageDate.style.opacity = "1";
      dateEl.classList.add("error");
    } else {
      errorMessageDate.style.opacity = "0";
      dateEl.classList.remove("error");
    }

    if (couponInput.length !== 6) {
      errorMessageCoupon.style.opacity = "1";
      couponEl.classList.add("error");
    } else {
      errorMessageCoupon.style.opacity = "0";

      couponEl.classList.remove("error");
    }
  }
});
