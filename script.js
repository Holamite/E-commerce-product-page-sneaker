const largeImage = document.querySelector(".large-image");
const thumbnailImages = document.querySelectorAll(".thumbnail-image");

thumbnailImages.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const newImageSrc = thumbnail.getAttribute("src");
    largeImage.setAttribute("src", newImageSrc);
  });
});

const lightboxContainer = document.querySelector(".lightbox-container");
const closeLightbox = () => {
  lightboxContainer.classList.remove("lightbox-active");
};

largeImage.addEventListener("click", () => {
  lightboxContainer.classList.add("lightbox-active");
  lightboxContainer.classList.remove("lightbox-active");
});

lightboxContainer.addEventListener("click", (event) => {
  if (event.target === lightboxContainer) {
    closeLightbox();
  }
});

//////////////////////////////////////////////////
// Add to cart
//////////////////////////////////////////////////
const addButtons = document.querySelectorAll(".add-cart a:first-child");
const subtractButtons = document.querySelectorAll(".add-cart a:last-child");
const cartNums = document.querySelectorAll(".cart-num");
const cartBtn = document.querySelector(".cart-btn");
const cartItemNum = document.querySelector(".cart-item-num");

addButtons.forEach((addButton, index) => {
  addButton.addEventListener("click", () => {
    const currentCount = parseInt(cartNums[index].textContent);
    cartNums[index].textContent = currentCount + 1;
    updateCartTotal();
  });
});

subtractButtons.forEach((subtractButton, index) => {
  subtractButton.addEventListener("click", () => {
    const currentCount = parseInt(cartNums[index].textContent);
    if (currentCount > 0) {
      cartNums[index].textContent = currentCount - 1;
      updateCartTotal();
    }
  });
});

function updateCartTotal() {
  let totalItems = 0;
  cartNums.forEach((cartNum) => {
    totalItems += parseInt(cartNum.textContent);
  });
  cartBtn.textContent = `Add to cart (${totalItems} items)`;
  cartItemNum.textContent = `${totalItems}`;
}

updateCartTotal(); // Call the function initially to set the correct initial value

/// Your existing code

// Add this function after the updateCartTotal() function
function showNotificationBadge() {
  const notificationBadge = document.createElement("span");
  notificationBadge.classList.add("notification-badge");
  const totalItems = getTotalItems();
  notificationBadge.textContent = totalItems;

  const existingBadge = document.querySelector(".notification-badge");
  if (existingBadge) {
    existingBadge.remove();
  }

  cartIcon.appendChild(notificationBadge);

  setTimeout(() => {
    notificationBadge.style.display = "inline-block";
    setTimeout(() => {
      notificationBadge.style.display = "none";
    }, 2000);
  }, 10);
}

// Add this function after the showNotificationBadge() function
function getTotalItems() {
  let totalItems = 0;
  cartNums.forEach((cartNum) => {
    totalItems += parseInt(cartNum.textContent);
  });
  return totalItems;
}

// Update your cartBtn event listener
cartBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission
  updateCartTotal();
  showNotificationBadge();
});

// Select elements
const cartIcon = document.querySelector(".cart-icon");
const addCartBtn = document.querySelector(".cart-btn");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const cartItems = document.querySelectorAll(".cart-num");
const itemPriceElements = document.querySelectorAll(".item-price");

// Add an event listener to handle page refresh
window.addEventListener("DOMContentLoaded", () => {
  closeModal();
  resetCartElements();
});

// Function to open the modal
function openModal() {
  modal.style.display = "block";
  overlay.style.display = "block"; // Show the overlay
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
  overlay.style.display = "none"; // Hide the overlay
}

// Function to calculate and update total price in the modal
function updateTotalPrice() {
  let totalPrice = 0;
  cartItems.forEach((cartItem, index) => {
    const itemCount = parseInt(cartItem.textContent);
    const itemPrice = parseFloat(
      itemPriceElements[index].textContent.replace("$", "")
    );
    totalPrice += itemCount * itemPrice;

    // Update the item price span with the calculated total
    const itemPriceSpan = itemPriceElements[index].querySelector("span");
    itemPriceSpan.textContent = `$${(itemCount * itemPrice).toFixed(2)}`;
  });

  // Update the total price in the modal
  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Add click event listener to cart icon
cartIcon.addEventListener("click", () => {
  openModal();
  updateTotalPrice();
});

// Add click event listener to close modal button
const closeButton = document.querySelector(".icon-delete");
closeButton.addEventListener("click", () => {
  closeModal();
});
const checkoutButton = document.querySelector(".Checkout-btn");
checkoutButton.addEventListener("click", () => {
  closeModal();
});

// Add click event listener to overlay to close modal
const overlay = document.querySelector(".overlay");
overlay.addEventListener("click", () => {
  closeModal();
});
