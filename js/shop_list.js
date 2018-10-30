//选项卡的切换
var sortList = document.querySelectorAll("#middle>div>div:nth-of-type(3)>ul>li");
var contentList = document.querySelectorAll("#middle>div>ul");
for (var i=0;i<sortList.length;i++) {
	sortList[i].index = i;
	sortList[i].onclick = function(){
		for (var j=0;j<sortList.length;j++) {
			sortList[j].removeAttribute("class");
			contentList[j].style.display = "none";
		}
		this.setAttribute("class","active");
		contentList[this.index].style.display = "block";
	}
}





//数量的增减
var right = document.querySelector("#middle>div>div:nth-of-type(3)>div>form>button:last-of-type");
var left = document.querySelector("#middle>div>div:nth-of-type(3)>div>form>button:first-of-type");
right.onclick = function(){
	var number = parseInt(document.querySelector("#middle>div>div:nth-of-type(3)>div>p>span:first-child").innerText);
	number = number+1;
	if(number <= 120){
		left.removeAttribute("disabled");
		left.style.backgroundColor = "#ffffff";
		document.querySelector("#middle>div>div:nth-of-type(3)>div>p>span:first-child").innerText = number;
		if(number==120){
			right.setAttribute("disabled","disabled");
            right.style.backgroundColor = "#f7f7f7";
		}
	}	
}	
left.onclick = function(){
	left.style.backgroundColor = "#ffffff";
	var number = parseInt(document.querySelector("#middle>div>div:nth-of-type(3)>div>p>span:first-child").innerText);
	number = number-1;
	if(number==119){
		right.removeAttribute("disabled");
		right.style.backgroundColor = "#FFFFFF";
	}
	if(number >= 1){
		document.querySelector("#middle>div>div:nth-of-type(3)>div>p>span:first-child").innerText = number;
		if(number==1){
			left.setAttribute("disabled","disabled");
            left.style.backgroundColor = "#f7f7f7";
		}
	}	
}

//页码的变化
var number = 1;//当前页码
var button = document.querySelector("#middle>div>div:nth-of-type(4)>form>button");
var input = document.querySelector("#middle>div>div:nth-of-type(4)>form>input");
button.onclick = function(){
	number = parseInt(input.value);
	var a = document.querySelectorAll(".page>li");
	for (var i = 0;i<=a.length;i++) {
		console.log(a[i]);
	}
}

//商品标识
var liList = document.getElementsByClassName("pro_list")[0].getElementsByTagName("li");
for (var j=0;j<liList.length;j++) {
	liList[j].onclick = function(){
		var src = this.getElementsByTagName("img")[0].getAttribute("src");
		var price = this.getElementsByTagName("span")[0].innerText;
		var procur = {"src":src,"price":price,};
		localStorage.setItem("procur",JSON.stringify(procur));
	}
}

//添加类别选中状态
var classfy = document.querySelectorAll(".classify>dl:nth-of-type(1)>dd");
var country = document.querySelectorAll(".classify>dl:nth-of-type(2)>dd");
var size = document.querySelectorAll(".classify>dl:nth-of-type(3)>dd");
var priceList = document.querySelectorAll(".classify>dl:nth-of-type(4)>dd");
for(var i=0;i<priceList.length;i++){
	priceList[i].onclick = function(){
		for(var j=0;j<priceList.length;j++){
			priceList[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
	}
}
for(var i=0;i<classfy.length;i++){
	classfy[i].onclick = function(){
		for(var j=0;j<classfy.length;j++){
			classfy[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
	}
}
for(var i=0;i<classfy.length;i++){
	country[i].onclick = function(){
		for(var j=0;j<country.length;j++){
			country[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
	}
}
for(var i=0;i<classfy.length;i++){
	size[i].onclick = function(){
		for(var j=0;j<size.length;j++){
			size[j].removeAttribute("class");
		}
		this.setAttribute("class","active");
	}
}
	