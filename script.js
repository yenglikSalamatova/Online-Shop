const dom = {
  title: document.getElementById("add-new__name"),
  price: document.getElementById("add-new__price"),
  description: document.getElementById("add-new__description"),
};

let products = JSON.parse(localStorage.getItem("products")) || [];

// Отслеживание клика по кнопке Добавить товар
const addNewBtn = document.querySelector(".btn");
addNewBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const productValue = dom.title.value;
  if (productValue) {
    let productExists = false;
    products.forEach((product) => {
      if (product.title === productValue) {
        alert("Такой товар уже существует");
        productExists = true;
      }
    });
    if (!productExists) {
      const timestamp = Date.now();
      const product = {
        id: timestamp,
        title: productValue,
        price: dom.price.value,
        description: dom.description.value,
        isAvalible: true,
      };
      products.push(product);
      console.log(products);
      renderProduct(product);
      localStorage.setItem("products", JSON.stringify(products));
      dom.title.value = "";
      dom.price.value = "";
      dom.description.value = "";
    }
  }
});

// Функция создания отдельного блока продукта
function renderProduct(product) {
  const allProducts = document.querySelector(".products");
  const oneProduct = document.createElement("div");
  const productTitle = document.createElement("h3");
  const productPrice = document.createElement("span");
  const productDescription = document.createElement("p");
  const buttonGroup = document.createElement("div");
  const buttonDelete = document.createElement("button");
  const buttonNotAvalible = document.createElement("button");
  oneProduct.classList.add("product");
  oneProduct.id = product.id;
  productPrice.classList.add("product-price");
  productDescription.classList.add("product-description");
  buttonDelete.classList.add("btn-delete");
  buttonNotAvalible.classList.add("btn-notavalib");
  buttonGroup.classList.add("product-btns");
  productTitle.textContent = product.title;
  productPrice.textContent = product.price + " тг";
  productDescription.textContent = product.description;
  buttonDelete.textContent = "Удалить";
  buttonNotAvalible.textContent = "Нет в наличии?";
  allProducts.append(oneProduct);
  oneProduct.append(productTitle);
  oneProduct.append(productDescription);
  oneProduct.append(productPrice);
  oneProduct.append(buttonGroup);
  buttonGroup.append(buttonDelete);
  buttonGroup.append(buttonNotAvalible);

  // Рендер статуса нет в наличии из локального хранилища
  if (!product.isAvalible) {
    oneProduct.classList.add("product--notavalib");
    buttonNotAvalible.classList.add("btn-notavalib--active");
    product.isAvalible = false;
    buttonNotAvalible.textContent = "Нет в наличии";
  }
  // Добавление кнопки "Удалить"
  buttonDelete.addEventListener("click", function () {
    const productId = Number(oneProduct.id);
    const index = products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      products.splice(index, 1);
      localStorage.setItem("products", JSON.stringify(products));
    }
    oneProduct.remove();
    console.log(products);
  });

  // Добавление нет в наличии
  buttonNotAvalible.addEventListener("click", function () {
    if (product.isAvalible === true) {
      oneProduct.classList.add("product--notavalib");
      buttonNotAvalible.classList.add("btn-notavalib--active");
      product.isAvalible = false;
      buttonNotAvalible.textContent = "Нет в наличии";
    } else {
      oneProduct.classList.remove("product--notavalib");
      buttonNotAvalible.classList.remove("btn-notavalib--active");
      product.isAvalible = true;
    }
    localStorage.setItem("products", JSON.stringify(products));
  });
}
// Если в локальном хранении уже сохранены продукты
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
  products.forEach((product) => {
    renderProduct(product);
  });
}
