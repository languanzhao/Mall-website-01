var imgBig = document.getElementById("middle").getElementsByTagName("img")[0];//大图
var imgLeft = document.getElementById("middle").getElementsByTagName("div")[4].getElementsByTagName("img")[0];//左按钮
var imgRight = document.querySelector("#middle>div:nth-of-type(2)>img:nth-of-type(2)");//右按钮
var smallList = document.querySelector("#middle>div:nth-of-type(2)>div>ul").getElementsByTagName("li");//小图集合
var priceBlock = document.getElementById("middle").getElementsByTagName("span")[0];//商品价格

//数据初始化
init();



//1.鼠标滑过时图片进行切换
for (var i=0;i<smallList.length;i++) {
	smallList[i].onmousemove = function(){
		var imgSrc = this.getElementsByTagName("img")[0].getAttribute("src");
		imgBig.setAttribute("src",imgSrc);
	}
}

//2.左右按钮实现图片的更换
imgLeft.onclick = function(){
    var left = smallList[0].parentNode.style.left;
    if(parseInt(left)==""){
    	left=0;
    }
    if(parseInt(left)<0){
    	var newLeft = parseInt(left)+123;
    	animateLinear(smallList[0].parentNode,["left"],parseInt(left),newLeft,10);
    }
    
}
imgRight.onclick = function(){
    var left = smallList[0].parentNode.style.left;
    if(left == ""){
    	left=0;
    }
    if((-(smallList.length-3)*123)<(parseInt(left))){
    	var newLeft = parseInt(left)-123;
    	animateLinear(smallList[0].parentNode,["left"],parseInt(left),newLeft,10);
    }
    
}



var smallBlock = document.querySelector("#middle>div:nth-of-type(6)");//灰块
var bigBlock = document.querySelector("#middle>div:last-child");//放大块
var imgBlock = bigBlock.firstChild;//大块中的图片
var middle = document.getElementById("middle");
var header = document.getElementById("header");
var imgList = document.querySelector("#middle>div:nth-of-type(2)");
var ul = document.querySelector("#middle>ul");
//3.放大镜
imgBig.onmouseover = function(event){
	bigSrc = imgBig.getAttribute("src");
	imgBlock.setAttribute("src",bigSrc);
	smallBlock.style.display = "block";
	bigBlock.style.display = "block";
	event = event || window.event;
	var mouX = event.clientX;
	var mouY = event.clientY;
	//var newLeft = mouX-middle.offsetLeft-(this.offsetWidth/2);
	var newLeft = mouX-imgBig.getBoundingClientRect().left-(this.offsetWidth/2);
	var newTop = mouY-imgBig.getBoundingClientRect().top-(this.offsetWidth/2)+50;
	if(newLeft<0){
		smallBlock.style.left = 0+"px";
	}else if(newLeft>235.5){
		smallBlock.style.left = 235+"px";
	}else{
		smallBlock.style.left = newLeft+"px";
	}

	if(newTop<50){
		smallBlock.style.top = 50+"px";
	}else if(newTop>287){
		smallBlock.style.top = 287+"px";
	}else{
		smallBlock.style.top = newTop+"px";
	}
//	console.log("left"+smallBlock.style.left+"top"+smallBlock.style.top);
	//大图中的移动
	imgBlock.style.left = (parseInt(smallBlock.style.left)*(-2))+"px";
	imgBlock.style.top = (parseInt(smallBlock.style.top)*(-2)+100)+"px";
}
imgBig.onmousemove = function(event){
	console.log("大图");
	event = event || window.event;
	var mouX = event.clientX;
	var mouY = event.clientY;
	//var newLeft = mouX-middle.offsetLeft-(this.offsetWidth/2);
	var newLeft = mouX-imgBig.getBoundingClientRect().left-(smallBlock.offsetWidth/2);
//	console.log(newLeft);
	var newTop = mouY-imgBig.getBoundingClientRect().top-(smallBlock.offsetWidth/2)+50;
	if(newLeft<0){
		smallBlock.style.left = 0+"px";
	}else if(newLeft>235.5){
		smallBlock.style.left = 235+"px";
	}else{
		smallBlock.style.left = newLeft+"px";
	}
//  console.log(newTop);
	if(newTop<47){
		smallBlock.style.top = 47+"px";
	}else if(newTop>287){
		smallBlock.style.top = 287+"px";
	}else{
		smallBlock.style.top = newTop+"px";
	}
	//console.log("left"+this.style.left+"top"+this.style.top);
	//大图中的移动
	imgBlock.style.left = (parseInt(smallBlock.style.left)*(-2))+"px";
	imgBlock.style.top = (parseInt(smallBlock.style.top)*(-2)+100)+"px";
}
smallBlock.onmousemove = function(event){
	console.log("灰块");
	event = event || window.event;
	var mouX = event.clientX;
	var mouY = event.clientY;
	//var newLeft = mouX-middle.offsetLeft-(this.offsetWidth/2);
	var newLeft = mouX-imgBig.getBoundingClientRect().left-(this.offsetWidth/2);
	var newTop = mouY-imgBig.getBoundingClientRect().top-(this.offsetWidth/2)+50;
	if(newLeft<0){
		smallBlock.style.left = 0+"px";
	}else if(newLeft>235.5){
		smallBlock.style.left = 235+"px";
	}else{
		smallBlock.style.left = newLeft+"px";
	}
//  console.log(newTop);
	if(newTop<47){
		smallBlock.style.top = 47+"px";
	}else if(newTop>287){
		smallBlock.style.top = 287+"px";
	}else{
		smallBlock.style.top = newTop+"px";
	}
	//console.log("left"+this.style.left+"top"+this.style.top);
	//大图中的移动
	imgBlock.style.left = (parseInt(smallBlock.style.left)*(-2))+"px";
	imgBlock.style.top = (parseInt(smallBlock.style.top)*(-2)+100)+"px";
}
smallBlock.onmouseout = function(){
    smallBlock.style.display = "none";
    bigBlock.style.display = "none";
}
//
//imgBig.onmouseout = function(){
//  smallBlock.style.display = "none";
//  bigBlock.style.display = "none";
//}
	

//4.数量的增减
var add = document.getElementById("middle").getElementsByTagName("div")[2].getElementsByTagName("p")[0];
var reduce = document.getElementById("middle").getElementsByTagName("div")[2].getElementsByTagName("p")[1];
var num = document.getElementById("middle").getElementsByTagName("div")[2].getElementsByTagName("input")[0];

add.onclick = function(){
	++num.value;
}

reduce.onclick = function(){
	if(num.value<=1){
		num.value=1;
	}else{
		--num.value;
	}
}


//5.文本框中内容的判断
num.onchange = function(){
	if(isNaN(num.value)){
		num.value=1;
	}else{
		num.value = parseInt(num.value)>1?parseInt(num.value):1;
	}
}


//6.购买和购物车按钮的跳转 ,数据的存储
var buy = document.querySelector("#middle>div:first-of-type>div:nth-of-type(3)>p:first-child");
var cart = document.querySelector("#middle>div:first-of-type>div:nth-of-type(3)>p:nth-of-type(2)");
var current = JSON.parse(localStorage.getItem("current"));
var procur = JSON.parse(localStorage.getItem("procur"));
buy.onclick = function(){
	if(current==null){
		alert("请先登录！");
		location.href = "login.html";
	}else if(!select()){
		return;
	}else{

		var img = procur.src;
		
		//var img = imgBig.getAttribute("src");
		var index =  priceBlock.innerText.indexOf("¥");
		var price =  priceBlock.innerText.slice(index+2,priceBlock.innerText.length);
		var number = num.value;
		var user = current.username;
		var info = {"user":user,"img":img,"price":price,"number":number};
		var order = JSON.parse(localStorage.getItem("buynow"));
		if(order == null){
			order = [];
		}
		for (var i=0;i<order.length;i++) {
			if(order[i].user==user&&order[i].img==img){
				order[i].number =parseInt(order[i].number)+ parseInt(number);
				localStorage.setItem("buynow",JSON.stringify(order));
		        location.href = "comfirm_order.html";
		        return;
			}
		}				
		order.push(info);
		localStorage.setItem("buynow",JSON.stringify(order));
		localStorage.setItem("curtype","buy");
		location.href = "comfirm_order.html";
	}
}

cart.onclick = function(){
	if(current==null){
		alert("请先登录！");
		location.href = "login.html";
	}else if(!select()){
		return;
	}else{
		var img = procur.src;
		//var img = imgBig.getAttribute("src");
		var index =  priceBlock.innerText.indexOf("¥");
		var price =  priceBlock.innerText.slice(index+2,priceBlock.innerText.length);
		var number = num.value;
		var user = current.username;
		var info = {"user":user,"img":img,"price":price,"number":number};
		var cart = JSON.parse(localStorage.getItem("cart"));
		if(cart == null){
			cart = [];
		}	
		for (var i=0;i<cart.length;i++) {
			if(cart[i].user==user&&cart[i].img==img){
				cart[i].number =parseInt(cart[i].number)+ parseInt(number);
				localStorage.setItem("cart",JSON.stringify(cart));
				localStorage.setItem("curtype","cart");
				alert("已成功加入购物车！");
				location.href = "pro_details.html";
		        return;
			}
		}
		cart.push(info);
		localStorage.setItem("cart",JSON.stringify(cart));
		localStorage.setItem("curtype","cart");
		alert("已成功加入购物车！");
		location.href = "pro_details.html";
	}
}



//7.款式和分期的选择
var type = document.querySelector("#middle>div>dl:nth-of-type(2)").getElementsByTagName("dd");
var stage = document.querySelector("#middle>div>dl:nth-of-type(3)").getElementsByTagName("dd");

for (var i=0;i<type.length;i++) {
	type[i].onclick = function(){
		for (var j=0;j<type.length;j++) {
			type[j].removeAttribute("class");
		}
		this.setAttribute("class","active");		
	}
}
for (var i=0;i<stage.length;i++) {
	stage[i].onclick = function(){
		for (var j=0;j<stage.length;j++) {
			stage[j].removeAttribute("class");
		}
		this.setAttribute("class","active");		
	}
}

//跳转到商品评价页
var comment = document.querySelector("#middle>div:nth-of-type(3)>div>ul>li:nth-of-type(2)>a");
var first = document.querySelector("#middle>div:nth-of-type(3)");
var second = document.querySelector("#middle>div:nth-of-type(4)");
comment.onclick = function(){
	second.style.display = "block";
	first.style.display = "none";
}
var pro_detail = document.querySelector("#middle>div:nth-of-type(4)>div>ul>li:nth-of-type(1)>a");
pro_detail.onclick = function(){
	second.style.display = "none";
	first.style.display = "block";
}





//方法
//1.初始化
function init(){
	var procur = JSON.parse(localStorage.getItem("procur"));
	if(procur==null){
		return;
	}else{
		console.log(procur);
		var price = procur.price;
		//imgBig.setAttribute("src",src);
		priceBlock.innerText = "价格 ¥ "+price;
	}
	
}
//判断是否选择了款式和分期
function select(){
	var a = b = false;
	for (var i=0;i<type.length;i++) {		
		if(type[i].hasAttribute("class")){
			a=true;
			break;
		}
	}
	for (var j=0;j<stage.length;j++) {		
		if(stage[j].hasAttribute("class")){
			b=true;
			break;
		}
	}
	if (a && b) {
		return true;
	}else if(!(a || b)){
		alert("请选择款式和分期！");
		return false;
	}else if(!b){
		alert("请选择分期！");
		return false;
	}else if(!a){
		alert("请选择款式！");
		return false;
	}
}
















