    var BaaS = window.BaaS;
	let cacheKey = 'f60a22fc371e94017d49';
  // index.js
	if (!localStorage.getItem(cacheKey)) {
	  let clientID = window.prompt('请输入 clientID')  // 从 BaaS 后台获取 ClientID
	  localStorage.setItem(cacheKey, cacheKey) // 若输入了错误的 clientID，可以清空 localStorage
	}
	BaaS.init(cacheKey);  // 初始化 BaaS 对象
	
BaaS.auth.login({email: '502500936@qq.com', password: 'Llj991120.'}).then(user => {
  console.log(user)
}).catch(err => {
  // HError
})
////临时用户
//	BaaS.auth.anonymousLogin().then(user => {
//}).catch(err => {
//// HError
//})




function register(){
	var registerphone=document.getElementById("registerphone").value;
    let smscode=document.getElementById("smscode").value;
    BaaS.verifySmsCode({phone: registerphone, code: smscode}).then(res => {
    // success
    let tableName='User';
	let user=new BaaS.TableObject(tableName);
	let registerpassword=document.getElementById("registerpassword").value;
	let User ={
		telephone:registerphone,
		password:registerpassword
	}
    let record=user.create();
    record.set({
        telephone:registerphone,
		password:registerpassword
      }).save().then(res2 => {
  // success
  console.log(res2)
  alert('注册成功')
  window.location.href='login.html'
  
}, err => {
  //err 为 HError 对象
})
}).catch(e => {
    // err
    console.log(e.code) // 错误状态码
})
    
}
var loginphone;

function login(){
	let tableName='User';
	loginphone=document.getElementById("loginphone").value;
	let password=document.getElementById("loginpassword").value;
	if(loginphone.length!=11)
		{
			alert("请输入正确的手机号码");
			window.location.href='login.html';
		}
	let Product = new BaaS.TableObject(tableName);
	let query = new BaaS.Query();
    Product.setQuery(query.contains('telephone', loginphone)&&query.contains('password', password)).count().then(num => {
// success
    if(num==1){
    	alert('登入成功');
    	window.location.href='past_index.html';
    }
    else{
    	alert('账号或者密码错误');
    	window.location.href='login.html';
    }
   }, err => {
// err
})
}

function getM(){
	let registerphone=document.getElementById("registerphone").value;
	if(registerphone.length!=11)
		{
			alert("请输入正确的手机号码");
			window.location.href='register_2.html';
		}
	else{
	alert('信息已发出注意查收')
	}
	BaaS.sendSmsCode({phone:registerphone, signatureID: 247}).then(res => {
  // success
  console.log(res) // { "status": "ok" }
}).catch(e => {
  // err
  console.log(e.code) // 错误状态码
})
}

//忘记密码的获取短信
function getM2(){
	let phone=document.getElementById('Fgphone').value;
	if(phone.length!=11)
		{
			alert("请输入正确的手机号码");
			window.location.href='register_2.html';
		}
	else{
	alert('信息已发出注意查收')
	}
	BaaS.sendSmsCode({phone: phone, signatureID: 247}).then(res => {
  // success
  console.log(res.data) // { "status": "ok" }
}).catch(e => {
  // err
  console.log(e.code) // 错误状态码
})
}
//console.log(res.data.objects[0].id);

//忘记密码
function newregister(){
	let tableName='User';
	let Product=new BaaS.TableObject(tableName);
	let phone=document.getElementById('Fgphone').value;
	let query = new BaaS.Query();
	let newpassword=document.getElementById('newpassword').value;
	var recordId;
	Product.setQuery(query.contains('telephone', phone)).find().then(res => {
// success
    recordID =res.data.objects[0].id;
    console.log(recordID );
}, err => {
// err
})
    let smscode2=document.getElementById("smscode2").value;
    BaaS.verifySmsCode({phone: phone, code: smscode2}).then(res => {
    // success
     console.log(res.data)
}).catch(e => {
    // err
    console.log(e.code) // 错误状态码
    alert('错误验证码')
    window.location.href='forgetkey.html';
})
	setTimeout(function () {let product = Product.getWithoutData(recordID)
	product.set('password', newpassword)
    product.update().then(res => {
  // success
  console.log(res)
  alert('密码修改成功');
  window.location.href='login.html';
}, err => {
  // err
})},3000);
}


function checked(){
	let tableName='User';
	let email=document.getElementById("Email").value;
	let c_name=document.getElementById("c_name").value;
	let user=new BaaS.TableObject(tableName);
	let User ={
		c_name:c_name,
		Email:email
	}
    let record=user.create();
    record.set({
        c_name:c_name,
		Email:email
      }).save().then(res => {
  // success
  alert("信息补充完毕");
}, err => {
  //err 为 HError 对象
})
}
