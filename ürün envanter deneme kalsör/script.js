let products = [];

function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach((product) => {
    const productRow = document.createElement('tr');
    productRow.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price} TL</td>
      <td>${product.quantity}</td>
      <td>
        <button onclick="increaseQuantity('${product.name}')">+</button>
        <button onclick="decreaseQuantity('${product.name}')">-</button>
        <button onclick="deleteProduct('${product.name}')">Sil</button>
      </td>
    `;
    productList.appendChild(productRow);
  });

  saveDataToLocal();
}

function addProduct() {
  const productName = document.getElementById('product-name').value;
  const productPrice = parseFloat(document.getElementById('product-price').value);
  const initialQuantity = parseInt(document.getElementById('initial-quantity').value);

  if (productName && !isNaN(productPrice) && !isNaN(initialQuantity)) {
    const existingProduct = products.find(product => product.name === productName);

    if (existingProduct) {
      alert("Bu isimde bir ürün zaten var. Miktarı güncelleyebilirsiniz.");
      return;
    }

    const newProduct = {
      name: productName,
      price: productPrice,
      quantity: initialQuantity
    };

    products.push(newProduct);
    displayProducts();
  } else {
    alert("Lütfen geçerli bir ürün adı, fiyat ve başlangıç miktarı girin.");
  }
}

function increaseQuantity(productName) {
  const product = products.find(product => product.name === productName);
  if (product) {
    product.quantity++;
    displayProducts();
  }
}

function decreaseQuantity(productName) {
  const product = products.find(product => product.name === productName);
  if (product && product.quantity > 0) {
    product.quantity--;
    displayProducts();
  }
}

function deleteProduct(productName) {
  const index = products.findIndex(product => product.name === productName);
  if (index !== -1) {
    products.splice(index, 1);
    displayProducts();
  }
}

function saveDataToLocal() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadDataFromLocal() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    displayProducts();
  }
}

loadDataFromLocal();