"use strict";

const smoothScrolling = function () {
  formSectionCoords = form.getBoundingClientRect();
  window.scrollTo({
    left: formSectionCoords.left + window.pageXOffset,
    top: formSectionCoords.top + window.pageYOffset,
    behavior: "smooth",
  });
};

// HEADER

const headerBtn = document.querySelector(".header-btn");
const getDiscountBtn = document.querySelector(".modal-btn");
const modalEmail = document.querySelector("#modal-email");
const header = document.querySelector(".header");
const headerModal = document.querySelector(".header-modal");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".header-success-modal");
const formModal = document.querySelector(".form-modal");

headerBtn.addEventListener("click", function () {
  smoothScrolling();
});

let couponCode, emailCode;

// const renderCoupon = async function (email) {
//   const body = { email, type_id: 1, subtype_id: 1, value: 50 };
//   const res = await fetch("https://ossam.info/milosk/public/api/coupon/store", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   console.log(data);
//   couponCode = data.code;
//   emailCode = data.email;
//   localStorage.setItem("email", emailCode);
//   localStorage.setItem("coupon", couponCode);
//   couponEl.value = data.code;
//   emailEl.value = data.email;
// };

// Checking if local storage is empty. If empty return, if not do not show modal
if (localStorage.length > 0) {
  overlay.style.display = "none";
  headerModal.style.display = "none";
  document.body.style.overflow = "auto";
}

let couponBody;
// const renderCoupon = async function (email) {
//   const body = {
//     email,
//     type_id: 1,
//     subtype_id: 1,
//     status_id: 1,
//     value: 50,
//   };
//   const res = await fetch("https://ossam.info/ivani/public/api/coupon/store", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   });
//   const data = await res.json();
//   console.log(data);
//   // couponCode = data.code;
//   // emailCode = data.email;
//   // couponEl.innerHTML = data.code;
//   // emailEl.innerHTML = data.email;
// };

const renderCoupon = async function (email) {
  couponBody = { email, couponType: 1, couponSubtype: 1, value: 50 };
  const res = await fetch("https://ossam.info/darkog/public/api/v1/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(couponBody),
  });
  const data = await res.json();
  console.log(data);
  couponCode = data.data.code;
  // emailCode = data.data.email;
  // localStorage.setItem("email", emailCode);
  localStorage.setItem("coupon", couponCode);
  couponEl.value = data.data.code;
  // emailEl.value = data.email;
};

getDiscountBtn.addEventListener("click", function () {
  const modalEmailInput = document.querySelector("#modal-email").value;
  if (!isEmail(modalEmailInput)) {
    modalEmail.classList.add("error");
    document.querySelector(".modal-email-error").style.opacity = "1";
  } else {
    modalEmail.classList.remove("error");
    document.querySelector(".modal-email-error").style.opacity = "0";
    headerModal.style.display = "none";
    successModal.style.display = "block";
    renderCoupon(modalEmailInput);
    emailEl.value = modalEmailInput;
  }
});

document.body.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    e.target.classList.contains("modal-close") ||
    e.target.classList.contains("overlay") ||
    e.target.classList.contains("success-btn")
  ) {
    headerModal.style.display = "none";
    overlay.style.display = "none";
    widgetModalContainer.style.display = "none";
    successModal.style.display = "none";
    document.body.style.overflow = "auto";
    formModal.style.display = "none";
  }
});

// PRICING

const pricingArray = [
  {
    header: "individual",
    secondaryHeader: "1 month <span class='tertiary-header-span'>free</span>",
    price: 4.99,
    oldPrice: 4.99 * 12,
    priceDescription: "month",
    priceDescriptionYear: "year",
    accountNum: "1 account",
    button: "choose now",
    list: ["Stream any content", "Unlimited streams"],
    footer:
      "Terms and conditions apply.<br /> 1 month free not avaliable for users <br /> who have already tried Premium",
  },

  {
    header: "family",
    secondaryHeader: "1 month <span class='tertiary-header-span'>free</span>",
    price: 9.99,
    oldPrice: 9.99 * 12,
    priceDescription: "month",
    priceDescriptionYear: "year",
    accountNum: "Up to 7 accounts",
    button: "choose now",
    list: [
      "7 Premium accounts for family members living under one roof",
      "Block explicit content (Kids mode)",
      "Stream any content",
      "Unlimited streams",
    ],
    footer:
      "Terms and conditions apply.<br /> 1 month free not avaliable for users <br /> who have already tried Premium",
  },

  {
    header: "couple",
    secondaryHeader: "1 month <span class='tertiary-header-span'>free</span>",
    price: 6.99,
    oldPrice: 6.99 * 12,
    priceDescription: "month",
    priceDescriptionYear: "year",
    accountNum: "2 accounts",
    button: "choose now",
    list: [
      "2 Premium accounts for a couple under one roof",
      "Stream any content",
      "Unlimited streams",
    ],
    footer:
      "Terms and conditions apply.<br /> 1 month free not avaliable for users <br /> who have already tried Premium",
  },
];

const pricingPackets = document.querySelector(".pricing-packets-container");
let html, price;
let circle = "";

pricingArray.forEach((el, i) => {
  price = el.price;

  circle += `
      <div class='slider-circle' data-id='${i}'></div>
  `;

  html = `
  <div class='pricing-packets' id='pricing-packet-${i}'>
    <h2 class='pricing-secondary-header'>${el.header}</h2>
    <h3 class='pricing-tertiary-header'>${el.secondaryHeader}</h3>
    <p class='old-price'>${el.oldPrice}</p>
    <div class='pricing-price-container'><p class='pricing-price'>${price}</p><span class='euro-sign'>&#x20AC;</span></div>
    <p class='pricing-price-description'>/${el.priceDescription} after <br /> offer period</p>
    <p class='account-number'>${el.accountNum}</p>
    <div class='pricing-btn-container'><button id='${i}' class='pricing-btn'>${el.button}</button></div>
    <ul>
   
`;
  el.list.forEach((item) => {
    html += `
      <li class='pricing-list'>
      <span class="material-symbols-outlined pricing-list-icons">
      done
      </span> ${item}
      </li>
    `;
  });

  html += `
    </ul>
    <p class='pricing-footer'>${el.footer}</p>
    </div>
  `;

  pricingPackets.insertAdjacentHTML("beforeend", html);
});
const circleContainer = document.querySelector(".circle-container");

circleContainer.insertAdjacentHTML("beforeend", circle);

// pricingPackets.insertAdjacentHTML("beforeend", circle);

// SLIDER

window.addEventListener("load", (event) => {
  document.querySelector('[data-id="1"]').classList.add("active");
  const topPageCoords = header.getBoundingClientRect();
  window.scrollTo({
    left: topPageCoords.left + window.pageXOffset,
    top: topPageCoords.top + window.pageYOffset,
    behavior: "smooth",
  });
});

const sliderCircle = document.querySelectorAll(".slider-circle");

circleContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-circle")) {
    const id = e.target.getAttribute("data-id");
    document.querySelectorAll(".pricing-packets").forEach((el) => {
      el.style.display = "none";
    });
    document.getElementById(`pricing-packet-${id}`).style.display = "flex";
    document.querySelector(".pricing-price").style.textAlign = "center";

    sliderCircle.forEach((el) => {
      el.classList.remove("active");
    });

    e.target.classList.add("active");
  }
});

// TOGGLE MONTH AND YEAR PAYMENT

const pricingToggle = document.querySelector(".monthly-yearly");
const monthly = document.querySelector(".monthly");
const yearly = document.querySelector(".yearly");

let yearPrice, discountYearPrice;
let discountPercentage = 0;

pricingToggle.addEventListener("click", function (e) {
  if (pricingToggle.classList.contains("grey-medium")) {
    document.querySelectorAll(".pricing-price").forEach((el, i) => {
      // console.log(el.innerHTML);
      yearPrice = pricingArray[i].oldPrice;
      // console.log(yearPrice);
      discountYearPrice = (yearPrice - yearPrice * 0.2).toFixed(2);
      el.innerHTML = discountYearPrice;
      // console.log(discountYearPrice);
    });
    pricingToggle.classList.toggle("grey-medium");
    pricingToggle.classList.toggle("highlight-blue");
    monthly.classList.toggle("bold");
    yearly.classList.toggle("bold");
    document
      .querySelectorAll(".old-price")
      .forEach((el) => (el.style.display = "block"));
    pricingToggle.style.justifyContent = "end";
    document.querySelectorAll(".pricing-price-description").forEach((el, i) => {
      el.innerHTML = `/${pricingArray[i].priceDescriptionYear} after <br /> offer period`;
    });

    // Change month to year. Change it in the object first
  } else if (pricingToggle.classList.contains("highlight-blue")) {
    document.querySelectorAll(".pricing-price").forEach((el, i) => {
      const monthPrice = pricingArray[i].price;
      el.innerHTML = monthPrice;
    });
    pricingToggle.classList.toggle("grey-medium");
    pricingToggle.classList.toggle("highlight-blue");
    monthly.classList.toggle("bold");
    yearly.classList.toggle("bold");
    document
      .querySelectorAll(".old-price")
      .forEach((el) => (el.style.display = "none"));
    pricingToggle.style.justifyContent = "start";
    document.querySelectorAll(".pricing-price-description").forEach((el, i) => {
      el.innerHTML = `/${pricingArray[i].priceDescription} after <br /> offer period`;
    });
  }
});
// console.log(pricingArray[0].priceDescriptionYear);
// CHOOSE NOW BUTTON
////////////////////////
// CONNECTING PRICING AND FORM SECTIONS
let formSectionCoords;

const packetPrice = document.querySelector(".packet-price");
const subtotalPrice = document.querySelector(".subtotal");
const discount = document.querySelector(".discount");
const totalPrice = document.querySelector(".total");
const pricingPacketOption = document.querySelector(".pricing-packet-option");
const pricingPacketPaymentPeriod = document.querySelector(
  ".pricing-packet-payment-period"
);
const pricingButton = document.querySelector(".pricing-btn");

pricingPackets.addEventListener("click", function (e) {
  e.preventDefault();
  formSectionCoords = form.getBoundingClientRect();
  if (e.target.classList.contains("pricing-btn")) {
    smoothScrolling();
  }
  price = "";
  if (
    e.target.getAttribute("id") === "0" &&
    pricingToggle.classList.contains("grey-medium")
  ) {
    price = pricingArray[0].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[0].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[0].priceDescription}ly`;
  } else if (
    e.target.getAttribute("id") === "0" &&
    pricingToggle.classList.contains("highlight-blue")
  ) {
    price = (pricingArray[0].oldPrice - pricingArray[0].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[0].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[0].priceDescriptionYear}ly`;
  }
  if (
    e.target.getAttribute("id") === "1" &&
    pricingToggle.classList.contains("grey-medium")
  ) {
    price = pricingArray[1].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[1].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[1].priceDescription}ly`;
  } else if (
    e.target.getAttribute("id") === "1" &&
    pricingToggle.classList.contains("highlight-blue")
  ) {
    price = (pricingArray[1].oldPrice - pricingArray[1].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[1].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[1].priceDescriptionYear}ly`;
  }
  if (
    e.target.getAttribute("id") === "2" &&
    pricingToggle.classList.contains("grey-medium")
  ) {
    price = pricingArray[2].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[2].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[2].priceDescription}ly`;
  } else if (
    e.target.getAttribute("id") === "2" &&
    pricingToggle.classList.contains("highlight-blue")
  ) {
    price = (pricingArray[2].oldPrice - pricingArray[2].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price;
    discount.innerHTML = price * discountPercentage;
    totalPrice.innerHTML = price * (1 - discountPercentage);
    pricingPacketOption.innerHTML = pricingArray[2].header;
    pricingPacketPaymentPeriod.innerHTML = ` ${pricingArray[2].priceDescriptionYear}ly`;
  }
});

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

const isNameOrAddress = function (input) {
  return /\w+\s\w+/.test(input);
};

const isEmail = function (email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isDate = function (date) {
  return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(date);
};

const isCardNum = function (cardNum) {
  return /^(\d{4}\s)?\(?\d{4}\)?[\s]\d{4}[\s]\d{4}$/.test(cardNum);
};

form.addEventListener("click", function (e) {
  if (e.target.classList.contains("payment-btn")) {
    const nameInput = nameEl.value;
    const addressInput = addressEl.value;
    const emailInput = emailEl.value;
    const cardNumInput = cardNumEl.value;
    const cvcInput = cvcEl.value;
    const dateInput = dateEl.value;
    const couponInput = couponEl.value;

    if (!isNameOrAddress(nameInput)) {
      errorMessageName.style.opacity = "1";
      nameEl.classList.add("error");
    } else {
      errorMessageName.style.opacity = "0";
      nameEl.classList.remove("error");
    }

    if (!isNameOrAddress(addressInput)) {
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

    if (
      errorMessageName.style.opacity === "0" &&
      errorMessageAddress.style.opacity === "0" &&
      errorMessageEmail.style.opacity === "0" &&
      errorMessageCardNum.style.opacity === "0" &&
      errorMessageCVC.style.opacity === "0" &&
      errorMessageDate.style.opacity === "0"
    ) {
      formModal.style.display = "flex";
      overlay.style.display = "block";
      document.body.style.overflow = "hidden";
      console.log(`
      Name: ${nameEl.value}
      Address: ${addressEl.value}
      Email: ${emailEl.value}
      Card number: ${cardNumEl.value}
      CVC: ${cvcEl.value}
      Exp. date: ${dateEl.value}
      Packet: ${pricingPacketOption.innerHTML} ${pricingPacketPaymentPeriod.innerHTML} Membership plan
      Discount: ${discount.innerHTML}&#x20AC;
      Total price: ${totalPrice.innerHTML}&#x20AC;
      `);
    }
  }
});

// APPLY COUPON
let couponValidation;

const applyCoupon = document.querySelector(".apply-coupon");

const validateCoupon = async function (email, code) {
  const body = { email, code };
  const res = await fetch("https://ossam.info/darkog/public/api/v1/use", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    redirect: "follow",
  });
  couponValidation = await res.json();
  console.log(couponValidation);
  if (couponValidation.status) {
    discount.innerHTML = (subtotalPrice.innerHTML * discountPercentage).toFixed(
      2
    );
    totalPrice.innerHTML = subtotalPrice.innerHTML - discount.innerHTML;

    errorMessageCoupon.style.opacity = "1";
    errorMessageCoupon.style.color = "#15c130";
    errorMessageCoupon.innerHTML = "Coupon code successfully applied";
    errorMessageEmail.style.opacity = "0";
    emailEl.classList.remove("error");
  } else {
    errorMessageCoupon.style.opacity = "1";
    couponEl.classList.add("error");
    errorMessageEmail.style.opacity = "1";
    emailEl.classList.add("error");
  }
};

// const validateCoupon = async function (email, code) {
//   const body = { email, code };
//   const res = await fetch("https://ossam.info/ivani/public/api/coupon", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//     redirect: "follow",
//   });
//   couponValidation = await res.json();
//   console.log(couponValidation);
//   if (couponValidation.status) {
//     discount.innerHTML = (subtotalPrice.innerHTML * discountPercentage).toFixed(
//       2
//     );
//     totalPrice.innerHTML = subtotalPrice.innerHTML - discount.innerHTML;
//   } else {
//     errorMessageCoupon.style.opacity = "1";
//     couponEl.classList.add("error");
//     errorMessageEmail.style.opacity = "0";
//     emailEl.classList.remove("error");
//   }
// };

applyCoupon.addEventListener("click", function () {
  validateCoupon(emailEl.value, couponEl.value);
  discountPercentage = couponBody.value / 100;
});

// STREAMERS

const streamers = document.querySelector(".streamers");
let users, id;
users = activeUsers;

const renderUsers = function () {
  users.forEach(function (el, i) {
    const userHtml = `
    <div class='user-container'>
      <div class='img-status-container'>
      <img src='${el.avatarUrl}' class='user-img'/>
      <div class='status-btn'></div>
      </div>
      <div class='user-info'>
      <p class='user-name'>${el.name}</p>
      <p class='user-email'>(${el.email})</p>
      <p class='user-status'>${el.statusMessage}</p>
      </div>
    </div>
    `;
    streamers.insertAdjacentHTML("beforeend", userHtml);

    if (el.activity === "online") {
      document.querySelectorAll(".status-btn")[i].style.backgroundColor =
        "#1AD838";
      document.querySelectorAll(".user-img")[i].style.border =
        "2px solid #1AD838";
    }
    if (el.activity === "offline") {
      document.querySelectorAll(".status-btn")[i].style.backgroundColor =
        "#99A8B4";
      document.querySelectorAll(".user-img")[i].style.border =
        "2px solid #99A8B4";
    }
    if (el.activity === "streaming") {
      document.querySelectorAll(".status-btn")[i].style.backgroundColor =
        "#E76A10";
      document.querySelectorAll(".user-img")[i].style.border =
        "2px solid #E76A10";
    }
  });
};

const getUsers = async function () {
  const res = await fetch("https://mockend.com/Infomedia-bl/fake-api/users");
  const data = await res.json();
  users = data;
  renderUsers();
};
renderUsers();
// getUsers();

// COMMENTS

const commentsContainer = document.querySelector(".comments-container");

let i, commentHTML, curData;
// const renderComments = function (data) {
//   for (i = 0; i < 5; i++) {
//     curData = comments;
//     commentHTML = `
//     <div class='single-comment'>
//     <img src='${comments[i].avatarUrl}' class='comment-img' />
//     <div>
//     <div class='name-date-container'>
//     <p class='comment-name'>${comments[i].name}</p>
//     <p class='comment-date'>${comments[i].postedAt}</p>
//       </div>
//         <p class='comment-email'>${comments[i].email}</p>
//         <p class='comment-content'>${comments[i].comment}</p>
//       </div>
//     </div>
//     `;
//     commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
//   }
// };

const renderComments = function (data) {
  for (i = 0; i < 5; i++) {
    curData = comments;
    commentHTML = `
    <div class='single-comment'>
      <img src='${comments[i].avatarUrl}' class='comment-img' />
      <div class='content-container'>
        <div class='top-container'>
          <div class='name-email-container'>
            <p class='comment-name'>${comments[i].name}</p>
            <p class='comment-email'>(${comments[i].email})</p>
          </div>
          <p class='comment-date'>${comments[i].postedAt}</p>
        </div>
        <p class='comment-content'>${comments[i].comment}</p>
      </div>
    </div>
    `;
    commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
  }
};

const getComments = async function () {
  const res = await fetch("https://mockend.com/Infomedia-bl/fake-api/comments");
  const data = await res.json();

  renderComments(data);
};
renderComments(comments);

// getComments();

// SHOW MORE COMMENTS

const showMoreBtn = document.querySelector(".show-more-comments");
const noMoreComments = document.querySelector(".no-more-comments");

showMoreBtn.addEventListener("click", function () {
  if (i < 100) {
    commentsContainer.innerHTML = "";
    for (let j = 0; j < i + 5; j++) {
      commentHTML = `
      <div class='single-comment'>
      <img src='${curData[j].avatarUrl}' class='comment-img' />
      <div class='content-container'>
        <div class='top-container'>
          <div class='name-email-container'>
            <p class='comment-name'>${curData[j].name}</p>
            <p class='comment-email'>(${curData[j].email})</p>
          </div>
          <p class='comment-date'>${curData[j].postedAt}</p>
        </div>
        <p class='comment-content'>${curData[j].comment}</p>
      </div>
    </div>
    `;

      commentsContainer.insertAdjacentHTML("beforeend", commentHTML);
    }
    i = i + 5;
  } else {
    showMoreBtn.style.background = "#657785";
    showMoreBtn.style.boxShadow = "0px 4px 8px rgba(101, 119, 133, 0.24)";
    noMoreComments.style.display = "block";
  }
});

// WIDGET ACTIVE USERS FIRST

const widgetButton = document.querySelector(".widget-btn");
const widgetModal = document.querySelector(".widget");
const widgetModalContainer = document.querySelector(".widget-container");

widgetButton.addEventListener("click", function () {
  widgetModal.innerHTML = "";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
  widgetModalContainer.style.display = "block";

  activeUsers.forEach((el, i) => {
    const activeUsersFirst = `
      <div class='user-container'>
          <div class='img-status-container'>
          <img src='${activeUsers[i].avatarUrl}' alt='User number ${i}' class='active-user-img'/>
          <div class='active-status-btn'></div>
          </div>
          <div class='user-info'>
          <p class='user-name'>${activeUsers[i].name}</p>
          <p class='user-email'>(${activeUsers[i].email})</p>
          <p class='user-status'>${activeUsers[i].statusMessage}</p>
          </div>
          </div>
          `;

    el.activity === "online"
      ? widgetModal.insertAdjacentHTML("afterbegin", activeUsersFirst)
      : widgetModal.insertAdjacentHTML("beforeend", activeUsersFirst);

    if (el.activity === "online") {
      document.querySelectorAll(".active-status-btn")[0].style.backgroundColor =
        "#1AD838";
      document.querySelectorAll(".active-user-img")[0].style.border =
        "2px solid #1AD838";
    }
    if (el.activity === "offline") {
      document.querySelectorAll(".active-status-btn")[i].style.backgroundColor =
        "#99A8B4";
      document.querySelectorAll(".active-user-img")[i].style.border =
        "2px solid #99A8B4";
    }
    if (el.activity === "streaming") {
      document.querySelectorAll(".active-status-btn")[i].style.backgroundColor =
        "#E76A10";
      document.querySelectorAll(".active-user-img")[i].style.border =
        "2px solid #E76A10";
    }
  });
});

// SCROLL TO TOP

const topScroll = document.querySelector(".back-to-top-btn");

topScroll.addEventListener("click", function () {
  const topPageCoords = header.getBoundingClientRect();
  window.scrollTo({
    left: topPageCoords.left + window.pageXOffset,
    top: topPageCoords.top + window.pageYOffset,
    behavior: "smooth",
  });
});
