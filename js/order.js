//1.结构的初始化
var user = JSON.parse(localStorage.getItem("current")).username;
var orderList = document.getElementsByClassName("order_list")[0];
var buyNow = JSON.parse(localStorage.getItem("buynow"));
var pay = JSON.parse(localStorage.getItem("pay"));
console.log(pay);
var buttonAll = document.querySelector("#middle>div>ol:first-of-type");
if(buyNow!=null){
	for (var i=0;i<buyNow.length;i++) {
		if((buyNow[i].user == user)){
			var img = buyNow[i].img;
			var price = buyNow[i].price;
			var num = buyNow[i].number;
			var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
			console.log("buy");
			init(orderList,img,totalPrice);
		}			
	}
}
if(pay!=null){
	for (var i=0;i<pay.length;i++) {
		if((pay[i].user == user)){
			var img = pay[i].img;
			var price = pay[i].price;
			var num = pay[i].number;
			var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
			console.log("pay");
			init(orderList,img,totalPrice);
		}			
	}
}
//消失的按钮和复选框
buttonAll.style.display = "none";
var checkBoxList = document.querySelectorAll(".order_list>li>input");
for (var i=0;i<checkBoxList.length;i++) {
	checkBoxList[i].style.display = "none";
}		
if(orderList.innerHTML == ""){
	orderList.innerHTML = "<p>您暂时还没有订单,欢迎您的购物喔 ^ _ ^</p>";
}
	

    
//选项卡内容的切换
var contentList = document.querySelectorAll("#middle>div>ul:first-child>li");
for (var i=0;i<contentList.length-1;i++) {
	contentList[i].index = i;
	contentList[i].onclick = function(){
		for (var j=0;j<contentList.length;j++) {
			contentList[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
		console.log(this.index);
		if(this.index == 1){
			orderList.innerHTML = "";
			if(buyNow!=null){
				for (var i=0;i<buyNow.length;i++) {
					if((buyNow[i].user == user)){
						var img = buyNow[i].img;
						var price = buyNow[i].price;
						var num = buyNow[i].number;
						var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
						console.log("buy");
						init(orderList,img,totalPrice);
					}			
				}
			}
			if(pay!=null){
				for (var i=0;i<pay.length;i++) {
					if((pay[i].user == user)&&(pay[i].state =="failure")){
						var img = pay[i].img;
						var price = pay[i].price;
						var num = pay[i].number;
						var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
						console.log("pay");
						init(orderList,img,totalPrice);
					}			
				}
			}
			
			console.log(orderList)
			if(orderList.innerHTML == ""){
				orderList.innerHTML = "<p>您暂时还没有待支付的订单,欢迎您再次购物喔 ^ _ ^</p>";
			}

			//消失的按钮和复选框
			buttonAll.style.display = "block";
			var checkBoxList = document.querySelectorAll(".order_list>li>input");
			for (var i=0;i<checkBoxList.length;i++) {
				checkBoxList[i].style.display = "block";
			}
						//3.复选框的实现  （背景颜色）
			var checkboxList = orderList.getElementsByTagName("input");
			for (var i=0;i<checkboxList.length;i++) {
				checkboxList[i].onclick = function(){
					if(this.checked){
						this.parentNode.setAttribute("class","active");
					}else{
						this.parentNode.removeAttribute("class");
					}
				}
			}
		}else if(this.index == 2){
			orderList.innerHTML = "";
			if(pay!=null){
				console.log(pay);
				for (var i=0;i<pay.length;i++) {
					console.log(pay[i].state);
					if((pay[i].user == user)&&(pay[i].state == "success")){
						var img = pay[i].img;
						var price = pay[i].price;
						var num = pay[i].number;
						var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
						init(orderList,img,totalPrice);
					}			
				}
			}
			
			console.log(orderList.innerHTML);
			if(orderList.innerHTML == ""){
				orderList.innerHTML = "<p>您暂时还没有待收货的订单,欢迎您再次购物喔 ^ _ ^</p>";
			}
			//消失的按钮和复选框
			buttonAll.style.display = "none";
			var checkBoxList = document.querySelectorAll(".order_list>li>input");
			for (var i=0;i<checkBoxList.length;i++) {
				checkBoxList[i].style.display = "none";
			}
		}else if(this.index == 0){
			orderList.innerHTML = "";
			if(buyNow!=null){
				for (var i=0;i<buyNow.length;i++) {
					if((buyNow[i].user == user)){
						var img = buyNow[i].img;
						var price = buyNow[i].price;
						var num = buyNow[i].number;
						var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
						console.log("buy");
						init(orderList,img,totalPrice);
					}			
				}
			}
			if(pay!=null){
				for (var ii=0;ii<pay.length;ii++) {
					if((pay[ii].user == user)){
						var img = pay[ii].img;
						var price = pay[ii].price;
						var num = pay[ii].number;
						var totalPrice = (parseInt(price)*parseInt(num)).toFixed(2);
						console.log("pay");
						init(orderList,img,totalPrice);
					}			
				}
			}
			
			if(orderList.innerHTML == ""){
				orderList.innerHTML = "<p>您暂时还没有订单,欢迎您再次购物喔 ^ _ ^</p>";
			}
			//消失的按钮和复选框
			buttonAll.style.display = "none";
			var checkBoxList = document.querySelectorAll(".order_list>li>input");
			for (var iii=0;iii<checkBoxList.length;i++) {
				checkBoxList[iii].style.display = "none";
			}
		}
	}
}



//2.删除的实现
var delList = document.querySelectorAll(".order_list>li>p:nth-of-type(4)>span:first-child");
for (var i=0;i<delList.length;i++) {
	delList[i].index = i;
	delList[i].onclick = function(){
		var index = confirm("真的要删除该订单吗？");
		if (index) {
			var imgC = this.parentNode.parentNode.getElementsByTagName("img")[0];
	        var src = imgC.getAttribute("src");
	        var buyNow = JSON.parse(localStorage.getItem("buynow"));
	        for (var j=0;j<buyNow.length;j++) {
	        	if((buyNow[j].img == src) && (buyNow[j].user == user)){
	        		buyNow.splice(j,1);
	        		localStorage.setItem("buynow",JSON.stringify(buyNow));
	        		break;
	        	}
	        }
	
		    var li = orderList.getElementsByTagName("li")[this.index];
			orderList.removeChild(li);
		} else{
			return;
		}
		
	}
}




//4.删除订单
var delOrder = document.getElementsByTagName("ol")[0].getElementsByTagName("li")[0];
delOrder.onclick = function(){
	var buyNow = JSON.parse(localStorage.getItem("buynow"));
	for (var i=0;i<buyNow.length;i++) {
		if(buyNow[i].user == user){
			buyNow.splice(i,1);
			i = -1;
		}
	}
	localStorage.setItem("buynow",JSON.stringify(buyNow));
	
	var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
	for (var j=0;j<liList.length;j++) {
		orderList.removeChild(liList[i]);
		j = -1;
	}
	alert("已取消该订单！");
}

//5.数据存储

var paybtn = document.getElementsByTagName("ol")[0].getElementsByTagName("li")[2];
paybtn.onclick = function(){
	var index = 0;
	var payList = JSON.parse(localStorage.getItem("pay"));
	if(payList == null){
		payList = [];
	}
	var buyNow = JSON.parse(localStorage.getItem("buynow"));	
	var checkboxList = document.querySelectorAll(".order_list>li>input");
	if(checkboxList!=null){
		for (var k=0;k<checkboxList.length;k++) {
			if(checkboxList[k].checked){
				var src = checkboxList[k].parentNode.getElementsByTagName("img")[0].getAttribute("src");						
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
				for (var i=0;i<payList.length;i++) {
					if((payList[j].user == user)&&(payList[j].img == src)){
						index = 1;
					}
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
function init(ul,src,price){
	var li = document.createElement("li");
	var input = document.createElement("input");
	input.setAttribute("type","checkbox");//复选框
	li.appendChild(input);
	
	var a1 = document.createElement("a");
	a1.setAttribute("href","pro_details.html");
	var img = document.createElement("img");
	img.setAttribute("src",src);//修改
	a1.appendChild(img);
	li.appendChild(a1);
	
	var p1 = document.createElement("p");
	var span1 = document.createElement("span");
	var a2 = document.createElement("a");
	a2.setAttribute("href","pro_details.html");
	var text1 = document.createTextNode("【世纪沉香坊】");
	a2.appendChild(text1);
	span1.appendChild(a2);
	p1.appendChild(span1);
	var span2 = document.createElement("span");
	var text2 = document.createTextNode("达拉干 16mm *14颗   30克");
	span2.appendChild(text2);
	p1.appendChild(span2);
	li.appendChild(p1);
	
	var p2 = document.createElement("p");
	var span3 = document.createElement("span");
	var text3 = document.createTextNode("颜色：棕色");
	span3.appendChild(text3);
	p2.appendChild(span3);
	var span4 = document.createElement("span");
	var text4 = document.createTextNode("规格：10MM");
	span4.appendChild(text4);
	p2.appendChild(span4);
	li.appendChild(p2);
	
	var p3 = document.createElement("p");
	var span5 = document.createElement("span");
	var text5 = document.createTextNode("¥ "+price);//修改
	span5.appendChild(text5);
	p3.appendChild(span5);
	var span6 = document.createElement("span");
	var text6 = document.createTextNode("0.8kg");
	span6.appendChild(text6);
	p3.appendChild(span6);
	li.appendChild(p3);
	
	var p4 = document.createElement("p");
	var span7 = document.createElement("span");
	var a3 = document.createElement("a");
	a3.setAttribute("href","javascript:void(0)");
	var text7 = document.createTextNode("删除");
	a3.appendChild(text7);
	span7.appendChild(a3);
	p4.appendChild(span7);
	var span8 = document.createElement("span");
	var a4 = document.createElement("a");
	a4.setAttribute("href","javascript:void(0)");
	var text8 = document.createTextNode("移到我的关注");
	a4.appendChild(text8);
	span8.appendChild(a4);
	p4.appendChild(span8);
	li.appendChild(p4);
	ul.appendChild(li);
}
