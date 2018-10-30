//1.结构的初始化   //2.订单状态   //3.支付方式      //4.总价     //5.返回按钮
//1.结构的初始化     //2.订单状态   //3.支付方式 
var ul = document.getElementsByClassName("order_list")[0];
var user = JSON.parse(localStorage.getItem("current")).username;
var pay = JSON.parse(localStorage.getItem("pay"));
var orderpos = document.getElementById("middle").getElementsByTagName("li")[1].getElementsByTagName("p")[1];//订单状态
var paypos = document.getElementById("middle").getElementsByTagName("ul")[1].getElementsByTagName("p")[1];//支付状态
//[{"user":"zxn","img":"img/i_s_2.png","price":"3450.00","number":"2","state":"failure"},{"user":"zxn","img":"img/i_s_9.png","price":"3450.00","number":"3","state":"failure"}]
for(var i=0;i<pay.length;i++){
	var index = false;
	if((pay[i].user == user)&&(pay[i].state == "success")){
		var img = pay[i].img;
		var price = pay[i].price;
		var number = pay[i].number;
		init(ul,img,price,number);
		index = true;		
	}
}
if(index){
	orderpos.innerText = "已付款";
	paypos.innerText = "在线支付";
}
if(!index){
	for(var i=0;i<pay.length;i++){
		var index = false;
		if(pay[i].user == user){
			var img = pay[i].img;
			var price = pay[i].price;
			var number = pay[i].number;
			init(ul,img,price,number);
			index = true;		
		}
	}
	orderpos.innerText = "未付款";
	paypos.innerText = "未支付";
}


//4.总价
var total1 = document.getElementById("middle").getElementsByTagName("dl")[1].getElementsByTagName("dd")[0];
var total2 = document.querySelector("#middle>div>div>p:nth-of-type(2)>span:nth-of-type(2)>span:last-child");
var liList = ul.getElementsByTagName("li");
var totalPrice = 0;
for (var i=0;i<liList.length;i++) {
	var span = liList[i].getElementsByTagName("p")[2].getElementsByTagName("span")[0].innerText;
	var price = span.slice(1,span.length);
	var p = liList[i].getElementsByTagName("p")[3].innerText;
	var num = p.slice(1,p.length);
	totalPrice = totalPrice + parseInt(num)*parseInt(price);
	console.log(price+"fferf"+num);
}
total1.innerText = "¥"+totalPrice+".00";
total2.innerText = "¥"+totalPrice+".00";
//5.返回按钮
var back = document.getElementById("middle").getElementsByTagName("button")[0]
back.onclick = function(){
	window.history.back();
}
//方法
//（1）初始化
function init(ul,img,price,number){
	var li = document.createElement("li");
	var a1 = document.createElement("a");
	a1.setAttribute("href","pro_details.html");
	var img1 = document.createElement("img");
	img1.setAttribute("src",img);
	a1.appendChild(img1);
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
	var text2 = document.createTextNode("加里曼丹 10mm *19颗 8克");
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
	var text5 = document.createTextNode("¥"+price);
	span5.appendChild(text5);
	p3.appendChild(span5);
	var span6 = document.createElement("span");
	var text6 = document.createTextNode("0.8kg");
	span6.appendChild(text6);
	p3.appendChild(span6);
	li.appendChild(p3);
	
	var p4 = document.createElement("p");
	var text7 = document.createTextNode("X"+number);
	p4.appendChild(text7);
	li.appendChild(p4);
	
	var p5 = document.createElement("p");
	var text8 = document.createTextNode("有货");
	p5.appendChild(text8);
	li.appendChild(p5);
	ul.appendChild(li);
}
