// import axios from './axios.min.js';
Vue.prototype.$axios = axios;
let cacheKey = "ifanrx_clientID";

if (!localStorage.getItem(cacheKey)) {
      let clientID = "f60a22fc371e94017d49";  // 从 BaaS 后台获取 ClientID
      localStorage.setItem(cacheKey, clientID); // 若输入了错误的 clientID，可以清空 localStorage
	  console.log(clientID);
    }
    BaaS.init(localStorage.getItem(cacheKey))  // 初始化 BaaS 对象

BaaS.auth.login({email: '502500936@qq.com', password: 'Llj991120.'}).then(user => {
  console.log(user)
}).catch(err => {
  // HError
})


var qm = new Vue({
	el:'.mainbox',
	data:{
		isShow:true,
		prevSrc:'img/previous.png',
		nextSrc:'img/next.png',
		inputShow:[
				{key:false},{key:false},{key:false},{key:false},{key:false},
				{key:false},{key:false},{key:false},{key:false},{key:false},
				{key:false},{key:false},{key:false},{key:false},{key:false},
				{key:false},{key:false},{key:false},{key:false},{key:false},
				{key:false},{key:false},{key:false},{key:false},{key:false}
		],
		articleList:[],  //文章列表
		text:'', //文章内容
		question:'',
		currentRelation: [0, 0, 0, 0, 0],  //记录当前第几跳
		graphs: [],  //大图    
		article: {
			currentArticle: 0
		},
		bookSet: new Set(),
		books: [],
		type_oneSet: new Set(),
		type_one: [],
		type_twoSet: new Set(),
		type_two: [],
		str1:'',
		str2:'',
		currentPage: {
			book: 0,
			type_one: 0,
			type_two: 0
		},
		num: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
	},
	methods:{
		// change:function(){
		// 	this.isShow=false;
		// 				// console.log(this.isShow);
		// },
		//移入显示
		enter:function(index){
			for(var i=0;i<25;i++){
				this.inputShow[i].key = false;
			}
			this.inputShow[index].key=true;
		},
		//移除不显示
		leave:function(index){
			this.inputShow[index].key=false;
			
		},
		//X跳问题向上向下
		prev:function(id){
			if(this.currentRelation[id] <= 0) {
				this.currentRelation[id] = this.graphs[id].length - 1;//
			}else {
				this.currentRelation[id]--;
			}
			let selector = document.getElementById('selector' + (id + 1));
			selector.selectedIndex = this.currentRelation[id];
			this.draw(id);
		},
		
		//X跳问题向上向下
		next:function(id){
			if(this.currentRelation[id] >= this.graphs[id].length - 1) {
				this.currentRelation[id] = 0;
			}else {
				this.currentRelation[id]++;
			}
			let selector = document.getElementById('selector' + (id + 1));
			selector.selectedIndex = this.currentRelation[id];
			console.log('222')
			this.draw(id);
		},
		
		draw(id) {
			let myChart = echarts.init(document.getElementById('box' + (id + 1)));
			let currentLink = null;  
			let currentNode = null;
			let categories = null;
			if(this.graphs[id] === null) {
				currentLink = [];
				currentNode = [];
				categories = [];
			}else {
				currentLink = this.graphs[id].links[this.currentRelation[id]];
				currentNode = this.graphs[id].nodes[this.currentRelation[id]];
				categories = this.graphs[id].categories;
			}
			currentNode.forEach((v) => {
				v.symbolSize = 40; // 在此处修改节点尺寸
			})
			let option = {
				toolbox: {
					// 显示工具箱
					show: false,
				},
				animationDuration: 1500,
				animationEasingUpdate: 'quinticInOut',
				// 系列列表
				series: [{
					// name: '知识图谱',数据
					data: currentNode,
					links: currentLink,
					categories: categories,
					
					type: 'graph',
					layout: 'force',  // 采用力引导布局
					force: {          // 力引导布局相关的配置项
						repulsion: 50,    // 节点之间的斥力因子
						edgeLength: 80,   // 边的两个节点之间的距离，这个距离也会受 repulsion
					},
					// circular: {  // 采用环形布局
					// 	rotateLabel: true
					// },
					symbolSize: 20, // 调整节点的大小
					roam: true,    // 是否开启鼠标缩放和平移漫游
					draggable: true,
					edgeSymbol: ['circle', 'arrow'],
					
					itemStyle: {
						borderColor: '#fff',
						borderWidth: 3,
						shadowBlur: 10,
						shadowColor: 'rgba(0, 0, 0, 0.3)'
					},
					edgeLabel: {
						show: true,
						position:'middle',
						formatter: function(x) {
							return x.data.name;
						},
						fontSize:13,
								},
	
					label: {
						normal: {
							show: true,
							position: 'inside',
							formatter: '{b}',
							fontSize: 12,
							fontStyle: '400',
						}
					},
					lineStyle: {
						color: 'source',
						curveness: 0.3
					},
					emphasis: {
						scale: true,
						focus: 'adjacency',
						lineStyle: {
							width: 10
						}
					}
				}]
			};
			myChart.setOption(option);
			console.log(qm.currentRelation[id]);
			console.log('111')
			console.log(qm.graphs[id]);
			console.log(qm.graphs[0]);
		},
		
		//在导航栏里实现问题第几跳问题
		change(id) {
			let selector = document.getElementById('selector' + (id + 1));
			let val = 0;
			if(selector !== null) {
				val = selector.selectedIndex;
				this.currentRelation[id] = val;
				this.draw(id);
			}
		},
		sort(graph, jump) {
			let nodes = graph.nodes;
			console.log('在这里3')
			console.log(nodes)
			let links = graph.links;
			let map = {
				nodes: [],
				links: [],
				categories: graph.categories,//res
				length: links.length / jump
			};
			let i = 0;
			for(let i = 0;i<links.length;) {
				let tempNodes = [];
				let tempLinks = [];
				for(let j = 0;j<jump;j++) {
					tempLinks.push(links[i++]);
				}
				nodes.forEach(node => {
					for(let k = 0;k < tempLinks.length;k++) {
						if(tempNodes.length !==0 && tempNodes[tempNodes.length - 1].id === node.id) {
							continue;
						}
						if(node.id === tempLinks[k].source || node.id === tempLinks[k].target) {
							tempNodes.push(node);
						}
					}
				})
				map.nodes.push(tempNodes);
				map.links.push(tempLinks);
			}
			return map;
		},
		
		findBook(index) {
			let _this = this;
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			Article.setQuery(query).select(["book_type"]).limit(100).offset(index).find().then(res => {
				let books = res.data.objects;
				books.forEach(book => {
					qm.bookSet.add(book.book_type);
				})
				if(res.data.meta.next !== null) {
					this.findBook(index + 100);
				}else {
					qm.books = Array.from(qm.bookSet)
					qm.currentPage.book = qm.books[0]
					qm.findTypeOne(0, 0)
				}
			})
		},
		findTypeOne(index) {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", qm.currentPage.book);
			Article.setQuery(query).select(["type_one"]).limit(100).offset(index).find().then(res => {
				let titles = res.data.objects;
				titles.forEach(type_one => {
					qm.type_oneSet.add(type_one.type_one);
				})
				if(res.data.meta.next !== null) {
					qm.findTypeOne(index + 100);
				}else {
					qm.type_one = Array.from(qm.type_oneSet)
					qm.currentPage.type_one = qm.type_one[0];
					qm.view('type_one');
					qm.findTypeTwo(0);
				}
			})
		},
		
		findTypeTwo(index) {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", qm.currentPage.book);
			query.compare("type_one", "=", qm.currentPage.type_one);
			Article.setQuery(query).select(["type_two"]).limit(100).offset(index).find().then(res => {
				let titles = res.data.objects;
				titles.forEach(type_two => {
					qm.type_twoSet.add(type_two.type_two);
				})
				if(res.data.meta.next !== null) {
					qm.findTypeTwo(book, 0, index + 100);
				}else {
					qm.type_two = Array.from(qm.type_twoSet)
					qm.currentPage.type_two = qm.type_two[0]
					qm.view('type_two');
					qm.findContent();
				}
			})
		},
		findContent() {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", qm.currentPage.book);
			query.compare("type_one", "=", qm.currentPage.type_one);
			query.compare("type_two", "=", qm.currentPage.type_two);
			Article.setQuery(query).select(["content"]).find().then(res => {
				qm.text = res.data.objects[0].content;
				qm.view('content');
				qm.review();
				window.localStorage.setItem("content", qm.text);
			})
		},
		//转换类型
		changeArt(type) {
			let book = document.getElementById('book');
			let type_one = document.getElementById('type_one');
			let type_two = document.getElementById('type_two');
			if(type === "book") {
				qm.type_oneSet.clear();
				qm.type_twoSet.clear();
				qm.findTypeOne(0);
			}else if(type === "type_one") {
				qm.type_twoSet.clear();
				qm.findTypeTwo(0);
			}else {
				qm.findContent();
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
				qm.type_one.forEach(title => {
					type_one.options.add(new Option(title))
				})
				qm.type_two.forEach(title => {
					type_two.options.add(new Option(title))
				})
			}else if(type === 'type_two'){
				type_two.options.length = 0;
				qm.type_two.forEach(title => {
					type_two.options.add(new Option(title))
				})
			}
			content.innerText = qm.text;
		},
		
		//下一篇
		nextArt() {
			let type_one = document.getElementById('type_one');
			let type_two = document.getElementById('type_two');
			let book = document.getElementById('book');
			if(type_two.selectedIndex < type_two.options.length - 1) {
				type_two.selectedIndex = type_two.selectedIndex + 1
				qm.currentPage.type_two = type_two.value;
				qm.changeArt('type_two');
			}else {
				if(type_one.selectedIndex < type_one.options.length - 1) {
					type_one.selectedIndex = type_one.selectedIndex + 1;
					qm.currentPage.type_one = type_one.value;
					qm.changeArt('type_one');
				}else {
					if(book.selectedIndex < book.options.length -1) {
						book.selectedIndex = book.selectedIndex + 1;
						qm.currentPage.book = book.value;
						qm.changeArt('book');
					}else {
						book.selectedIndex = 0;
						qm.currentPage.book = book.value;
						qm.changeArt('book');
					}
				}
			}
		},
		
		//X跳问题
		setSelector(id) {
			let selector = document.getElementById('selector' + (id + 1));
			selector.options.length = 0;
			for(let i = 0;i < qm.graphs[id].length;i++) {
				let option = new Option(qm.num[id + 1] + '跳问题' + (i + 1));
				selector.add(option);
			}
		},
		review() {
			let BaaS = window.BaaS;
			let query = new BaaS.Query();
			BaaS.init("f60a22fc371e94017d49");
			let Article = new BaaS.TableObject("article");
			query.compare("book_type", "=", qm.currentPage.book);
			query.compare("type_one", "=", qm.currentPage.type_one);
			query.compare("type_two", "=", qm.currentPage.type_two);
			Article.setQuery(query).select(["id"]).find().then(res => {
				let articleId = res.data.objects[0].id;
				let graphTable = new BaaS.TableObject("nhop_graph");
				let graphQuery = new BaaS.Query();
				graphQuery.compare("article_id", "=", articleId);
				graphTable.setQuery(graphQuery).select(["graph", "n_hop"]).find().then(graphRes => {
					console.log(graphRes.data.objects[0]);
					let nodes = graphRes.data.objects;
					console.log('在这里')
					console.log(nodes)
					let i = 0;
					for(;i<5;i++) {
						let currentNode = null;
						for(let j = 0;j < nodes.length;j++) {
							if(nodes[j].n_hop === (i + 1)) {
								currentNode = nodes[j];
								console.log("here")
								console.log(currentNode)
								break;
							}
						}
						if(currentNode === null) {
							qm.graphs[i] = null;
							let selector = document.getElementById('selector' + (i + 1));
							selector.options.length = 0;
							selector.add(new Option(qm.num[i + 1] + "跳问题"));
							qm.draw(i);
							continue;
						}
						let graphJson = JSON.parse(currentNode.graph);
						console.log('在这里2')
					  console.log(graphJson)
						qm.graphs[i] = qm.sort(graphJson, currentNode.n_hop);
						qm.draw(i);
						qm.setSelector(i)
					}
				})
			})
		},
		addLine(index) {
			let border = $('.question_border')[index];
			if(qm.currentQuestions[index] == undefined) {
				qm.currentQuestions[index] = 3;
			}else if(qm.currentQuestions[index] >= 8){     // 在此修改最大添加问题数
				alert("问题数已达到上限！");
				return;
			}
			let lable = document.createElement('lable');
			lable.classList.add('lable');
			lable.innerText = "问句" + qm.num[++qm.currentQuestions[index]] + " ";
			lable.setAttribute("style","margin-top: 12px;");
			// let input = document.createElement('input');
			let input = document.createElement('textarea');
			input.classList.add('qin');
			input.setAttribute('placeHolder', "输入");
			input.setAttribute('rows', "2");
			input.setAttribute('cols', "10");
			input.setAttribute('style', "resize: none;");
			lable.appendChild(input);
			border.appendChild(lable);
		}
		
	},
	
	mounted() {
		
		this.findBook(0);
	}
})