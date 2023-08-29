//Declaration of variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxe");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let srByTitle = document.getElementById("srByTitle");
let srByCategory = document.getElementById("srByCategory");
let table = document.querySelector("table");
let tbody = document.getElementById("tbody");
let dltAll = document.getElementById("dltAll");
let mood = "create";
let j = 0;
// getTotale
getTotal = () => {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `${result} Dh`;
    total.style.background = "green";
  } else {
    total.innerHTML = "0 Dh";
    total.style.background = "red";
  }
};

//clear data
//save in LocalStorage
var tabP;
if (localStorage.product) tabP = JSON.parse(localStorage.product);
else tabP = [];

//create Product
submit.onclick = () => {
  let newObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    total: total.innerHTML,
    category: category.value,
  };
  if (
    title.value != "" && price.value != "" && taxes.value != "" && ads.value != "" && category.value != "") {
    if (mood == "create") {
      if (newObj.count > 1) {
        for (let j = 0; j < newObj.count; j++) {
          tabP.push(newObj);
        }
      } else tabP.push(newObj);
    } else {
      if (confirm("are you sure you want to UPDATE this Item ?")) {
        tabP[j] = newObj;
        mood = "create";
        submit.innerHTML = "Create";
        count.removeAttribute("disabled");
      }
    }
    clearData();
  } else alert("Please Enter All Informations");
  localStorage.setItem("product", JSON.stringify(tabP));
  showData();
};
//Clear Data
clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  getTotal();
};
//show Data
showData = () => {
  let result = "";
  for (let i = 0; i < tabP.length; i++) {
    result += `
      <tr>
      <td>${i + 1}</td>
      <td>${tabP[i].title}</td>
      <td>${tabP[i].price}</td>
      <td>${tabP[i].taxes}</td>
      <td>${tabP[i].ads}</td>
      <td>${tabP[i].discount}</td>
      <td>${tabP[i].total}</td>
      <td>${tabP[i].category}</td>
      <td> <button onclick="updateData(${i})">update</button> </td>
      <td><button onclick="deleteData(${i})">delete</button></td>
      </tr> `;
  }
  tbody.innerHTML = result;
  if (tabP.length > 0) {
    dltAll.style.display = "block";
    dltAll.innerHTML = `Delete ALL(${tabP.length})`;
  }
};
showData();
//Delete Data individually
deleteData = (i) => {
  if (confirm("are you sure you wanna delete it ")) {
    tabP.splice(i, 1);
    localStorage.product = JSON.stringify(tabP);
    showData();
  }
};
//Delete All Data
deleteAll = () => {
  if (confirm("Are you sure you wannt to DELETTE ALL !!!!")) {
    tabP.splice(0);
    localStorage.clear();
    showData();
    dltAll.style.display = "none";
  }
};
//UpdateData
updateData = (i) => {
  j = i;
  title.value = tabP[i].title;
  price.value = tabP[i].price;
  taxes.value = tabP[i].taxes;
  ads.value = tabP[i].ads;
  discount.value = tabP[i].discount;
  category.value = tabP[i].ads;
  count.setAttribute("disabled", "");
  getTotal();
  submit.innerHTML = "Update";
  mood = "update";
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
};

let searchMood = "Title";

searchById = (id) => {
  if (id == "srByTtile") searchMood = "Title";
  else {
    searchMood = "Category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
};
//Search Data
searchData = (val) => {
  let tab = "";
  for (let i = 0; i < tabP.length; i++) {
    if (searchMood == "Title") {
      if (tabP[i].title.includes(val)) {
        tab += `
  <tr>
  <td>${i + 1}</td>
  <td>${tabP[i].title}</td>
  <td>${tabP[i].price}</td>
  <td>${tabP[i].taxes}</td>
  <td>${tabP[i].ads}</td>
  <td>${tabP[i].discount}</td>
  <td>${tabP[i].total}</td>
  <td>${tabP[i].category}</td>
  <td> <button onclick="updateData(${i})">update</button> </td>
  <td><button onclick="deleteData(${i})">delete</button></td>
  </tr> `;
      }
    } else {
      if (tabP[i].category.includes(val)) {
        tab += `
  <tr>
  <td>${i + 1}</td>
  <td>${tabP[i].title}</td>
  <td>${tabP[i].price}</td>
  <td>${tabP[i].taxes}</td>
  <td>${tabP[i].ads}</td>
  <td>${tabP[i].discount}</td>
  <td>${tabP[i].total}</td>
  <td>${tabP[i].category}</td>
  <td> <button onclick="updateData(${i})">update</button> </td>
  <td><button onclick="deleteData(${i})">delete</button></td>
  </tr> `;
      }
    }
    tbody.innerHTML = tab;
  }
};
