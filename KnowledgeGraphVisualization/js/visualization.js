//立即执行函数
(function() {
	var myChart = echarts.init(document.querySelector("#tab2"));
	var option = {
		title: {
			text: "“壮族”关联实体三元组数量",
			top: 'bottom',
			left: 'right'
		},
		color: ["#3398D8"],
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow"
			}
		},
		toolbox: {
			// 显示工具箱
			show: true,
			feature: {
				mark: {
					show: true
				},
				// 保存为图片
				saveAsImage: {
					show: true
				}
			}
		},

		xAxis: {
			type: 'category',
			data: ['农产品', '壮族人', '牛魂节', '壮锦', '桂林山水', '铜鼓', '广西壮族自治区']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			type: "bar",
			// data:[JSON.stringify(my_data.dataKg2)]
			
			
			
			
			
			data: [3, 10, 1, 1, 1, 1, 1]
		}]
	};
	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	})
})();

// #tab1：知识图谱
(function() {
	var myChart = echarts.init(document.querySelector("#tab1"));
	var option;
	myChart.showLoading();   // 开启 loading 效果（异步加载需要一段时间）
	// ROOT_PATH + '/data/asset/data/les-miserables.json'
	$.getJSON(kg0, function(graph) {
		myChart.hideLoading();   // 隐藏 loading 效果（数据加载完成后）
		console.log(graph.nodes);

		// graph.nodes.forEach(function(node) {
		// 	node.label = {
		// 		show: node.symbolSize > 30
		// 	};
		// });
		option = {
			title: {
				text: '知识图谱',
				subtext: 'Default layout',
				top: 'bottom',
				left: 'right'
			},
			tooltip: {
				 formatter: function(x) {   // formatter函数是设定悬浮提示框的数据信息，如果不编辑则echarts默认显示data里面的数据。
				 	return x.data.name;
				 },
			},
			toolbox: {
				// 显示工具箱
				show: true,
				feature: {
					mark: {
						show: true
					},
					// 保存为图片
					saveAsImage: {
						show: true,
					},
					// 还原
					restore: {
						show: true
					}
				}
			},
            // ralations
			legend: [{
				// selectedMode: 'single',
				data: graph.categories.map(function(a) {
					return a.name;
				})
			}],
			animationDuration: 1500,
			animationEasingUpdate: 'quinticInOut',
			// 系列列表
			series: [{
				// name: '知识图谱',数据
				data: graph.nodes,
				links: graph.links,
				categories: graph.categories,
				
				type: 'graph',
				layout: 'force',  // 采用力引导布局
				force: {          // 力引导布局相关的配置项
					repulsion: 200,    // 节点之间的斥力因子
					edgeLength: 120,   // 边的两个节点之间的距离，这个距离也会受 repulsion
				},
				// circular: {  // 采用环形布局
				// 	rotateLabel: true
				// },
				// symbolSize: 40, // 调整节点的大小
				roam: true,    // 是否开启鼠标缩放和平移漫游
				draggable:true,
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

				// label: {
				// 	position: 'right',
				// 	formatter: '{b}'
				// },
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
		window.addEventListener("resize", function() {
			myChart.resize();
		})
	})
})();

(function() {
	var myChart = echarts.init(document.querySelector("#tab3"));
	var option;

	option = {
		title: {
			text: "民族篇关联实体占比",
			top: 'bottom',
			left: 'right'
		},

		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)'
		},
		series: [{
			name: '',
			type: 'pie',
			// radius: [50, 250],  大小
			center: ['50%', '50%'],
			roseType: 'area',
			itemStyle: {
				borderRadius: 8
			},
			// data:[JSON.stringify(my_data.dataKg3)]
			
			
			data: [{
					value: 33,
					name: '中华民族'
				},
				{
					value: 15,
					name: '汉族'
				},
				{
					value: 10,
					name: '满族'
				},
				{
					value: 8,
					name: '回族'
				},
				{
					value: 8,
					name: '苗族'
				},
				{
					value: 10,
					name: '维吾尔族'
				},
				{
					value: 17,
					name: '彝族'
				},
				{
					value: 19,
					name: '蒙古族'
				},
				{
					value: 15,
					name: '藏族'
				},
				{
					value: 19,
					name: '朝鲜族'
				},
				{
					value: 14,
					name: '傣族'
				},
				{
					value: 9,
					name: '高山族'
				}
			]
		}]
	};

	myChart.setOption(option);
	window.addEventListener("resize", function() {
		myChart.resize();
	})

})();
