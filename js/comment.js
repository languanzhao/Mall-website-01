//1.商品满意度     2.买家印象
//1.商品满意度
var imgList  = document.querySelectorAll("#middle>div>div>div>form>div:nth-of-type(1)>ul>li>img");
for (var i=0;i<imgList.length;i++) {
	imgList[i].index = i;
	imgList[i].onmouseover = function(){
			for(var j=0;j<=this.index;j++){
				imgList[j].setAttribute("src","img/page_icon01.png");
			}
	}	
	imgList[i].onmouseout = function(){
		for(var j=0;j<=this.index;j++){
			imgList[j].setAttribute("src","img/page_icon.png");
		}
	}

	imgList[i].onclick = function(){
		for(var j=0;j<=this.index;j++){
			imgList[j].setAttribute("src","img/page_icon01.png");
		}	
		for (var l=this.index+1;l<imgList.length;l++) {
			imgList[l].setAttribute("src","img/page_icon.png");
		}
		for (var k=0;k<imgList.length;k++) {
			imgList[k].onmouseout = null;
			imgList[k].onmouseover = null;
		}
	}
}






//2.买家印象
var liList = document.querySelectorAll("#middle>div>div>div>form>div:nth-of-type(2)>ul>li");
for (var i=0;i<liList.length;i++) {
	liList[i].onclick = function(){
		this.setAttribute("class","active");
	}
}

//3.图片显示
var doc = document.querySelector("#middle>div>div>div>form>input");//上传按钮
doc.onchange = function() {
	for(var i = 0;i < doc.files.length;i++) {
		var img =document.createElement("img");
		console.log(window.URL.createObjectURL(doc.files[i]));
		img.src = window.URL.createObjectURL(doc.files[i]);
		var par = document.querySelector("#middle>div>div>div>form>div:nth-of-type(3)>div");
		par.appendChild(img);
	}
}


//提交按钮的判断
var submit = document.querySelector("#middle>div>div>div>form>button");
var index1 = false;
var index2 = false;
submit.onclick = function(){
	for (var i=0;i<imgList.length;i++) {
		if(imgList[i].getAttribute("src") == "img/page_icon01.png"){
			index2 = true;
			break;
		}
	}
	if(!index2){
		alert("请选择商品满意度，再提交评价信息！");
		return;
	}
	for (var i=0;i<liList.length;i++) {
		if(liList[i].hasAttribute("class")){
			index1 = true;
			break;
		}		
	}
	if(!index1){
		alert("请选择买家印象，再提交评价信息！");
		return;
	}
	alert("评价成功，谢谢参与！");
}
