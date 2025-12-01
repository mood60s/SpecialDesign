"use strict";
// ?Select Elements Global
// settings var For Option box
const COLORSLI = document.querySelectorAll(".colors-list li");
let toggle = document.querySelector(".toggle-settings .gear");
let randomBackEl = document.querySelectorAll(".random-backgrounds button");
let selectSize = document.querySelector(".select-size");
let chosenBoxImgs = document.querySelectorAll(".container-imgs img");
let bulletBtn = document.querySelectorAll(".bullets-option button");
// Settings Var For LandingPage
let landingPage = document.querySelector(".landing-page");
let imgsArray = [];
let IndexImgsArray = 1;
let backgroundOption = true;
let backgroundInterval;
// Var Global ::>> ScrollAnimation
let ourSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
let allSkillBox = document.querySelectorAll(".skills .skill-box");
let introLanding = document.querySelector(".landing-page");
let aboutUs = document.querySelector(".about-us");
let childrenAboutUs = Array.from(document.querySelectorAll(".about-us .container div"));
let gallery = document.querySelector(".gallery");
let galleryChildren = document.querySelectorAll(".images-box img");
console.log(gallery)
console.log(galleryChildren)
let introduction = document.querySelector(".introduction");
let timeLine = document.querySelector(".timeline");
let allTimeLineBoxs = document.querySelectorAll(".timeline-content .left, .timeline-content .right");
let featureParent = document.querySelector(".features");
let FeatureChildren = document.querySelectorAll(".features .feat-box");
let testimonial = document.querySelector(".testimonials");
let testimonailChildren = document.querySelectorAll(".testimonials .ts-box");
// Var Global-->: Create PopUpFn
let ourGallery = document.querySelectorAll(".gallery img");
// Var Global Scroll SomeWhere
const allLinks = document.querySelectorAll(".links a");
const Bullets = document.querySelectorAll(".nav-bullets .bullet");
let containerBullet = document.querySelector(".nav-bullets");
// ? Remove Loading after page Loaded: just add Class: D
function RemoveLoading() {
  const body = document.querySelector("body");
  const loading = document.querySelector(".loading");
  body.classList.add("done");
  loading.classList.add("done");
  loading.addEventListener(
    "transitionend",
    () => {
      loading.style.display = "none";
    },
    { once: true }
  );
}

// ============================================
// ! Check Local Storage
//================================================
// Check if there's local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors != null) {
  document.documentElement.style.setProperty(`--main-Color`, mainColors);
  //check for active Class,
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    // add active Class on element with data-color == local storage item
    if (ele.dataset.color === mainColors) {
      // add Active Class
      ele.classList.add("active");
    }
  });
} // End Check Local

// Check if User Chosen Font-size??
let fontSize = localStorage.getItem("Font-size");
if (fontSize != null) {
  document.documentElement.style.fontSize = fontSize;
  let chosenSelects = document.querySelectorAll(".select-size option");
  chosenSelects.forEach((select) => {
    if (select.value == fontSize) {
      select.selected = true;
    }
  });
}
// End check if User Chosen Font-size

// Check if there local Storage random Background Item,
let backgroundLocalItem = localStorage.getItem("background_option");
// Check if we Have Background In LocalStorage
if (backgroundLocalItem != null) {
  let buttonsBackGround = document.querySelectorAll(".random-backgrounds button");
  RemoveElemntsClass(buttonsBackGround, "active");
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    let no = document.querySelector(".random-backgrounds .no");
    no.classList.add("active");
  }
}
// check if User chosen Img
let userChosenImg = localStorage.getItem("userChosenImg");
if (userChosenImg != null) {
  landingPage.style.backgroundImage = `url("${userChosenImg}")`;
  //  when user Chosen Img Do not Remove class Active from Chosen img,
  let allImgs = document.querySelectorAll(".container-imgs img");
  allImgs.forEach((img) => {
    img.classList.remove("active");
    // removeClassActive(img,"active")
    if (userChosenImg === img.src) {
      img.classList.add("active");
    }
  });
}

// Check If Want Show or Hide Bullet Save it local Storage
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem != null) {
  RemoveElemntsClass(bulletBtn, "active");
  if (bulletLocalItem === "show") {
    
    containerBullet.classList.remove("no-Show-Bullet");
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    containerBullet.classList.add("no-Show-Bullet");
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
// Check User  Chosen Dark Or Light Mode
let mode = localStorage.getItem("Mode");
if (mode != null) {
let html = document.documentElement;
mode == "light"
?html.classList.remove("dark")
:html.classList.add("dark");
}
// ============================================
// ? End Check Local Storage
//================================================

function OptionBox() {
  // Toggle Spin Class On icon option box
  toggle.onclick = function () {
    // Toggle in Class Fa-spin for rotation on self icon:
    this.classList.toggle("fa-spin");
    //Toggle Class Open: on Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
  }; // End Toggle Spin
  // change root Color Then add it to Local Storage,
  COLORSLI.forEach((li) => {
    // Click on every List Items
    li.addEventListener("click", (e) => {
      // Set Color On Root
      document.documentElement.style.setProperty("--main-Color",e.target.dataset.color);
      // Set Color on Local Storage:
      localStorage.setItem("color_option", e.target.dataset.color);
      // Remove Active Class from all Childrens...
      // Add Active Class On Self:
      handleActive(e, COLORSLI, "active");
    });
  }); // End Switch Colors
  // give user Option To Stop Background random or Keep it?
  randomBackEl.forEach((btn) => {
    // Add Event to Both btn,
    btn.addEventListener("click", (e) => {
      // Remove all Class Active //? Add to Current Ele
      handleActive(e, randomBackEl, "active");
      if (e.target.dataset.background == "yes") {
        backgroundOption = true;
        localStorage.setItem("background_option", true);
        changeBackGround();
      } else if (e.target.dataset.background == "no") {
        backgroundOption = false;
        clearInterval(backgroundInterval);
        localStorage.setItem("background_option", false);
      }
      userWantChangeImg();
    });
  });
  // Dark Mode Light Mode
  const Dark = document.getElementById("dark");
  const Light = document.getElementById("light");
  Dark.addEventListener("click", () => {
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("Mode", "dark");
  });
  Light.addEventListener("click", () => {
    document.documentElement.classList.remove("dark");
    window.localStorage.setItem("Mode", "light");
  });
  // Manage Bullet Show Or Hide On Option box,
  bulletBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // If i click in Btn Show Show Bullet
      if (btn.dataset.display === "show") {
        containerBullet.classList.remove("no-Show-Bullet");
        localStorage.setItem("bullets_option", "show");
      }
      //else Mean i click  Hide Bullet
      else {
        containerBullet.classList.add("no-Show-Bullet");
        localStorage.setItem("bullets_option", "hide");
      }
      // Remove class Active
      // Add Class to Clicked Element
      handleActive(e, bulletBtn, "active");
    });
  });
  // Change Size Elements
  selectSize.addEventListener("change", (e) => {
    document.documentElement.style.fontSize = e.target.value;
    localStorage.setItem("Font-size", e.target.value);
  });
}

// Change Background
//Select Landing page Element,

// Check if User Chosen Img ??
function userWantChangeImg() {
  if (backgroundOption == false) {
    let containerImgs = document.querySelectorAll(".container-imgs img");
    containerImgs.forEach((img) => {
      img.classList.add("userclickno");
      // Add event To every Img,
      img.addEventListener("click", (e) => {
        // Remove Class in every Img, add to Current,
        handleActive(e, containerImgs, "active");
        // Change Landing bk Depend in user, Chosen Img
        landingPage.style.backgroundImage = `url("${e.target.src}")`;
        // Add User Chosen Img To LocalStorage,
        localStorage.setItem("userChosenImg", e.target.src);
      });
    });
  } else {
    let containerImgs = document.querySelectorAll(".container-imgs img");
    containerImgs.forEach((img) => img.classList.remove("userclickno"));
  }
}
// userWantChangeImg();
// Change imgs random
function changeBackGround() {
  while (IndexImgsArray <= 6) {
    imgsArray.push(`${IndexImgsArray}.jpg`);
    IndexImgsArray++;
  }
  // Get Random Number-->:
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image URL
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
      // Loop On img Inside Chosen Box to Add remove Class
      chosenBoxImgs.forEach((img) => {
        // Remove Class!
        img.classList.remove("active");
        // Then Check ChosenboxImg is Equal To randomBackGround
        // console.log(img.src + `${landingPage.style.backgroundImage}`)
        let ChosenImg = chosenBoxImgs[randomNumber];
        if (ChosenImg.dataset.img == imgsArray[randomNumber])
          ChosenImg.classList.add("active");
      });
    }, 10000);
  }
}
//  Animate Skills
function ScrollAnimation() {
  function handleScroll() {
    // Skills Animation
    const skillsOffSetTop = ourSkills.offsetTop;
    const skillsOuterHeight = ourSkills.offsetHeight;
    const windowHeight = window.innerHeight;
    const windowScrollTop = window.pageYOffset;

    if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
      allSkills.forEach((skill) => {
        skill.style.width = skill.dataset.progress;
      });
    } else {
      allSkills.forEach((skill) => (skill.style.width = "0"));
    }

    // Scroll Reveal Animations
    checkScroll(introLanding, introduction, 1);
    checkScroll(aboutUs, childrenAboutUs, 2);
    checkScroll(ourSkills, allSkillBox, 4);
    checkScroll(gallery, galleryChildren, 10);
    checkScroll(timeLine, allTimeLineBoxs, 4);
    checkScroll(featureParent, FeatureChildren, 5);
    checkScroll(testimonial, testimonailChildren, 3);
  }

  // Use ONLY ONE scroll event
  window.addEventListener("scroll", handleScroll);

  // Run once on load
  // handleScroll();
}

//  End Function Bullet
//Create PopUp With the Image

function createPopUpImg() {
  ourGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      // Create OverLay Ele,
      let overLay = document.createElement("div");
      // Add Class to OverLay,
      overLay.className = "popup-overlay";
      document.body.appendChild(overLay);
      // Create Pop_Up
      let popupBox = document.createElement("div");
      popupBox.className = `popup-box`;
      // Create The Img,
      let popupImage = document.createElement("img");
      popupImage.src = img.src;
      popupBox.appendChild(popupImage);
      document.body.appendChild(popupBox);
      if (img.alt !== null) {
        // Create Heading:
        let imgHeading = document.createElement("h3");
        // Create Text for Heading
        let imgText = document.createTextNode(img.alt);
        // Append The Text to Heading,
        imgHeading.appendChild(imgText);
        // Append it to PopUpBox,
        popupBox.prepend(imgHeading);
      }
      // Create The Close Btn,
      let closeBtn = document.createElement("button");
      let textBtn = document.createTextNode("X");
      closeBtn.appendChild(textBtn);
      // Class To Close Btn,
      closeBtn.className = "close-Button";
      popupBox.appendChild(closeBtn);
    });
  });
}
// Delete PopUp
document.addEventListener("click", function (e) {
  if (e.target.className === "close-Button") {
    // Remove
    e.target.parentNode.remove();
    // Remove OverLay
    document.querySelector(".popup-overlay").remove();
  }
});


function ResetOption() {
  document.querySelector(".reset-options").onclick = ()=>{
    localStorage.clear()
    window.location.reload()
  }
}
function HandleMenu() {
  let toggleBtn = document.querySelector(".landing-page .toggle-menu");
  let tLinks = document.querySelector(".links")
  toggleBtn.onclick = (event)=>{
    event.stopPropagation();
    tLinks.classList.toggle("open")
    
  }
 tLinks.onclick = function (e) {
    e.stopPropagation()
  }
  document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {
     // Check if Menu Open
      if (tLinks.classList.contains("open")) {
        tLinks.classList.toggle("open")
       }
   }
  }) 
 
}
// ============================================
// ? Funtion Resauble
//==============================================

function checkScroll(parent, elements, CountElements) {
  const trigger = window.innerHeight * 0.8
  if (window.scrollY + trigger >= parent.offsetTop) {
    // Show Elements
    if (CountElements > 1) {
      elements.forEach((ele) => ele.classList.remove("opacity"));
    } else {
      elements.classList.remove("opacity");
    }
  }// Hide Elements
   else {
    if (CountElements > 1) {
      elements.forEach((ele) => ele.classList.add("opacity"));
    } else {
      elements.classList.add("opacity");
    }
  }
}
// handle Active State

function ScrollToSomeWhere(elements) {
  // Loop On all Bullet#
  elements.forEach((ele) => {
    // add Event To Every bullet,
    ele.addEventListener("click", (e) => {
      // removeClass(elements,"active")
      // e.currentTarget.classList.add("active")
      handleActive(e, elements, "active");
      e.preventDefault();
      // Then
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
      // Remove Active Class Add To Current Ele
    });
  });
}

function handleActive(ChosenEle, elements, classEle) {
  if (elements) {
    elements.forEach((ele) => {
      ele.classList.remove(classEle);
    });
    ChosenEle.target.classList.add(classEle);
  } else {
    ChosenEle.classList.add(classEle);
  }
}
function RemoveElemntsClass(elements, eleclass) {
  elements.forEach((ele) => {
    ele.classList.remove(eleclass);
  });
}
// ============================================
// ?end Funtion Resauble
//==============================================

// ======================
// ? Call All Function window on Load
//===========================
window.onload = function () {
  RemoveLoading();
  OptionBox();
  changeBackGround();
  userWantChangeImg();
  ScrollAnimation();
  createPopUpImg();
  ScrollToSomeWhere(allLinks);
  ScrollToSomeWhere(Bullets);
  ResetOption();
  HandleMenu()
};
