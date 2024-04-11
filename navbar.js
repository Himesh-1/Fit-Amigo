const navbarData = [
    { label: "Home", link: "index.html" },
    { label: "Cooking", link: "he.html" },
    { label: "Baking", link: "baking1.html" },
    { label: "Fitness", subitems: [
      { label: "Workouts", link: "workouts.html" },
      { label: "Yoga", link: "yoga.html" },
      { label: "Diet Plans", link: "plans.html" }
    ] },
    { label: "BMI", link: "bmi.html" }
  ];

// Create navbar function
function createNavbar() {
    const nav = document.createElement("nav");
    nav.className = "bg-gray-800";
  
    const div1 = document.createElement("div");
    div1.className = "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8";
  
    const div2 = document.createElement("div");
    div2.className = "relative flex h-16 items-center justify-between";
  
    const div3 = document.createElement("div");
    div3.className = "absolute inset-y-0 left-0 flex items-center sm:hidden";
  
   // Mobile menu button
const button = document.createElement("button");
button.type = "button";
button.className = "relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white";
button.setAttribute("aria-controls", "mobile-menu");
button.setAttribute("aria-expanded", "false");

const span1 = document.createElement("span");
span1.className = "absolute -inset-0.5";

const span2 = document.createElement("span");
span2.className = "sr-only";
span2.textContent = "Open main menu";

const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg1.setAttribute("class", "block h-6 w-6");
svg1.setAttribute("fill", "none");
svg1.setAttribute("viewBox", "0 0 24 24");
svg1.setAttribute("stroke-width", "1.5");
svg1.setAttribute("stroke", "currentColor");
svg1.setAttribute("aria-hidden", "true");
const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute("stroke-linecap", "round");
path1.setAttribute("stroke-linejoin", "round");
path1.setAttribute("d", "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5");
svg1.appendChild(path1);

const svg2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg2.setAttribute("class", "hidden h-6 w-6");
svg2.setAttribute("fill", "none");
svg2.setAttribute("viewBox", "0 0 24 24");
svg2.setAttribute("stroke-width", "1.5");
svg2.setAttribute("stroke", "currentColor");
svg2.setAttribute("aria-hidden", "true");
const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("stroke-linecap", "round");
path2.setAttribute("stroke-linejoin", "round");
path2.setAttribute("d", "M6 18L18 6M6 6l12 12");
svg2.appendChild(path2);

button.appendChild(span1);
button.appendChild(span2);
button.appendChild(svg1);
button.appendChild(svg2);
button.addEventListener("click", function() {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

div3.appendChild(button);

  
    const div4 = document.createElement("div");
    div4.className = "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start";
  
    const div5 = document.createElement("div");
    div5.className = "hidden ml-6 sm:block";
  
    const ul1 = document.createElement("ul");
    ul1.className = "flex space-x-3 text-[15px]";
  
    navbarData.forEach(item => {
      const li = document.createElement("li");
      li.className = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 font-medium";
      const a = document.createElement("a");
      a.href = item.link;
      a.textContent = item.label;
      li.appendChild(a);
      ul1.appendChild(li);
  
      // Check if the item has subitems
      if (item.subitems) {
        const subUl = document.createElement("ul");
        subUl.className = "absolute z-10 mt-3 w-40 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none";
        subUl.setAttribute("role", "menu");
        subUl.setAttribute("aria-orientation", "vertical");
        subUl.classList.add("hidden");
  
        item.subitems.forEach(subitem => {
          const subLi = document.createElement("li");
          const subA = document.createElement("a");
          subA.href = subitem.link;
          subA.textContent = subitem.label;
          subA.className = "text-gray-300 block px-4 py-2 text-sm hover:text-white hover:bg-gray-500 hover:scale-100";
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });
  
        li.appendChild(subUl);
  
        li.addEventListener("click", function() {
            subUl.classList.toggle("hidden");
          });
          a.addEventListener("click", function(event) {
            event.preventDefault();
          });
        }
      });
  
    // Additional links for "Log In" and "Sign Up"
    const liLogin = document.createElement("li");
    liLogin.className = "mt-1 ";
    const buttonLogin = document.createElement("button");
    buttonLogin.className = "bg-blue-600 px-3  text-white text-lg rounded-full border-blue-500 border-2 hover:bg-transparent";
    const aLogin = document.createElement("a");
    aLogin.href = "loginpage.html";
    aLogin.textContent = "Log In";
    buttonLogin.appendChild(aLogin);
    liLogin.appendChild(buttonLogin);
  
    const liSignup = document.createElement("li");
    liSignup.className = "mt-1 px-3";
    const buttonSignup = document.createElement("button");
    buttonSignup.className = "px-3  text-white text-lg rounded-full border-blue-500 border-2 hover:bg-blue-400";
    const aSignup = document.createElement("a");
    aSignup.href = "signup.html";
    aSignup.textContent = "Sign Up";
    buttonSignup.appendChild(aSignup);
    liSignup.appendChild(buttonSignup);

    const liSpacer = document.createElement("li");
    liSpacer.className = "mt-1 px-[200px]";

    ul1.appendChild(liSpacer); // Add spacer
    ul1.appendChild(liLogin); // Add Log In button
    ul1.appendChild(liSignup); // Add Sign Up button
  
    div5.appendChild(ul1);
    div4.appendChild(div5);
    div2.appendChild(div3);
    div2.appendChild(div4);
    div1.appendChild(div2);
    nav.appendChild(div1);
  
// Mobile menu
const div6 = document.createElement("div");
div6.className = "sm:hidden";
div6.id = "mobile-menu";

const div7 = document.createElement("div");
div7.className = "space-y-1 px-2 pb-3 pt-2";

navbarData.forEach(item => {
  const a = document.createElement("a");
  a.href = item.link;
  a.textContent = item.label;
  a.className = "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";
  div7.appendChild(a);

  // Check if the item has subitems
  if (item.subitems) {
    item.subitems.forEach(subitem => {
      const subA = document.createElement("a");
      subA.href = subitem.link;
      subA.textContent = subitem.label;
      subA.className = "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";
      div7.appendChild(subA);
    });
  }
});

// Container for Log In and Sign Up buttons
const loginSignupContainer = document.createElement("div");

// Wrapper for Log In button
const loginWrapper = document.createElement("div");
loginWrapper.style.display = "inline-block"; // Display the wrapper as inline-block
loginWrapper.style.paddingRight = "5px"; // Adjust the padding as needed
loginWrapper.className = "text-left"; // Left-align the Log In button

// Add Log In button to wrapper
const loginButton = document.createElement("button");
loginButton.className = "bg-blue-600 px-3 text-white rounded-full border-blue-500 border-2 hover:bg-transparent";
const loginLink = document.createElement("a");
loginLink.href = "loginpage.html";
loginLink.textContent = "Log In";
loginButton.appendChild(loginLink);
loginWrapper.appendChild(loginButton);

loginSignupContainer.appendChild(loginWrapper);

// Wrapper for Sign Up button
const signupWrapper = document.createElement("div");
signupWrapper.style.display = "inline-block"; // Display the wrapper as inline-block
signupWrapper.style.paddingLeft = "30px"; // Adjust the padding as needed

// Add Sign Up button to wrapper
const signupButton = document.createElement("button");
signupButton.className = "px-3 text-white rounded-full border-blue-500 border-2 hover:bg-blue-400";
const signupLink = document.createElement("a");
signupLink.href = "signup.html";
signupLink.textContent = "Sign Up";
signupButton.appendChild(signupLink);
signupWrapper.appendChild(signupButton);

loginSignupContainer.appendChild(signupWrapper);

div7.appendChild(loginSignupContainer);

div6.appendChild(div7);
nav.appendChild(div6);



  
    return nav;
  }
  
  // Append navbar to body
  document.body.appendChild(createNavbar());
