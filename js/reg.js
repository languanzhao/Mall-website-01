//红框的长度
var logo = document.getElementsByClassName("logo")[0];
var width = document.documentElement.clientWidth-1410>0?1410+"px":100+"%";
logo.style.width = width;


var username = document.getElementById("username");
var pass = document.getElementById("password");
var dbpass = document.getElementById("dbpassword");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var info = document.getElementById("info");
var code = document.getElementById("code");
var reg = document.getElementById("reg");
var checkbox = document.getElementById("checkbox");
var pList = document.getElementsByTagName("ul")[0].getElementsByTagName("p");

var user = JSON.parse(localStorage.getItem("user"));
if(user==null){
	user=[];
}
//1.本地存储检测用户名格式、用户名是否被注册
function userprove(){
	var usernameV = username.value.trim();
	var text = "通过";
	for (var i =0;i<user.length;i++) {
		if(user[i].name == usernameV){
			//alert("该用户名已被注册，请重新输入！");
			text = "该用户名已被注册，请重新输入！";
		}
	}
	var reg = /^[a-z0-9_-]{3,16}$/;
	if(!reg.test(usernameV)){
		text = "用户名格式错误，应由3到16位的字母，数字，下划线组成，请重新输入！";
		//alert("用户名格式错误，应由3到16位的字母，数字，下划线组成，请重新输入！");
	}
	return text;
}
username.onblur = function(){
	pList[0].innerText = userprove();
	changeStyle(pList[0]);
}

//2.密码的格式是否正确、两次密码是否相同
function passprove(){
	var passV = pass.value.trim();
	var reg = /^[a-z0-9_-]{6,18}$/;
	var text = "通过";
	if(!reg.test(passV)){
		text = "密码格式错误，应由6到18位的字母，数字，下划线组成，请重新输入！";
		//alert("密码格式错误，应由6到18位的字母，数字，下划线组成，请重新输入！");
	}
	return text;
	
}
pass.onblur = function(){
	pList[1].innerText = passprove();
	changeStyle(pList[1]);
}
function dbpassprove(){
	var passV = pass.value.trim();
	var dbpassV = dbpass.value.trim();
	var text = "通过";
	if(!(dbpassV==passV)){
		text = "两次输入的密码不相同，请重新输入密码！";
	}
	return text;
}
dbpass.onblur = function(){
	pList[2].innerText = dbpassprove();
	changeStyle(pList[2]);
}

//3.手机和邮箱的格式是否正确 ,且是否已注册
function phoneprove(){
	var phoneV = phone.value.trim();
	var reg = /^1[3|4|5|7|8][0-9]{9}$/;
	var text = "通过";
	if(!reg.test(phoneV)){
//		alert("手机号码有误，请重新输入");
        text = "手机号码有误，请重新输入";
		
	}
	for (var i =0;i<user.length;i++) {
		if(user[i].phone == phoneV){
			//alert("该手机已被注册，请重新输入新的手机号码！");
			text = "该手机已被注册，请重新输入新的手机号码！";
		}
	}
	return text;
}
phone.onblur = function(){
	pList[4].innerText = phoneprove();
	changeStyle(pList[4]);
}

function emailprove(){
	var emailV = email.value.trim();
	var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	var text = "通过";
	if(!reg.test(emailV)){
		//alert("邮箱格式有误，请重新输入邮箱！");
        text = "邮箱格式有误，请重新输入邮箱！";
	}
	for (var i =0;i<user.length;i++) {
		if(user[i].email == emailV){
			//alert("该邮箱已被注册，请重新输入邮箱！");
			text = "该邮箱已被注册，请重新输入邮箱！";
		}
	}
	return text;
}
email.onblur = function(){
	pList[3].innerText = emailprove();
	changeStyle(pList[3]);
}

//4.短信验证不为空(时间会改变，且不能再按)
code.onclick = function(){
	code.style.color = "#E93535";
    code.style.backgroundColor = "#A0A0A0";
	code.setAttribute("disabled","disabled");
	var sencond = 60;
	var timer = setInterval(function(){
		code.innerText = sencond+"秒";
		sencond--;
		if(sencond<=0){
			clearInterval(timer);
			code.innerText = "获取短信验证码";
			code.style.color = "#FFFFFF";
	        code.style.bgColor = "#E93535";
	        code.removeAttribute("disabled");
		}
	},1000);	
}




function infoprove(){
	var infoV = info.value.trim();
	var index = true;
	if(infoV==""){
		alert("验证码不能为空！");
		infoV.value = "";
		info.focus();
		index = false;
	}
	return index;
}


//5.注册文本发生改变，且不能再按
reg.onclick = function(){
	if(!checkbox.checked){
		alert("请勾选条约再注册！");
		return;
	}
	reg.style.color = "#E93535";
    reg.style.backgroundColor = "#A0A0A0";
	reg.setAttribute("disabled","disabled");
	reg.innerText="注册中..."
	
	for (var i=0;i<pList.length;i++) {
		var text = pList[i].innerText;
		if(text!="通过"){
			alert("还有信息未完善，请填写完再提交");
			return;
		}
	}
	
	var nameV = username.value.trim();
	var passV = pass.value.trim();
	var emailV = email.value.trim();
	var phoneV = phone.value.trim();
	var infoV = info.value.trim();
	
	
	if(!infoprove()){
		init(info);
		return;
	}
	var obj = {"name":nameV,"pass":passV,"email":emailV,"phone":phoneV};
	user.push(obj);
	localStorage.setItem("user",JSON.stringify(user));
	reg.style.color = "#FFFFFF";
    reg.style.backgroundColor = "#E93535";
    reg.removeAttribute("disabled");
    reg.innerText="注册";
    
    
    //保存当前用户的信息
    //key:current  value:{username:xxxx} 
    var curUser = {"username":nameV};
    localStorage.setItem("current",JSON.stringify(curUser));
        
	window.location.href = "login.html";
		
}

//提示文字样式的改变
function changeStyle(p){
	if (p.innerText == "通过") {
		p.style.color = "green";
	} else{
		p.style.color = "red";
	}
		
}
function init(ele){
	ele.focus();
	reg.style.color = "#FFFFFF";
    reg.style.backgroundColor = "#E93535";
    reg.removeAttribute("disabled");
    reg.innerText="注册";
}











