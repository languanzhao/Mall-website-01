//左导航的定位
$(document).ready(function() {
	//var footerbar = document.getElementsByClassName("footerbar")[0];
    var $liList = $(".footerbar>li");
    var $titleList = $(".title");
    var $header = $("#header");
    var $top = $(".footerbar>li:nth-of-type(8)");
    $top.click(function(){
    	$('html, body').animate({
            scrollTop: $header.offset().top        
		}, 1000);
    });
    $liList.each(function(i) {
    	$(this).click(function(){
    		$('html, body').animate({
                scrollTop: $titleList.eq(i).offset().top        
    		}, 1000);
    	});
    });
    $right = $(".sidebar>li:nth-of-type(9)");
    console.log($right);
    $right.click(function(){
    	$('html, body').animate({
            scrollTop: $header.offset().top        
		}, 1000);
    });
});

//右导航的定位
var height = document.documentElement.clientHeight;
document.querySelector(".sidebar").style.top = (height-640)/2+"px";



document.querySelector(".footerbar").style.top = (height-344)/2+"px";
var width = (document.documentElement.clientWidth-1648)/2;
var left = width>0?width:0;
document.querySelector(".footerbar").style.left = left+"px";



//商品标识
var pro_list = document.getElementsByClassName("pro_list");
for(var i=0;i<pro_list.length;i++){
	var liList = pro_list[i].getElementsByTagName("li");
	for (var j=0;j<liList.length;j++) {
		liList[j].onclick = function(){
			var src = this.getElementsByTagName("img")[0].getAttribute("src");
			var price = this.getElementsByTagName("span")[0].innerText;
			var procur = {"src":src,"price":price,};
			localStorage.setItem("procur",JSON.stringify(procur));
		}
	}
}
	






