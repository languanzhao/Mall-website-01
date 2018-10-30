






$(document).ready(function() {
	//轮播图
    function changeBanner(){
			//获取当前屏幕宽度
		var dw = document.documentElement.clientWidth;
		//因为页面最小宽度为1200，所以使计算时的宽度最小为1200
		if(dw <= 1200){ dw = 1200; }
		//计算左边的偏移量
		var wapper_left = (1920 - dw)/2;
		//获取到第一个wapper类名的对象
		var wapper = document.querySelector(".wapper");
		//修改对象的内联样式
		wapper.style.left = -(wapper_left) + "px";
	}
		
	//浏览器大小改变时触发的事件
	window.onresize = changeBanner;
	
	changeBanner();
    
    
    //大图集合
    var $banner = $(".banner");
	var $bigList = $(".banner>.wapper>img");
	//小原点集合
	var $iconList = $(".banner>ul>li");
	//标识
	var index = 0;
	//定时器
	var time = null;
	//小圆点切换大图
	$iconList.each(function(i){
		
		$(this).click(function(){
			$iconList.removeClass("active");
			$iconList.eq(i).addClass("active");
			$bigList.fadeOut(500);
			$bigList.eq(i).fadeIn(500);
			index = i;
			console.log(index);
		});
	})
	
	function move(){
		index = (index+1)%$iconList.length;
		$iconList.eq(index).trigger("click");
	}
	
	time = setInterval(move,3000);
	
	
	
	$banner.hover(function(){
	    clearInterval(time);
	    console.log("停止");
	},function(){
		time = setInterval(move,3000);
		console.log("开始");
	});
	
	
	
	
	
	
	
})


//1、用户名的显示
var curUser = JSON.parse(localStorage.getItem("current"));
if(curUser.username!=""){
	var topC = document.getElementsByClassName("top")[0];
	topC.getElementsByTagName("div")[0].getElementsByTagName("span")[0].innerText = curUser.username+"欢迎来到世纪沉香坊在线商城";
}



//2、购物车上的数字发生变化
var cart = JSON.parse(localStorage.getItem("cart"));
var index = 0;
for(var i=0;i<cart.length;i++){
	if(cart[i].user == curUser.username){
		index++;
	}
}
var span = document.getElementsByClassName("cart")[0].getElementsByTagName("span")[1];
span.innerText = "（"+index+"）";

//导航栏的选中状态
var ul = document.querySelector(".nav>div>div>ul");
var div = document.querySelector(".nav>div>div");

//var finalStyle = ul.currentStyle ? ul.currentStyle : document.defaultView.getComputedStyle(ul, null);//利用判断是否支持currentStyle（是否为ie）alert(finalStyle.backgroundColor); 
//alert(finalStyle.display);
div.onmouseover = function(){
	div.setAttribute("class","active");	
}
div.onmouseout = function(){
	div.removeAttribute("class");
}



