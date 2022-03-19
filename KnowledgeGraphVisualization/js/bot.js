
var text = $("#f-left");
text.focus();

function action(){
	if(text.val==null||text.val()=="")
	{
		text.focus();
		return;
	}//没有内容点击发送时
	
	$(".b-body").append("<div class='mWord'><span></span><p>" + text.val() + "</p></div>");
	//生成右部对话框
	$(".b-body").scrollTop(10000000);
	//设置匹配元素的滚动条的垂直位置
	
	var args = {
		type : "post",
		url:"http://106.52.142.195:7474/chatbot?question="+text.val()+'?',
		success : function(redata)
		{
			var result = '';
			var my_data = $.parseJSON(redata);
			for(var key in my_data){
				result += my_data[key];
				result += ' ';  
			}
			// var result = [my_data.answer];
			$(".b-body").append("<div class='rotWord'><span></span> <p id='member'>" + result + "</p></div>");
			console.log(redata);
			console.log(my_data);
			console.log(result);
			//生成回答
		}
	}
	kg1Draw(text.val());
	ajax(args);//执行ajax数据获取，参数为args中的值
	text.val("");
	text.focus();//复原输入框
	
}
$("#btn").click(function()
{
	action();
});
$(document).keydown(function(event)
{
	if(event.keyCode==13)
	{
		action();
	}
});

function ajax(mJson)
{
	var type=mJson.type||'get';
	var url=mJson.url;
	var success=mJson.success;
	var error=mJson.error;
	var dataStr='';
	
	
}
function ajax(mJson)
{
	var type=mJson.type||'get';
	var url=mJson.url;
	var data=mJson.data;
	var success=mJson.success;
	var error=mJson.error;
	var dataStr='';
	
	if(data)
	{
		var arr = Object.keys(data);
		var len = arr.length;
		var i = 0;
		
		for (var key in data)
		{
			dataStr+=key+'='+data[key];
	
			if (++i<len)
			{
				dataStr+='&';
			}
		}
		
		if(type.toLowerCase()=='get')
		{
			url+='?'+dataStr;
		}
	}
	
	console.log(url);
	
	var xhr=new XMLHttpRequest();
	xhr.open(type,url,true);
	xhr.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
	xhr.send(null);

	xhr.onreadystatechange=function()
	{
		if(xhr.readyState==4)
		{
			if(xhr.status>=200&&xhr.status<300)
			{
				success&&success(xhr.responseText);
			}
			else
			{
				error&&error(xhr.status);
			}
		}
	}
}		
