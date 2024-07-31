const searchBar = document.getElementById("searchBar");
const btnDelete = document.getElementById("btnDelete");
const btnSubmit = document.getElementById("btnSubmit");

// ----------------------------------Functions----------------------------------
function search() {
  const searchValue = document.getElementById("searchBar").value.toLowerCase();
  if (document.URL.includes("customer-management.html")) {
    let tableRows = document.querySelectorAll("#custTableBody tr");
    tableRows.forEach((row) => {
      const rowID = row.cells[0].innerHTML;
      const rowName = row.cells[1].innerHTML.toLowerCase();
      const rowNumber = row.cells[2].innerHTML;
      if (
        rowID.startsWith(searchValue) ||
        rowName.startsWith(searchValue) ||
        rowNumber.includes(searchValue)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
    return;
  }
  if (document.URL.includes("storage-management.html")) {
    let tableRows = document.querySelectorAll("#itemTableBody tr");
    tableRows.forEach((row) => {
      const rowID = row.cells[0].innerHTML;
      const rowName = row.cells[1].innerHTML.toLowerCase();
      if (rowID.includes(searchValue) || rowName.includes(searchValue)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
    return;
  }
  if (document.URL.includes("order-management.html")) {
    const cardArea = document.getElementById("cardArea");
    let Body = "";
    for (let i = 0; i < ItemArray.length; i++) {
      const item = ItemArray[i];
      if (item.name.toLowerCase().includes(searchValue)) {
        Body += `<div class="card" style="width: 18rem">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="180"></svg>
                <div class="card-body">
                  <h3 class="card-title">${item.name}</h3>
                  <h5 class="card-text">Exp. ${item.expDate}</h5>
                  <div class="card-body-bottom">
                    <h4>Rs. ${item.uPrice}</h4>
                    <button type="button" class="btn btn-primary" onclick="${addToCart(i)}">Add to cart</button>
                  </div>
                </div>
              </div>`;
      }
    }
    cardArea.innerHTML = Body;
    return;
  }
  if (document.URL.includes("report-management.html")) {
    return;
  }
}
//-----------------Customer-----------------
const newCustTitle = document.getElementById("newCustomerTitle");
const newCustName = document.getElementById("newCustomerName");
const newCustNumber = document.getElementById("newCustomerNumber");
class Customer {
  name;
  number;
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
}
let CustomerArray = [
  new Customer("Amal", "0118716212"),
  new Customer("Kamal", "0720788769"),
  new Customer("Nimal", "0770655001"),
  new Customer("Wimal", "0110770021"),
  new Customer("Sirimal", "0742562100"),
];
function clearCustomer() {
  try {
    newCustTitle.innerHTML = "New Customer";
    newCustName.value = "";
    newCustNumber.value = "";
  } finally {
    btnDelete.innerHTML = "Clear";
    btnDelete.setAttribute("onclick", `clearCustomer()`);
    btnSubmit.innerHTML = "Submit";
    btnSubmit.setAttribute("onclick", `addNewCustomer()`);
  }
}
function addNewCustomer() {
  if (
    newCustName.value.replace(" ", "") == "" ||
    newCustNumber.value.replace(" ", "") == ""
  ) {
    return;
  }
  for (let i = 0; i < CustomerArray.length; i++) {
    if (
      CustomerArray[i].name.toLowerCase() == newCustName.value.toLowerCase() &&
      CustomerArray[i].number == newCustNumber.value
    ) {
      alert("Empty!");
      return;
    }
  }
  CustomerArray[CustomerArray.length] = new Customer(
    newCustName.value,
    newCustNumber.value
  );
  clearCustomer();
  displayCustomerTable();
}
function updateCustomer(arrayIndex) {
  if (
    newCustName.value.replace(" ", "") == "" ||
    newCustNumber.value.replace(" ", "") == ""
  ) {
    alert("Empty!");
    return;
  }
  try {
    CustomerArray[arrayIndex] = new Customer(
      newCustName.value,
      newCustNumber.value
    );
  } finally {
    clearCustomer();
    displayCustomerTable();
  }
}
function removeCustomer(arrayIndex) {
  if (
    newCustName.value.replace(" ", "") == "" ||
    newCustNumber.value.replace(" ", "") == ""
  ) {
    alert("Empty!");
    return;
  }
  try {
    CustomerArray = CustomerArray.slice(0, arrayIndex).concat(
      CustomerArray.slice(arrayIndex + 1)
    );
  } finally {
    clearCustomer();
    displayCustomerTable();
  }
}
function displayCustomerTable() {
  const customerTableBody = document.getElementById("custTableBody");
  let tblBody = "";
  for (let i = 0; i < CustomerArray.length; i++) {
    tblBody += `<tr onclick="customerResult('${i + 1}')">
                  <td>${i + 1}</td>
                  <td>${CustomerArray[i].name}</td>
                  <td>${CustomerArray[i].number}</td>
                </tr>`;
  }
  customerTableBody.innerHTML = tblBody;
  return;
}
function customerResult(clickedElement) {
  newCustTitle.innerHTML = "Customer " + clickedElement;
  newCustName.value = CustomerArray[clickedElement - 1].name;
  newCustNumber.value = CustomerArray[clickedElement - 1].number;
  btnDelete.innerHTML = "Delete";
  btnDelete.setAttribute("onclick", `removeCustomer(${clickedElement - 1})`);
  btnSubmit.innerHTML = "Update";
  btnSubmit.setAttribute("onclick", `updateCustomer(${clickedElement - 1})`);
}
//-----------------Item-----------------
const btnEXP = document.getElementById("btnExpired");
const newItemTitle = document.getElementById("newItemTitle");
const newItemName = document.getElementById("newItemName");
const newItemEXP = document.getElementById("newItemEXP");
const newItemUPrice = document.getElementById("newItemUPrice");
const newItemDiscount = document.getElementById("newItemDiscount");
const newItemQty = document.getElementById("newItemQty");
class Item {
  name;
  expDate;
  uPrice;
  discount;
  qty;
  constructor(name, expDate, uPrice, discount, qty) {
    this.name = name;
    this.expDate = expDate;
    this.uPrice = uPrice;
    this.discount = discount;
    this.qty = qty;
  }
}
let ItemArray = [
  new Item("Cola", "2024-08-30", 360, 10, 25),
  new Item("Milk", "2024-07-31", 400, 5, 10),
  new Item("Chicken Burger", "2024-08-01", 700, 5, 10),
];
function clearItem() {
  try {
    newItemTitle.innerHTML = "Add new Item";
    newItemName.value = "";
    newItemEXP.value = "";
    newItemUPrice.value = "";
    newItemDiscount.value = "";
    newItemQty.value = "";
  } finally {
    btnDelete.innerHTML = "Clear";
    btnDelete.setAttribute("onclick", `clearItem()`);
    btnSubmit.innerHTML = "Submit";
    btnSubmit.setAttribute("onclick", `addNewItem()`);
  }
}
function addNewItem() {
  if (
    newItemName.value.replace(" ", "") == "" ||
    newItemEXP.value.replace(" ", "") == "" ||
    newItemUPrice.value.replace(" ", "") == "" ||
    newItemDiscount.value.replace(" ", "") == "" ||
    newItemQty.value.replace(" ", "") == ""
  ) {
    alert("Empty!");
    return;
  }
  for (let i = 0; i < ItemArray.length; i++) {
    if (
      ItemArray[i].name.toLowerCase() == newItemName.value.toLowerCase() &&
      ItemArray[i].expDate == newItemEXP.value &&
      ItemArray[i].uPrice == newItemUPrice.value &&
      ItemArray[i].discount == newItemDiscount.value &&
      ItemArray[i].qty == newItemQty.value
    ) {
      return;
    }
  }
  ItemArray[ItemArray.length] = new Item(
    newItemName.value,
    newItemEXP.value,
    parseInt(newItemUPrice.value),
    parseInt(newItemDiscount.value),
    parseInt(newItemQty.value)
  );
  clearItem();
  displayItemTable();
}
function updateItem(arrayIndex) {
  if (
    newItemName.value.replace(" ", "") == "" ||
    newItemEXP.value.replace(" ", "") == "" ||
    newItemUPrice.value.replace(" ", "") == "" ||
    newItemDiscount.value.replace(" ", "") == "" ||
    newItemQty.value.replace(" ", "") == ""
  ) {
    alert("Empty!");
    return;
  }
  try {
    ItemArray[arrayIndex] = new Item(
      newItemName.value,
      newItemEXP.value,
      parseInt(newItemUPrice.value),
      parseInt(newItemDiscount.value),
      parseInt(newItemQty.value)
    );
  } finally {
    clearItem();
    displayItemTable();
  }
}
function removeItem(arrayIndex) {
  if (
    newItemName.value.replace(" ", "") == "" ||
    newItemEXP.value.replace(" ", "") == "" ||
    newItemUPrice.value.replace(" ", "") == "" ||
    newItemDiscount.value.replace(" ", "") == "" ||
    newItemQty.value.replace(" ", "") == ""
  ) {
    alert("Empty!");
    return;
  }
  try {
    ItemArray = ItemArray.slice(0, arrayIndex).concat(
      ItemArray.slice(arrayIndex + 1)
    );
  } finally {
    clearItem();
    displayItemTable();
  }
}
function displayItemTable() {
  const itemTableBody = document.getElementById("itemTableBody");
  let tblBody = "";
  for (let i = 0; i < ItemArray.length; i++) {
    tblBody += `<tr onclick="itemResult('${i + 1}')">
                  <td>${i + 10001}</td>
                  <td>${ItemArray[i].name}</td>
                </tr>`;
  }
  itemTableBody.innerHTML = tblBody;
  return;
}
function itemResult(clickedElement) {
  newItemTitle.innerHTML = 10000 + new Number(clickedElement);
  newItemName.value = ItemArray[clickedElement - 1].name;
  newItemEXP.value = ItemArray[clickedElement - 1].expDate;
  newItemUPrice.value = ItemArray[clickedElement - 1].uPrice;
  newItemDiscount.value = ItemArray[clickedElement - 1].discount;
  newItemQty.value = ItemArray[clickedElement - 1].qty;
  btnDelete.innerHTML = "Delete";
  btnDelete.setAttribute("onclick", `removeItem(${clickedElement - 1})`);
  btnSubmit.innerHTML = "Update";
  btnSubmit.setAttribute("onclick", `updateItem(${clickedElement - 1})`);
}
function displayEXPItem(isPressed) {
  if (isPressed) {
    clearItem();
    displayItemTable();
    btnEXP.setAttribute("onclick", `displayEXPItem(${false})`);
  } else {
    const itemTableBody = document.getElementById("itemTableBody");
    let currentDate = new Date();
    let tblBody = "";
    for (let i = 0; i < ItemArray.length; i++) {
      let itemEXPDate = new Date(ItemArray[i].expDate);
      if (itemEXPDate <= currentDate) {
        tblBody += `<tr onclick="itemResult('${i + 1}')">
                        <td>${i + 10001}</td>
                        <td>${ItemArray[i].name}</td>
                     </tr>`;
      }
    }
    itemTableBody.innerHTML = tblBody;
    btnEXP.setAttribute("onclick", `displayEXPItem(${true})`);
  }
}
//-----------------Order-----------------
function addToCart(index) {
  
}
function displayOrderTable() {
  const cardArea = document.getElementById("cardArea");
  for (let i = ItemArray.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      ItemArray.sort(function (x = ItemArray[j], y = ItemArray[j + 1]) {
        if (x.name < y.name) {
          return -1;
        }
        if (x.name > y.name) {
          return 1;
        }
        return 0;
      });
    }
  }
  let Body = "";
  for (let i = 0; i < ItemArray.length; i++) {
    Body += `<div class="card" style="width: 18rem">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="180"></svg>
                <div class="card-body">
                  <h3 class="card-title">${ItemArray[i].name}</h3>
                  <h5 class="card-text">Exp. ${ItemArray[i].expDate}</h5>
                  <div class="card-body-bottom">
                    <h4>Rs. ${ItemArray[i].uPrice}</h4>
                    <button type="button" class="btn btn-primary" onclick="${addToCart(ItemArray[i])}">Add to cart</button>
                  </div>
                </div>
              </div>`;
  }
  cardArea.innerHTML = Body;
  return;
}
// ----------------------------------Runtime----------------------------------
try {
  clearCustomer();
  displayCustomerTable();
} catch (TypeError) {
  try {
    clearItem();
    displayItemTable();
  } catch (TypeError) {
    try {
      displayOrderTable();
    } catch (TypeError) {}
  }
}
