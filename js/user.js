//城市级联
$(function(){
	$.getScript("js/city.js", function(data) {
		var result = JSON.parse(data);
		var arr = [];//城市集合
		var arr1 = [];//地区集合
		for (var i = 0; i < result.length; i++) {
			if(result[i].ProSort){
				$("#city").append("<option value='" + result[i].ProID + "'>&nbsp;" + result[i].name + "</option>");
			}else if(result[i].CitySort){
				arr.push(result[i]);
			}else if(result[i].DisSort == null){
				arr1.push(result[i]);
			}			
		}
		console.log(arr1);
		$("#city").change(function() {
			var value = $(this).val();
			$("#area option").eq(0).siblings().remove();
			$("#way option").eq(0).siblings().remove();
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].ProID == value) {
					$("#area").append("<option value='" + arr[i].CityID + "'>&nbsp;" + arr[i].name + "</option>");
				}
			}
		});
		$("#area").change(function() {
			var value = $(this).val();
			$("#way option").eq(0).siblings().remove();
			console.log(value);
			for (var i = 0; i < arr1.length; i++) {
				if (arr1[i].CityID == value) {
					$("#way").append("<option value='" + arr1[i].Id + "'>&nbsp;" + arr1[i].DisName + "</option>");
				}
			}
		});
		
	})
})
//昵称   性别   生日   兴趣    姓名
//按钮
var button = document.getElementById("middle").getElementsByTagName("button")[0];
console.log(button);
var username = document.getElementById("username");
var sexList = document.getElementsByTagName("sex");
//生日 
var date = new Date();
for (var i = 1975; i <= date.getFullYear(); i++) {
	$("#year").append("<option value='" + i + "'>" + i + "</option>");				
}
for (var i = 1; i < 13; i++) {
	$("#month").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");				
}
$("#year").change(function(){
	$("#day option").eq(0).siblings().remove();
	var value = parseInt($("#month").val());
	var year = parseInt($(this).val())%4;
	if(value == 1 || value == 3 || value == 5 || value == 7 || value == 8 || value == 10 || value == 12){
		for(var i=1;i<32;i++){
			$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
		}
	}else if(value!=2){
		for(var i=1;i<31;i++){
			$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
		}
	}else{
		if(year == 0){
			for(var i=1;i<29;i++){
				$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
			}
		}else{
			for(var i=1;i<30;i++){
				$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
			}
		}
	}
})
$("#month").change(function(){
	$("#day option").eq(0).siblings().remove();
	var value = parseInt($(this).val());
	var year = parseInt($("#year").val())%4;
	if(value == 1 || value == 3 || value == 5 || value == 7 || value == 8 || value == 10 || value == 12){
		for(var i=1;i<32;i++){
			$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
		}
	}else if(value!=2){
		for(var i=1;i<31;i++){
			$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
		}
	}else{
		if(year == 0){
			for(var i=1;i<29;i++){
				$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
			}
		}else{
			for(var i=1;i<30;i++){
				$("#day").append("<option value='" + i + "'>&nbsp;&nbsp;&nbsp;" + i + "</option>");		
			}
		}
	}
})


//提交按钮
var submit = document.querySelector("#middle>div>form>ul>li:nth-of-type(9)>button");
submit.onclick = function(){
	
}
