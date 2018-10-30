//1.初始化结构
var ul = document.getElementsByClassName("order_list")[0];
var user = JSON.parse(localStorage.getItem("current")).username;
var cart = JSON.parse(localStorage.getItem("cart"));
if (cart!= null) {
	for (var i=0;i<cart.length;i++) {
		if(cart[i].user == user){
			var img = cart[i].img;
			var price = cart[i].price;
			var num = cart[i].number;
			var total = (parseInt(price)*parseInt(num)).toFixed(2);
			init(ul,img,price,num,total);
		}
	}
} else{
	ul.innerHTML = "<p>您的购物车上暂时还没有商品喔,把喜欢的商品加到购物车上吧 ^ _ ^</p>";
}



//2.全部商品的数量 （方法）
var numPos = document.getElementById("middle").getElementsByTagName("p")[0];
totalnum();
//3.全选按钮的实现 （已选择商品的数量也要改变（方法），总价（方法））
var checkAll = document.getElementById("middle").getElementsByTagName("input")[0];//全选复选按钮
var all = document.getElementsByTagName("ol")[0].getElementsByTagName("span")[0];
var numselect = document.getElementsByTagName("ol")[0].getElementsByTagName("li")[5].getElementsByTagName("span")[0];
console.log(all);
var priceselect = document.getElementsByTagName("ol")[0].getElementsByTagName("li")[4].getElementsByTagName("span")[0];
checkAll.onclick = function(){
	if(this.checked){
		var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
		var num = 0;
		var price = 0;
		for(var i=0;i<liList.length;i++){
			var check = liList[i].getElementsByTagName("input")[0];
			check.checked = "checked";
			check.parentNode.setAttribute("class","active");
			num = parseInt(num) + parseInt(pronum(liList[i]));
			price = parseInt(price) + parseInt(prototal(liList[i]));
		}
		numselect.innerText = "已选择"+num+"件商品     总价： ";
		priceselect.innerText = "¥"+price+".00";
	}else{
		var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
		for(var i=0;i<liList.length;i++){
			var check = liList[i].getElementsByTagName("input")[0];
			check.checked = false;
			check.parentNode.removeAttribute("class");
		}
		numselect.innerText = "已选择0件商品     总价： ";
		priceselect.innerText = "¥0.00";
	}
	
}

all.onclick = function(){
	var index = checkAll.checked;
	console.log(index);
	if (!index) {
		checkAll.checked = "checked";
		var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
		var num = 0;
		var price = 0;
		for(var i=0;i<liList.length;i++){
			var check = liList[i].getElementsByTagName("input")[0];
			check.checked = "checked";
			check.setAttribute("class","active");
			num = parseInt(num) + parseInt(pronum(liList[i]));
			price = parseInt(price) + parseInt(prototal(liList[i]));
		}
		numselect.innerText = "已选择"+num+"件商品     总价： ";
		priceselect.innerText = "¥"+price+".00";
	} else{
		checkAll.checked = false;
		var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
		for(var i=0;i<liList.length;i++){
			var check = liList[i].getElementsByTagName("input")[0];
			check.checked = false;
			check.removeAttribute("class");
		}
		numselect.innerText = "已选择0件商品     总价： ";
		priceselect.innerText = "¥0.00";
	}
	
}





//4.复选框的实现（已选择商品的数量也要改变，总价（方法）全选按钮可能要选上）
var liList = document.getElementsByClassName("order_list")[0].getElementsByTagName("li");
for(var i=0;i<liList.length;i++){
	var checkOnly = liList[i].getElementsByTagName("input")[0];
	checkOnly.onclick = function(){
		var index = 0;
	    var num = 0;
		var price = 0;
		if(this.checked){						
			this.parentNode.setAttribute("class","active");
		}else{			
			this.parentNode.removeAttribute("class");
			checkAll.checked = false;
		}
		for(var i=0;i<liList.length;i++){
			var check = liList[i].getElementsByTagName("input")[0];
			if(check.checked){
				index++;
				num = parseInt(num) + parseInt(pronum(liList[i]));
				price = parseInt(price) + parseInt(prototal(liList[i]));
			}		
	    }
		if(index == liList.length){
			checkAll.checked = "checked";
		}
		numselect.innerText = "已选择"+num+"件商品     总价： ";
		priceselect.innerText = "¥"+price+".00";
	}
}	
//5.数量的增减（文本框数据的变化    单种商品的总价     全部商品的数量  (不要用方法) 判断是否需要更新已选数量和总价   ）方法
for(var i=0;i<liList.length;i++){
	var reduce = liList[i].getElementsByTagName("button")[0];
	reduce.onclick = function(){
		var input = this.parentNode.getElementsByTagName("input")[0];
		var num = input.value;
		if(parseInt(num)>1){
			input.value = parseInt(num)-1;
			var reg = /\d{1,}/;
			var total = reg.exec(numPos.innerText);// = "全部商品（"+total+"）";
			total = parseInt(total)-1;
			numPos.innerText = "全部商品（"+total+"）";
			totalpro(this.parentNode.parentNode.parentNode);
			var check = this.parentNode.parentNode.parentNode.getElementsByTagName("input")[0];
			if(check.checked){
				update();
			}
		}
	}
	var add = liList[i].getElementsByTagName("button")[1];
	add.onclick = function(){
		var input = this.parentNode.getElementsByTagName("input")[0];
		var num = input.value;
		input.value = parseInt(num)+1;
		var reg = /\d{1,}/;
		var total = reg.exec(numPos.innerText);// = "全部商品（"+total+"）";
		total = parseInt(total)+1;
		numPos.innerText = "全部商品（"+total+"）";
		totalpro(this.parentNode.parentNode.parentNode);
		var check = this.parentNode.parentNode.parentNode.getElementsByTagName("input")[0];
		if(check.checked){
			update();
		}		
	}
}

//6.文本框的判断
for(var i=0;i<liList.length;i++){
	var input = liList[i].getElementsByTagName("input")[1];
	input.onchange = function(){
		if(isNaN(this.value)){
			this.value=1;
		}else{
			this.value = parseInt(this.value)>1?parseInt(this.value):1;
		}
		var li = this.parentNode.parentNode.parentNode;
		var num = 0;
		for(var j=0;j<liList.length;j++){
			var inputOnly = liList[j].getElementsByTagName("input")[1];
			num = num +parseInt(inputOnly.value);
		}
		numPos.innerText = "全部商品（"+num+"）";
		var check = li.getElementsByTagName("input")[0];
		totalpro(this.parentNode.parentNode.parentNode);
		if(check.checked){
			update();
		}
	}
}
//7.单个删除（全部商品的数量 （方法））
var cartnum = document.getElementsByClassName("cart")[0].getElementsByTagName("span")[1];//购物车上的数字
for(var i=0;i<liList.length;i++){
	var delOnly = liList[i].getElementsByTagName("p")[4].getElementsByTagName("span")[0];
	delOnly.onclick = function(){
		var index = confirm("是否真的要删除该商品？");
		if (index) {
			var li = delOnly.parentNode.parentNode;
			var input = li.getElementsByTagName("input")[1];
			var num = input.value;
			var reg = /\d{1,}/;
			var total = reg.exec(numPos.innerText);// = "全部商品（"+total+"）";
			total = parseInt(total)-parseInt(num);
			numPos.innerText = "全部商品（"+total+"）";
			del(this);
			var checkbox = li.getElementsByTagName("input")[0];
			if(checkbox.checked){
				update();
			}
			var index = 0;
			for(var i=0;i<liList.length;i++){
				var check = liList[i].getElementsByTagName("input")[0];
				if(check.checked){
					index++;
					num = parseInt(num) + parseInt(pronum(liList[i]));
					price = parseInt(price) + parseInt(prototal(liList[i]));
				}		
		    }
			if(index == liList.length){
				checkAll.checked = "checked";
			}
			var int = parseInt(cartnum.innerText.slice(1,cartnum.innerText.length-1))-1;
			cartnum.innerText = "（"+int+"）";
		} else{
			return;
		}						
	}
}
//8.批量删除（全部商品的数量 （方法））
var delbatch = document.getElementsByTagName("ol")[0].getElementsByTagName("span")[1];
delbatch.onclick = function(){
	var index2 = true;
	for(var i=0;i<liList.length;i++){
		var checkBox = liList[i].getElementsByTagName("input")[0];
		if(checkBox.checked){
			index2 = false;
			break;
		}
	}
	if(index2){
		alert("请先选中您要删除的商品！");
		return;
	}
	var index = confirm("是否真的要删除所选中商品？");
	if (index) {
		var num = 0;
		var reg = /\d{1,}/;
		var total = reg.exec(numPos.innerText);// = "全部商品（"+total+"）";
		var int = 0;
		for(var i=0;i<liList.length;i++){
			var input = liList[i].getElementsByTagName("input")[1];
			var checkBox = liList[i].getElementsByTagName("input")[0];
			if(checkBox.checked){
				int++;
			    num = num + parseInt(input.value);
			    var span = checkBox.parentNode.getElementsByTagName("p")[4].getElementsByTagName("span")[0];
			    del(span);
			    i--;
			}
		}	
		var text = cartnum.innerHTML;
		var sum = parseInt(text.slice(1,text.length-1))-int;
	    cartnum.innerText = "（"+sum+"）";
		total = parseInt(total)-parseInt(num);
		numPos.innerText = "全部商品（"+total+"）";
		numselect.innerText = "已选择0件商品     总价： ";
		priceselect.innerText = "¥0.00";
	} else{
		return;
	}
	
}
//9.数据存储 
var finish = document.querySelector("#middle>form>button");
finish.onclick = function(){
	var arr = [];
	var index = true;
	for(var i=0;i<liList.length;i++){
		var checkbox = liList[i].getElementsByTagName("input")[0];
		if(checkbox.checked){
			var li = checkbox.parentNode;
			var img1 = li.getElementsByTagName("img")[0].getAttribute("src");
			for (var i=0;i<cart.length;i++) {
				if((cart[i].user == user)&&(cart[i].img == img1)){
					cart.splice(i,1);
					localStorage.setItem("cart",JSON.stringify(cart));
				}				
			}
			var span = li.getElementsByTagName("p")[2].getElementsByTagName("span")[0];
			var price = span.innerText.slice(1,span.innerText.length);
			var input = li.getElementsByTagName("input")[1];
			var number = input.value;
			var state = "no";
			var obj = {"user":user,"img":img1,"price":price,"number":number,"state":state};
			arr.push(obj);
			index = false;
		}
	}
	if(index){
		alert("请选择需要支付的商品！");
		return;
	}
	//[{"user":"zxn","img":"img/i_s_2.png","price":"3450.00","number":"2","state":"yes"}]
	var pay = JSON.parse(localStorage.getItem("buynow"));
	if(pay==null){
		localStorage.setItem("buynow",JSON.stringify(arr));
		location.href = "comfirm_order.html";
	}else{
		var newPay = arr.concat(pay);
		localStorage.setItem("buynow",JSON.stringify(newPay));
		location.href = "comfirm_order.html";
	}
	
}

//方法
//(1)初始化
function init(ul,src,price,num,total){
	var li = document.createElement("li");
	var input = document.createElement("input");
	input.setAttribute("type","checkbox");
	li.appendChild(input);
	
	var a = document.createElement("a");
	a.setAttribute("href","pro_details.html");
	var img = document.createElement("img");
	img.setAttribute("src",src);
	a.appendChild(img);
	li.appendChild(a);
	
	var p1 = document.createElement("p");
	var span1 = document.createElement("span");
	var a1 = document.createElement("a");
	a1.setAttribute("href","pro_details.html");
	var text1 = document.createTextNode("【世纪沉香坊】");
	a1.appendChild(text1);
	span1.appendChild(a1);
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
	var a2 = document.createElement("a");
	a2.setAttribute("href","javascript:void(0)");
	var text6 = document.createTextNode("更多促销");
	a2.appendChild(text6);
	span6.appendChild(a2);
	p3.appendChild(span6);
	li.appendChild(p3);
	
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var button1 = document.createElement("button");
	var text7 = document.createTextNode("-");
	button1.appendChild(text7);
	div2.appendChild(button1);
	var input2 = document.createElement("input");
	input2.setAttribute("type","text");
	input2.setAttribute("value",num);
	div2.appendChild(input2);	
	var button2 = document.createElement("button");
	var text8 = document.createTextNode("+");
	button2.appendChild(text8);
	div2.appendChild(button2);
	div1.appendChild(div2);
	var span7 = document.createElement("span");
	var text9 = document.createTextNode("有货");
	span7.appendChild(text9);
	div1.appendChild(span7);
	li.appendChild(div1);
	
	var p4 = document.createElement("p");
	var span8 = document.createElement("span");
	var text10 = document.createTextNode("¥"+total);
	span8.appendChild(text10);
	p4.appendChild(span8);
	var span9 = document.createElement("span");
	var text11 = document.createTextNode("0.8kg");
	span9.appendChild(text11);
	p4.appendChild(span9);
	li.appendChild(p4);
	
	var p5 = document.createElement("p");
	var span10 = document.createElement("span");
	var text12 = document.createTextNode("删除");
	span10.appendChild(text12);
	p5.appendChild(span10);
	var span11 = document.createElement("span");
	var text13 = document.createTextNode("移到我的关注");
	span11.appendChild(text13);
	p5.appendChild(span11);
	li.appendChild(p5);
	
	ul.appendChild(li);
}

//(2)全部商品的数量
function totalnum(){
	var total = 0;
	var cart = JSON.parse(localStorage.getItem("cart"));
	for (var i=0;i<cart.length;i++) {
		if(cart[i].user == user){
			var num = cart[i].number;
			total = total+parseInt(num);
		}
	}
	numPos.innerText = "全部商品（"+total+"）";
}
	
//(3)商品的数量 (一种商品)
function pronum(li){
	var input = li.getElementsByTagName("input")[1];
	return (input.value);
}

//(4)商品的总价 (一种商品)（直接）
function prototal(li){
	var span = li.getElementsByTagName("p")[3].getElementsByTagName("span")[0];
	var text = span.innerText;
	var total = text.slice(1,text.length);
	return total;
}

//（5）商品的总价 (一种商品)（间接：数量*单价）
function totalpro(li){
	var span = li.getElementsByTagName("p")[2].getElementsByTagName("span")[0];
	var span1 = li.getElementsByTagName("p")[3].getElementsByTagName("span")[0];
	var text = span.innerText;
	var price = text.slice(1,text.length);
	var input = li.getElementsByTagName("input")[1];
	var num = input.value;
	var total = parseInt(num)*parseInt(price);
	span1.innerText = "¥"+total+".00";
}

//更新已选数量和总价
function update(){
	var num = 0;
	var price = 0;		
	for(var i=0;i<liList.length;i++){
		var check = liList[i].getElementsByTagName("input")[0];
		if(check.checked){
			num = parseInt(num) + parseInt(pronum(liList[i]));
			price = parseInt(price) + parseInt(prototal(liList[i]));
		}		
    }
	numselect.innerText = "已选择"+num+"件商品     总价： ";
	priceselect.innerText = "¥"+price+".00";
}

//删除
function del(span){
	var li = span.parentNode.parentNode;
	var img = li.getElementsByTagName("img")[0].getAttribute("src");
	for (var i=0;i<cart.length;i++) {
		if((cart[i].user == user)&&(cart[i].img == img)){
			cart.splice(i,1);
			i = -1;
		}
	}
	localStorage.setItem("cart",JSON.stringify(cart));
	li.parentNode.removeChild(li);
}
	

var li = document.querySelector(".order_list>li");