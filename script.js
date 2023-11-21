let stockData = [];

function displayStock(data) {
  const table = document.getElementById('stockTable');
  table.innerHTML = `
    <tr>
      <th>Brand Name</th>
      <th>Brand Category</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Actions</th>
    </tr>
  `;
  data.forEach(item => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${item.brandName}</td>
      <td>${item.brandCategory}</td>
      <td>${item.productName}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td>
        <button onclick="populateForm('${item.brandName}', '${item.brandCategory}', '${item.productName}', ${item.price}, ${item.quantity})">Edit</button>
      </td>
    `;
  });
}

function updateStock() {
  const brandName = document.getElementById('brandName').value;
  const brandCategory = document.getElementById('brandCategory').value;
  const productName = document.getElementById('productName').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const quantity = parseInt(document.getElementById('productQuantity').value);

  const existingItemIndex = stockData.findIndex(item =>
    item.brandName === brandName &&
    item.brandCategory === brandCategory &&
    item.productName === productName
  );

  if (existingItemIndex !== -1) {
    stockData[existingItemIndex].price = price;
    stockData[existingItemIndex].quantity = quantity;
  } else {
    stockData.push({
      brandName,
      brandCategory,
      productName,
      price,
      quantity
    });
  }

  displayStock(stockData);
}

function populateForm(brandName, brandCategory, productName, price, quantity) {
  document.getElementById('brandName').value = brandName;
  document.getElementById('brandCategory').value = brandCategory;
  document.getElementById('productName').value = productName;
  document.getElementById('productPrice').value = price;
  document.getElementById('productQuantity').value = quantity;
}

function filterStock() {
  const filterBrand = document.getElementById('filterBrand').value.toLowerCase();
  const filterCategory = document.getElementById('filterCategory').value.toLowerCase();

  const filteredData = stockData.filter(item =>
    item.brandName.toLowerCase().includes(filterBrand) &&
    item.brandCategory.toLowerCase().includes(filterCategory)
  );

  displayStock(filteredData);
}

function saveStockData() {
  localStorage.setItem('stockData', JSON.stringify(stockData));
}

function loadStockData() {
  const savedData = localStorage.getItem('stockData');
  if (savedData) {
    stockData = JSON.parse(savedData);
    displayStock(stockData);
  }
}

// Load saved data on page load
loadStockData();
