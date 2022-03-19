// import axios from './axios.min.js';
Vue.prototype.$axios = axios;
let cacheKey = "ifanrx_clientID";

if (!localStorage.getItem(cacheKey)) {
      let clientID = "f60a22fc371e94017d49";  // 从 BaaS 后台获取 ClientID
      localStorage.setItem(cacheKey, clientID); // 若输入了错误的 clientID，可以清空 localStorage
	  console.log(clientID);
    }
    BaaS.init(localStorage.getItem(cacheKey))  // 初始化 BaaS 对象

var pm = new Vue({
	el:'.mainbox',//qm
	data:{
		isShow:true,
		linkSrc:'img/link_point.png',
		articleList:[],  //文章列表
		text:'', //文章内容
		article: {
			currentArticle: 0
		},
		bookSet: new Set(),
		books: [],
		type_oneSet: new Set(),
		type_one: [],
		type_twoSet: new Set(),
		type_two: [],
		currentPage: {
			book: 0,
			type_one: 0,
			type_two: 0
		},
		num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
	},
	methods:{

		
		findBook(index) {
			let _this = this;
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			Article.setQuery(query).select(["book_type"]).limit(100).offset(index).find().then(res => {
				let books = res.data.objects;
				books.forEach(book => {
					pm.bookSet.add(book.book_type);
				})
				if(res.data.meta.next !== null) {
					this.findBook(index + 100);
				}else {
					pm.books = Array.from(pm.bookSet)
					pm.currentPage.book = pm.books[0]
					pm.findTypeOne(0, 0)
				}
			})
		},
		findTypeOne(index) {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", pm.currentPage.book);
			Article.setQuery(query).select(["type_one"]).limit(100).offset(index).find().then(res => {
				let titles = res.data.objects;
				titles.forEach(type_one => {
					pm.type_oneSet.add(type_one.type_one);
				})
				if(res.data.meta.next !== null) {
					pm.findTypeOne(index + 100);
				}else {
					pm.type_one = Array.from(pm.type_oneSet)
					pm.currentPage.type_one = pm.type_one[0];
					pm.view('type_one');
					pm.findTypeTwo(0);
				}
			})
		},
		
		findTypeTwo(index) {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", pm.currentPage.book);
			query.compare("type_one", "=", pm.currentPage.type_one);
			Article.setQuery(query).select(["type_two"]).limit(100).offset(index).find().then(res => {
				let titles = res.data.objects;
				titles.forEach(type_two => {
					pm.type_twoSet.add(type_two.type_two);
				})
				if(res.data.meta.next !== null) {
					pm.findTypeTwo(book, 0, index + 100);
				}else {
					pm.type_two = Array.from(pm.type_twoSet)
					pm.currentPage.type_two = pm.type_two[0]
					pm.view('type_two');
					pm.findContent();
				}
			})
		},
		findContent() {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", pm.currentPage.book);
			query.compare("type_one", "=", pm.currentPage.type_one);
			query.compare("type_two", "=", pm.currentPage.type_two);
			Article.setQuery(query).select(["content"]).find().then(res => {
				pm.text = res.data.objects[0].content;
				pm.view('content');
				window.localStorage.setItem("content", pm.text);
			})
		},
		//转换类型
		changeArt(type) {
			let book = document.getElementById('book');
			let type_one = document.getElementById('type_one');
			let type_two = document.getElementById('type_two');
			if(type === "book") {
				pm.type_oneSet.clear();
				pm.type_twoSet.clear();
				pm.findTypeOne(0);
			}else if(type === "type_one") {
				pm.type_twoSet.clear();
				pm.findTypeTwo(0);
			}else {
				pm.findContent();
			}
		},
		view(type) {
			let type_one = document.getElementById('type_one');
			let type_two = document.getElementById('type_two');
			let content = document.getElementById('textarea');
			if(type_one == undefined || type_two == undefined) {
				return;
			}
			if(type === 'type_one') {
				type_one.options.length = 0;
				type_two.options.length = 0;
				pm.type_one.forEach(title => {
					type_one.options.add(new Option(title))
				})
				pm.type_two.forEach(title => {
					type_two.options.add(new Option(title))
				})
			}else if(type === 'type_two'){
				type_two.options.length = 0;
				pm.type_two.forEach(title => {
					type_two.options.add(new Option(title))
				})
			}
			content2.innerText = pm.text;
		},
		
		//下一篇
		nextArt() {
			let type_one = document.getElementById('type_one');
			let type_two = document.getElementById('type_two');
			let book = document.getElementById('book');
			if(type_two.selectedIndex < type_two.options.length - 1) {
				type_two.selectedIndex = type_two.selectedIndex + 1
				pm.currentPage.type_two = type_two.value;
				pm.changeArt('type_two');
			}else {
				if(type_one.selectedIndex < type_one.options.length - 1) {
					type_one.selectedIndex = type_one.selectedIndex + 1;
					pm.currentPage.type_one = type_one.value;
					pm.changeArt('type_one');
				}else {
					if(book.selectedIndex < book.options.length -1) {
						book.selectedIndex = book.selectedIndex + 1;
						pm.currentPage.book = book.value;
						pm.changeArt('book');
					}else {
						book.selectedIndex = 0;
						pm.currentPage.book = book.value;
						pm.changeArt('book');
					}
				}
			}
		},
	},
	mounted() {
		this.findBook(0);
	}
	
})