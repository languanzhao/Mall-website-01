
//1.结构的形成
var user = JSON.parse(localStorage.getItem("current")).username;
var orderList = document.getElementsByClassName("order_list")[0];
var buyNow = JSON.parse(localStorage.getItem("buynow"));
var curtype = localStorage.getItem("curtype"); 
console.log(curtype);
if(buyNow!=null){
	var len = buyNow.length;
	if (curtype == "buy") {
		var img = buyNow[len-1].img;
		var price = buyNow[len-1].price;
		var num = buyNow[len-1].number;
		var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
		init(orderList,num,price,img);
	} else{
		for (var i=0;i<len;i++) {
			if((buyNow[i].user == user) && (buyNow[i].state == null||buyNow[i].state == "no")){
				var img = buyNow[i].img;
				var price = buyNow[i].price;
				var num = buyNow[i].number;
				var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
				init(orderList,num,price,img);
			}			
		}
	}				
}else{
	orderList.innerHTML = "<p>您暂时还没有订单,欢迎您的购物喔 ^ _ ^</p>";
}
var numberTot = document.querySelector("#middle>div:nth-of-type(2)>p:nth-of-type(2)>span:nth-of-type(1)");
var numList = document.querySelectorAll(".order_list>li>p:nth-of-type(4)");
var sum = 0;
var total1 = document.querySelector("#middle>dl>dd:first-of-type");//总价
var total2 = document.querySelector("#middle>p:nth-of-type(4)>span:nth-of-type(2)>span:last-child");//总价
for (var i=0;i<numList.length;i++) {
	var text = numList[i].innerText;
	var number = text.slice(1,text.length);
	sum = parseInt(number) + sum;
}
numberTot.innerText = "活动商品已购买"+sum+"件（已减 ";
var checkList = document.getElementsByClassName("order_list")[0].getElementsByTagName("input");
var total = 0;
for (var i=0;i<checkList.length;i++) {
	checkList[i].onclick = function(){
		var numNode = this.parentNode.getElementsByTagName("p")[3];
		var num = numNode.innerText.slice(1,numNode.innerText.length);
		var priceNode = this.parentNode.getElementsByTagName("span")[4];
		var price = priceNode.innerText.slice(1,priceNode.innerText.length);
		var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
		if(this.checked){
			this.parentNode.setAttribute("class","active");
			total = total + parseInt(totalPrice);
		}else{
			this.parentNode.removeAttribute("class");
			total = total - parseInt(totalPrice);
		}
	total1.innerText = "¥"+total+".00";
    total2.innerText = "¥"+total+".00";
	}
	
}



//2.提交按钮-----数据存储
var pay = document.querySelector("#middle>button");
pay.onclick = function(){
	var index = 0;
	var payList = JSON.parse(localStorage.getItem("pay"));
	if(payList == null){
		payList = [];
	}
	var buyNow = JSON.parse(localStorage.getItem("buynow"));	
	for (var i=0;i<checkList.length;i++) {
		if(checkList[i].checked){
			var src = checkList[i].parentNode.getElementsByTagName("img")[0].getAttribute("src");
					
			for(var j=0;j<buyNow.length;j++){
				if((buyNow[j].user == user)&&(buyNow[j].img == src)){
					var newpay = new Object();
					newpay = buyNow[j];
					newpay["state"] = "no";
					payList.push(newpay);
					buyNow.splice(j,1);	
					index = 1;
					break;
				}				
			}
		}
	}
	if (index != 1) {
		alert("请选择你要支付的商品！");
		return;
	}else{	
		localStorage.setItem("buynow",JSON.stringify(buyNow));
		localStorage.setItem("pay",JSON.stringify(payList));
		location.href = "pay.html";
	}
	
}


//方法
//初始化
function init(ul,num,price,img){
	var li = document.createElement("li");
	var input = document.createElement("input");
	input.setAttribute("type","checkbox");
	li.appendChild(input);
	
	var a = document.createElement("a");
	a.setAttribute("href","pro_details.html");
	var img1 = document.createElement("img");
	img1.setAttribute("src",img);
	a.appendChild(img1);
	li.appendChild(a);
	
	var p = document.createElement("p");
	var span1 = document.createElement("span");
	var a1 = document.createElement("a");
	a1.setAttribute("href","pro_details.html"); 
	var text1 = document.createTextNode("【世纪沉香坊】");
	a1.appendChild(text1);
	span1.appendChild(a1);
	p.appendChild(span1);
	var span2 = document.createElement("span");
	var text2 = document.createTextNode("加里曼丹 10mm *19颗 8克");
	span2.appendChild(text2);
	p.appendChild(span2);
	li.appendChild(p);
	
	var p1 = document.createElement("p");
	var span3 = document.createElement("span");
	var text3 = document.createTextNode("颜色：棕色");
	span3.appendChild(text3);
	p1.appendChild(span3);
	var span4 = document.createElement("span");
	var text4 = document.createTextNode("规格：10MM");
	span4.appendChild(text4);
	p1.appendChild(span4);
	li.appendChild(p1);
	
	var p2 = document.createElement("p");
	var span5 = document.createElement("span");
	var text5 = document.createTextNode("¥ "+price);
	span5.appendChild(text5);
	p2.appendChild(span5);
	var span6 = document.createElement("span");
	var text6 = document.createTextNode("0.8kg");
	span6.appendChild(text6);
	p2.appendChild(span6);
	li.appendChild(p2);
	
	var p3 = document.createElement("p");
	var text7 = document.createTextNode("X"+num);
	p3.appendChild(text7);
	li.appendChild(p3);
	
	var p4 = document.createElement("p");
	var text8 = document.createTextNode("有货");
	p4.appendChild(text8);
	li.appendChild(p4);
	
	ul.appendChild(li); 
}
