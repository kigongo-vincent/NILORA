const getCurrentPathName = () => {
  const currentURI = window.location.href;
  const pathArray = currentURI?.split("/");
  const pathURI = pathArray[pathArray?.length - 1];
  return pathURI ? pathURI?.split(".")[0] : "";
};

// detect scrolling to update the navbar bg
document.addEventListener("scroll", (e) => {
  const navbarEl = document.querySelector("nav");

  const blockedPaths = ["product"];

  if (blockedPaths.includes(getCurrentPathName())) {
    console.log("blocked");
    return;
  }

  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > 100) {
    navbarEl.classList.add("bg-primary");
  } else {
    navbarEl.classList.remove("bg-primary");
  }
});

// toggle product visibility
const closeProductVisibility = () => {
  const currentProduct = document.querySelector("#" + event.target.id);
  const currentProductContent = document.querySelector(
    `#${event.target.id} .product-details`
  );
  currentProductContent.style.display = "none";
  currentProduct.classList.remove("product-open");
};
const enableProductVisibility = () => {
  const currentProductContent = document.querySelector(
    `#${event.target.id} .product-details`
  );
  const currentProduct = document.querySelector("#" + event.target.id);
  currentProductContent.style.display = "block";
  currentProduct.classList.add("product-open");
};

// product

const productSizes = [
  { ml: 23, oz: 43, price: 4500 },
  { ml: 56, oz: 12, price: 3400 },
  { ml: 12, oz: 78, price: 1200 },
];

const productSizesContainer = document.querySelector(".sizes");
let currentSizeIndex = 1;
let currentPrice = productSizes[0].price;

let currentPriceUI = document.getElementById("product-price");

const updateCurrentSize = (index) => {
  currentSizeIndex = index;
  currentPriceUI.innerText =
    "UGX " + productSizes[index].price?.toLocaleString("en-US");
  LoadProductSizesUI();
};

const ProductSizeCard = (size, index) => {
  return `
  <div id="1" onclick="updateCurrentSize(${index})" class="size ${
    index === currentSizeIndex ? "focused-size" : ""
  }" onclick="handleClick(${index})">
              <div>
                <h3>${size.ml}</h3>
                <small>ml</small>
              </div>
              <p>${size.oz}FL OZ</p>
            </div>
  `;
};

const LoadProductSizesUI = () => {
  let output = "";
  productSizes.map((s, i) => {
    output += ProductSizeCard(s, i);
  });
  productSizesContainer.innerHTML = output;
};

window.addEventListener("load", () => {
  LoadProductSizesUI();
  currentPriceUI.innerText =
    "UGX " + productSizes[currentSizeIndex].price?.toLocaleString("en-US");
});

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const tabsContainer = document.querySelector(".tabs");
const scrollBtn = document.getElementById("scrollRight");

// Add click event listeners to tabs
tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const targetTab = e.target.getAttribute("data-tab");

    // Remove active class from all tabs and panels
    tabs.forEach((t) => t.classList.remove("active"));
    panels.forEach((p) => p.classList.remove("active"));

    // Add active class to clicked tab
    e.target.classList.add("active");

    // Show corresponding panel
    const targetPanel = document.getElementById(targetTab);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});

// Scroll button functionality
scrollBtn.addEventListener("click", () => {
  const scrollAmount = 200;
  tabsContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});

// Optional: Auto-hide scroll button when at end
tabsContainer.addEventListener("scroll", () => {
  const isAtEnd =
    tabsContainer.scrollLeft >=
    tabsContainer.scrollWidth - tabsContainer.clientWidth - 10;
  scrollBtn.style.opacity = isAtEnd ? "0.3" : "1";
});

// Optional: Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const activeTab = document.querySelector(".tab.active");
    const currentIndex = Array.from(tabs).indexOf(activeTab);
    let newIndex;

    if (e.key === "ArrowLeft") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }

    tabs[newIndex].click();

    // Scroll the selected tab into view
    tabs[newIndex].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }
});

// product
