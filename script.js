const chocolates = [
    { name: 'Dark Chocolate', price: 200 , imageUrl: 'Images/Img1.png'},
    { name: 'Milk Chocolate', price: 300 , imageUrl: 'Images/Img2.jpg'},
    { name: 'Dairy Milk', price: 250 , imageUrl: 'Images/Img3.webp'},
    { name: 'Candies', price: 350 , imageUrl: 'Images/Img4.webp'},
    { name: 'See Candies ', price: 180 , imageUrl: 'Images/Img5.webp'},
    { name: 'M&M', price: 180 , imageUrl: 'Images/Img6.jpg'},

  ];

  const chocolateList = document.getElementById('chocolateList');
  const selectedChocolates = document.getElementById('selectedChocolates');
  const totalPriceElement = document.getElementById('totalPrice');
  const checkoutMessageElement = document.getElementById('checkoutMessage');


let selectedChocolatesArray = [];

function renderChocolates() {
  chocolates.forEach(chocolate => {
    const chocolateItem = createChocolate(chocolate);
    chocolateList.appendChild(chocolateItem);
  });
}
    
function createChocolate(chocolate) {
  const item = document.createElement('div');
  item.className = 'chocolate-item';
  item.innerHTML = `
    <img src="${chocolate.imageUrl}" alt="${chocolate.name}" style="width: 100px;">
    <p>${chocolate.name} - Rs ${chocolate.price.toFixed(2)}</p>
  `;
  item.addEventListener('click', () => selectedChocolate(chocolate));
  return item;
}

// alert if choco item extend more than 8
function selectedChocolate(chocolate) {
  if (selectedChocolatesArray.length < 8) {
    selectedChocolatesArray.push(chocolate);
    renderSelectedChocolates();
    updateTotalPrice();
  } else {
    alert('You can only select up to 8 chocolates in your custom pack.');
  }
}

function renderSelectedChocolates() {
  selectedChocolates.innerHTML = '';
  selectedChocolatesArray.forEach((chocolate, index) => {
    const selectedChocolateItem = createSelectedChocolateItem(chocolate, index);
    selectedChocolates.appendChild(selectedChocolateItem);
  });

  removeAllSelectedClasses();
  addSelectedClasses();
}

function createSelectedChocolateItem(chocolate, index) {
  const item = document.createElement('div');
  item.className = 'selected-chocolate-item';
  item.innerHTML = `
    <img src="${chocolate.imageUrl}" alt="${chocolate.name}" style="width: 30px;">
    <p>${chocolate.name}</p>
    <button class="remove-button" onclick="removeChocolate(${index})">&#10006;</button>
  `;
  return item;
}

function removeAllSelectedClasses() {
  document.querySelectorAll('.chocolate-item').forEach(item => {
    item.classList.remove('selected');
  });
}

function addSelectedClasses() {
  selectedChocolatesArray.forEach(chocolate => {
    const itemName = chocolate.name.replace(/ /g, '');
    const selectedChocolateItem = document.querySelector(`.${itemName}`);
    if (selectedChocolateItem) {
      selectedChocolateItem.classList.add('selected');
    }
  });
}

function removeChocolate(index) {
  selectedChocolatesArray.splice(index, 1);
  renderSelectedChocolates();
  updateTotalPrice();
  updateCheckoutMessage();
}

function updateTotalPrice() {
  const totalPrice = selectedChocolatesArray.reduce((sum, chocolate) => sum + chocolate.price, 0);
  totalPriceElement.innerText = `Total Price: Rs ${totalPrice.toFixed(2)}`;
  updateCheckoutMessage();
}

function updateCheckoutMessage() {
    checkoutMessageElement.innerText = selectedChocolatesArray.length > 0 ? 'Checkout and enjoy your Chocolate' : '';
    checkoutMessage.innerHTML += selectedChocolatesArray.length > 0 ? ' 🎉' : ' ';
  }

renderChocolates();
