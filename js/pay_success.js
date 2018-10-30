//价格的显示
var price = document.getElementsByClassName("active")[0];
var total = JSON.parse(localStorage.getItem("totalprice")).total;
price.innerText = total;
