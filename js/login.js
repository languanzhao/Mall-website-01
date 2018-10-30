//红框的长度
var logo = document.getElementsByClassName("logo")[0];
var width = document.documentElement.clientWidth-1410>0?1410+"px":100+"%";
logo.style.width = width;

var username = document.getElementById("username");
var password = document.getElementById("password");
var info = document.getElementById("info");//验证码
var save = document.getElementById("save");//复选框
var login = document.getElementById("login");//登录按钮
var prove = [{src:"img/login_01.png",code:"UDBU"},{src:"img/login_02.png",code:"U54A"},{src:"img/login_03.png",code:"U5H8"},{src:"img/login_04.png",code:"U6N8"},{src:"img/login_05.png",code:"U7M8"}];//验证数组

var saveV = JSON.parse(localStorage.getItem("save"));
if(saveV!=null){
	username.value = saveV.username;
	password.value = saveV.password;
	info.value = "UDBU";
	save.setAttribute("checked","checked");
}

//1.用户名的格式判断
//username.onblur=function(){
//	var usernameV = username.value.trim();
//	var reg = /^[a-z0-9_-]{3,16}$/;
//	if(!reg.test(usernameV)){
//		alert("用户名格式错误，应由3到16位的字母，数字，下划线组成，请重新输入！");
//		username.value = "";
//		username.focus();
//		return;
//	}
//}


//2.验证码是否正确,可以进行刷新
//刷新验证码
function refresh(){
    var i = Math.floor(Math.random()*5);	
    console.log(i);
    var imgSrc = prove[i].src;
	var infoImg = info.nextSibling.firstChild;    
    infoImg.setAttribute("src",imgSrc);
}

//info.onblur=function(){
//	var infoV = info.value.trim();
//	if(infoV==""){
//		alert("验证码不能为空！");
//		return;
//	}
//  var infoImg = info.nextSibling.firstChild;    
//  var infoSrc = infoImg.getAttribute("src");
//  for (var i=0;i<prove.length;i++) {
//  	if(prove[i].src==infoSrc){
//  		var code = prove[i].code;
//  		if(code!=infoV.toLocaleUpperCase()){
//  			alert("验证码错误，请重新输入！");
//  			refresh();
//				return;
//  		}
//  	}
//  }
//}


//3.用户名是否存在
login.onclick=function(){
	login.style.color="#E93535";
	login.style.backgroundColor="#0A0A0A";
	login.setAttribute("disabled","disabled");
	login.innerText="登录中...";
	var usernameV = username.value.trim();
	var passwordV = password.value.trim();
	var infoV = info.value.trim();
	if(usernameV==""){
		alert("用户名不能为空！");
		username.focus();
		login.style.color = "#FFFFFF";
	    login.style.backgroundColor = "#E93535";
	    login.removeAttribute("disabled");
	    login.innerText="登录";
		return;
	}
	if(passwordV==""){
		alert("密码不能为空！");
		password.focus();
		login.style.color = "#FFFFFF";
	    login.style.backgroundColor = "#E93535";
	    login.removeAttribute("disabled");
	    login.innerText="登录";
		return;
	}
		
	if(infoV==""){
		alert("验证码不能为空！");
		info.focus();
		login.style.color = "#FFFFFF";
	    login.style.backgroundColor = "#E93535";
	    login.removeAttribute("disabled");
	    login.innerText="登录";
		return;
	}
    var infoImg = info.nextSibling.firstChild;    
    var infoSrc = infoImg.getAttribute("src");
    for (var i=0;i<prove.length;i++) {
    	if(prove[i].src==infoSrc){
    		var code = prove[i].code;
    		if(code!=infoV.toLocaleUpperCase()){
    			alert("验证码错误，请重新输入！");
    			refresh();
    			login.style.color = "#FFFFFF";
			    login.style.backgroundColor = "#E93535";
			    login.removeAttribute("disabled");
			    login.innerText="登录";
				return;
    		}
    	}
    }
	
	var user = JSON.parse(localStorage.getItem("user"));
	
	if((passwordV!="")&&(usernameV!="")){
		var index = true;
		for (var i=0;i<user.length;i++) {
			if((user[i].name==usernameV)&&(user[i].pass==passwordV)){
				login.style.color = "#FFFFFF";
			    login.style.backgroundColor = "#E93535";
			    login.removeAttribute("disabled");
			    login.innerText="登录";
			    index=false;
			    //5.是否需要记住了密码  6.数据存储，重返首页
			    if(save.checked){
			    	var saveV = {"username":usernameV,"password":passwordV};
			    	localStorage.setItem("save",JSON.stringify(saveV));
			    }else{
			    	localStorage.removeItem("save");
			    }
			    var currentV = {"username":usernameV};
			    localStorage.setItem("current",JSON.stringify(currentV));
				location.href="index.html";
			}
		}
		if(index){
			alert("用户名或密码错误！");
			login.style.color = "#FFFFFF";
		    login.style.backgroundColor = "#E93535";
		    login.removeAttribute("disabled");
		    login.innerText="登录";
			return;
		}
		
	}
	
}