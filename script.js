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

headerBtn.addEventListener("click", function () {
  smoothScrolling();
});

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
  }
});

// PRICING

const pricingArray = [
  {
    header: "individual",
    secondaryHeader: "1 month <span class='tertiary-header-span'>free</span>",
    price: 4.99,
    oldPrice: 4.99 * 12,
    priceDescription: "/month after <br /> offer period",
    priceDescriptionYear: "/year after <br /> offer period",
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
    priceDescription: "/month after <br /> offer period",
    priceDescriptionYear: "/year after <br /> offer period",
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
    priceDescription: "/month after <br /> offer period",
    priceDescriptionYear: "/year after <br /> offer period",
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
    <p class='pricing-price'>${price}&#x20AC;</p>
    <p class='pricing-price-description'>${el.priceDescription}</p>
    <p class='account-number'>${el.accountNum}</p>
    <button id='${i}' class='pricing-btn'>${el.button}</button>
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

const goToSlide = function (slide) {
  document.querySelectorAll(".pricing-packets").forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

circleContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("slider-circle")) {
    const slide = e.target.getAttribute("data-id");
    goToSlide(slide);
  }
});

// TOGGLE MONTH AND YEAR PAYMENT

const pricingToggle = document.querySelector(".monthly-yearly");
const monthly = document.querySelector(".monthly");
const yearly = document.querySelector(".yearly");

pricingToggle.addEventListener("click", function (e) {
  pricingToggle.classList.toggle("grey-medium");
  pricingToggle.classList.toggle("highlight-blue");
  monthly.classList.toggle("bold");
  yearly.classList.toggle("bold");

  pricingPackets.innerHTML = `<div class='circle-container'>${circle}</div>`;

  if (pricingToggle.classList.contains("grey-medium")) {
    pricingArray.forEach((el, i) => {
      price = el.price;

      html = `
      <div class='pricing-packets'>
        <h2 class='pricing-secondary-header'>${el.header}</h2>
        <h3 class='pricing-tertiary-header'>${el.secondaryHeader}</h3>
        <p class='pricing-price'>${price}&#x20AC;</p>
        <p class='pricing-price-description'>${el.priceDescription}</p>
        <p class='account-number'>${el.accountNum}</p>
        <button id='${i}' class='pricing-btn'>${el.button}</button>
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
    pricingToggle.style.justifyContent = "start";
  } else if (pricingToggle.classList.contains("highlight-blue")) {
    pricingArray.forEach((el, i) => {
      price = (el.oldPrice - el.oldPrice * 0.2).toFixed(2);

      html = `
      <div class='pricing-packets'>
        <h2 class='pricing-secondary-header'>${el.header}</h2>
        <h3 class='pricing-tertiary-header'>${el.secondaryHeader}</h3>
        <p class='old-price'>${el.oldPrice}</p>
        <p class='pricing-price'>${price}&#x20AC;</p>
        <p class='pricing-price-description'>${el.priceDescriptionYear}</p>
        <p class='account-number'>${el.accountNum}</p>
        <button id='${i + 3}' class='pricing-btn'>${el.button}</button>
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
    pricingToggle.style.justifyContent = "end";
  }
});

// CHOOSE NOW BUTTON
////////////////////////
// CONNECTING PRICING AND FORM SECTIONS
let formSectionCoords;

const packetPrice = document.querySelector(".packet-price");
const subtotalPrice = document.querySelector(".subtotal");
const discount = document.querySelector(".discount");
const totalPrice = document.querySelector(".total");

pricingPackets.addEventListener("click", function (e) {
  e.preventDefault();
  formSectionCoords = form.getBoundingClientRect();
  if (e.target.classList.contains("pricing-btn")) {
    smoothScrolling();
  }
  price = "";
  if (e.target.getAttribute("id") === "0") {
    price = pricingArray[0].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
  }
  if (e.target.getAttribute("id") === "1") {
    price = pricingArray[1].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
  }
  if (e.target.getAttribute("id") === "2") {
    price = pricingArray[2].price;
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
  }
  if (e.target.getAttribute("id") === "3") {
    price = (pricingArray[0].oldPrice - pricingArray[0].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
  }
  if (e.target.getAttribute("id") === "4") {
    price = (pricingArray[1].oldPrice - pricingArray[1].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
  }
  if (e.target.getAttribute("id") === "5") {
    price = (pricingArray[2].oldPrice - pricingArray[2].oldPrice * 0.2).toFixed(
      2
    );
    packetPrice.innerHTML = price + "&#x20AC;";
    subtotalPrice.innerHTML = price + "&#x20AC;";
    totalPrice.innerHTML = price + "&#x20AC;";
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

    if (couponInput.length !== 6) {
      errorMessageCoupon.style.opacity = "1";
      couponEl.classList.add("error");
    } else {
      errorMessageCoupon.style.opacity = "0";

      couponEl.classList.remove("error");
    }
  }
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
getUsers();

// COMMENTS

const commentsContainer = document.querySelector(".comments-container");

let i, commentHTML, curData;
const renderComments = function (data) {
  for (i = 0; i < 5; i++) {
    curData = comments;
    commentHTML = `
    <div class='single-comment'>
    <img src='${comments[i].avatarUrl}' class='comment-img' />
    <div>
    <div class='name-date-container'>
    <p class='comment-name'>${comments[i].name}</p>
    <p class='comment-date'>${comments[i].postedAt}</p>
      </div>
        <p class='comment-email'>${comments[i].email}</p>
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
    <div>
    <div class='name-date-container'>
    <p class='comment-name'>${curData[j].name}</p>
    <p class='comment-date'>${curData[j].postedAt}</p>
      </div>
        <p class='comment-email'>${curData[j].email}</p>
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
  // users.forEach((el, i) => {
  //   const activeUsersFirst = `
  //   <div class='user-container'>
  //       <div class='img-status-container'>
  //       <img src='${users[i].avatarUrl}' alt='User number ${i}' class='active-user-img'/>
  //       <div class='active-status-btn'></div>
  //       </div>
  //       <div class='user-info'>
  //       <p class='user-name'>${users[i].name}</p>
  //       <p class='user-email'>(${users[i].email})</p>
  //       <p class='user-status'>${users[i].statusMessage}</p>
  //       <p class='user-status'>${users[i].activity}</p>
  //       </div>
  //       </div>
  //       `;

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
          <p class='user-status'>${activeUsers[i].activity}</p>
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
