$(function(){
				
	//定义一个存储数据的数组，用于下面重复选择判断，删除标签
	var oliNameArray = [];
	var oliIdArray = [];
	
	//定义一个总数组，用于数据传输，比如后端传输一个josn或者其他数据，存放数据。这个相当于存在数据，比如修改数据 
	//因为数据是从后端动态传输的，所以获取的是个map型的数据
	var oulIdArray = [{"oliName":"游戏","oliId":"1"},{"oliName":"音乐","oliId":"2"},{"oliName":"电影电视","oliId":"3"},{"oliName":"购物","oliId":"4"}];//假数据
	var oulIdArrayLength = oulIdArray.length;
	var tem = "";
	
	for(var i=0;i<oulIdArrayLength;i++){
		var oliName = oulIdArray[i].oliName;
		var oliId = oulIdArray[i].oliId;
		tem += '<li oliName="'+oliName+'" oliId="'+oliId+'">'+oliName+'</li>'
		console.log(tem)
	}
	$(".selectUl").html(tem)
				
	//点击输入框时候
	$(".selectBox .imitationSelect").on("click",function(event){
		$(this).parent().next().toggle();//ul弹窗展开
		$(this).next().toggleClass("fa-caret-up")//点击input选择适合，小图标动态切换
		if($(this).next().hasClass("fa-caret-down")){
			$(this).next().removeClass("fa-caret-down").addClass("fa-caret-up")//点击input选择适合，小图标动态切换
		}else{
			$(this).next().addClass("fa-caret-down").removeClass("fa-caret-up")//点击input选择适合，小图标动态切换
		}
		if (event.stopPropagation) {   
        	// 针对 Mozilla 和 Opera   
        	event.stopPropagation();   
        }else if (window.event) {   
        	// 针对 IE   
        	window.event.cancelBubble = true;   
        }  
	});
	
	//点击右边箭头icon时候
	$(".selectBox .fa").on("click",function(event){
		$(this).parent().next().toggle();//ul弹窗展开
		if($(this).hasClass("fa-caret-down")){
			$(this).removeClass("fa-caret-down").addClass("fa-caret-up")//点击input选择适合，小图标动态切换
		}else{
			$(this).addClass("fa-caret-down").removeClass("fa-caret-up")//点击input选择适合，小图标动态切换
		}
		if (event.stopPropagation) {   
        	// 针对 Mozilla 和 Opera   
        	event.stopPropagation();   
        }else if (window.event) {   
        	// 针对 IE   
        	window.event.cancelBubble = true;   
        }  
	});
	
	
	$(".selectUl li").click(function(event){
		event=event||window.event; 
		$(this).addClass("actived_li");//点击当前的添加   actived_li这个类；
		var oliId = $(this).attr("oliId");
		var oliName = $(this).attr("oliName");
		if(oliIdArray.indexOf(oliId)>-1){
	
		}else{
			oliIdArray.push(oliId);
			oliNameArray.push(oliName);
			$(this).parent().prev().children().attr("oliId",oliIdArray);//把当前点击的oliId赋值到显示的input的oliId里面
			$(this).parent().prev().children().attr("oliName",oliNameArray);
			$("#role_select").append("<span class='person_root'><span>"+$(this).text()+'</span><i class="close" oliId="'+  oliId +'" oliName ="'+oliName+'">x</i></span>');
		}
		console.log(oliIdArray)
		oliDelete();
		console.log("hello73")
	    
	    
	});
	
	function oliDelete(){
		//进行绑定事件，每个删除事件得以进行
		var role_select = document.getElementById("role_select");
    	var role_span= role_select.getElementsByTagName('i');
		console.log(role_span.length)
    	var id;
    	//console.log("span的选择个数"+role_span.length)l
    	for(var i=0;i<role_span.length;i++){
	        role_span[i].onclick = function(){ 
	        	$(".selectUl").hide();
	        	var oliId = $(this).attr("oliId");
	        	console.log("oliId"+oliId)
				console.log(oliIdArray.length);
	            for (var i = 0; i < oliIdArray.length; i++){
					console.log(i,oliIdArray[i], oliId,oliIdArray[i] === oliId);
			        if (oliIdArray[i] === oliId){ //表示数组里面有这个元素
			            id = i;//元素位置
			            oliIdArray.splice(i,1);
			            oliNameArray.splice(i,1);
			            console.log('删除当前的序号'+oliId+';'+'剩下数组'+oliIdArray)
			            console.log('删除当前的序号'+oliId+';'+'剩下数组'+oliNameArray)
						
						$(".selectUl li").parent().prev().children().attr("oliId",oliIdArray);//把当前点击的oliId赋值到显示的input的oliId里面
						$(".selectUl li").parent().prev().children().attr("oliName",oliNameArray);
			        }
			    }
				$(".selectUl li").eq(oliId-1).removeClass("actived_li");
				$(this).parent().remove();
		    }  
	    }  
	}
	
	//点击任意地方隐藏下拉
	
	$(document).click(function(event){
		event=event||window.event; 
		$(".inputCase .fa").removeClass("fa-caret-up").addClass("fa-caret-down")//当点隐藏ul弹窗时候，把小图标恢复原状
		$(".selectUl").hide();//当点击空白处，隐藏ul弹窗
	});
	
})
