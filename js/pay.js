//1.总价的显示
var user = JSON.parse(localStorage.getItem("current")).username;
var pay = JSON.parse(localStorage.getItem("pay"));
var total = 0;
for (var i = 0;i<pay.length;i++) {
	if(pay[i].user == user && pay[i].state != "success"){
		total = total + parseInt(pay[i].price)*parseInt(pay[i].number);
	}	
}
var pricePos1 = document.getElementById("middle").getElementsByTagName("span")[1];
pricePos1.innerText = total;
var pricePos2 = document.getElementsByTagName("form")[1].getElementsByTagName("span")[1];
pricePos2.innerText = total;


//2.银行卡号验证   /\d{15}|\d{19}/
var card = document.getElementsByTagName("form")[1].getElementsByTagName("input")[1];
card.onblur = function(){
	var text = card.value.trim();
	var reg = /\d{15}|\d{19}/;
	if((!reg.test(text))&&(text!="")){
		alert("银行卡号应由15或19位数字组成，请重新输入！");
		confirm.focus();
	}
}

var confirm = document.getElementsByTagName("form")[1].getElementsByTagName("button")[0];
confirm.onclick = function(){
	var text = card.value.trim();
	var reg = /\d{15}|\d{19}/;
	if((!reg.test(text))&&(text!="")){
		alert("银行卡号应由15或19位数字组成，请重新输入！");
		confirm.focus();
	}
	
}


//3.支付方式的选择
var liList = document.getElementsByTagName("form")[1].getElementsByTagName("li");
for (var i=0;i<liList.length;i++) {
	liList[i].onclick = function(){
		for (var j=0;j<liList.length;j++) {
			liList[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
	}		
}


//4.密码验证/\d{6}/
var password = document.getElementsByTagName("form")[1].getElementsByTagName("input")[2];


//5.支付结果随机生成
var result = document.getElementsByTagName("form")[1].getElementsByTagName("button")[1];
result.onclick = function(){
	var text = card.value.trim();
	var reg = /\d{15}|\d{19}/;
	if(text==""){
		alert("请填写银行卡号！");
		card.focus();
		return;
	}else if((!reg.test(text))&&(text!="")){
		alert("银行卡号应由15或19位数字组成，请重新输入！");
		return;
	}
	var pastext = password.value.trim();
	var reg1 = /\d{6}/;
	if(pastext==""){
		alert("请填写密码！");
		password.focus();
		return;
	}else if((!reg1.test(pastext))&&(pastext!="")){
		alert("密码错误，请重新输入！");
		password.value = "";
		password.focus();
		return;
	}
	
	var index = true;
	for (var i=0;i<liList.length;i++) {
		if(liList[i].hasAttributes("class")){			
			index = false;
			break;
		}		
	}
	if(index){
		alert("请选择支付方式！");
		return;
	}
	var random =Math.round(Math.random());
	if(random==1){
		for (var i = 0;i<pay.length;i++) {
			if(pay[i].user == user){
				pay[i].state = "success";
			}	
		}
		localStorage.setItem("pay",JSON.stringify(pay));
		var totalPrice = {"total":total}; 
		localStorage.setItem("totalprice",JSON.stringify(totalPrice));
		location.href = "pay_success.html";
	}else{
		for (var i = 0;i<pay.length;i++) {
			if(pay[i].user == user){
				pay[i].state = "failure";
			}	
		}
		localStorage.setItem("pay",JSON.stringify(pay));
		location.href = "pay_failure.html";
	}
}





