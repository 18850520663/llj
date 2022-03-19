function kg1Draw(btnVal) {
	 	var myChart = echarts.init(document.querySelector("#tab1"));
	 	var option;
		var ROOT_PATH = "http://106.52.142.195:7474/kggraph1?question=";
	 	myChart.showLoading();
	 	ROOT_PATH += btnVal;
		console.log(btnVal)
		console.log(ROOT_PATH);
	 	$.getJSON(ROOT_PATH,function(graph) {
	 		myChart.hideLoading();
	 		document.getElementById("introName").textContent= graph.nodes[0].name;
	 		console.log(graph.nodes);
			option = {
	 			title: {
	 				text: '知识图谱',
	 				subtext: 'Default layout',
	 				top: 'bottom',
	 				left: 'right'
	 			},
	 			tooltip: {
	 				 formatter: function(x) {
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
	 					// 还原
	 					restore: {
	 						show: true
	 					},
	 					// 保存为图片
	 					saveAsImage: {
	 						show: true
	 					}
	 				}
	 			},
	 			legend: [{
	 				// selectedMode: 'single',
	 				data: graph.categories.map(function(a) {
	 					return a.name;
	 				})
	 			}],
	 			animationDuration: 1500,
	 			animationEasingUpdate: 'quinticInOut',
	 			series: [{
	 				// name: '知识图谱',
	 				data: graph.nodes,
	 				links: graph.links,
	 				categories: graph.categories,
	 				type: 'graph',
	 				layout: 'force',
	 				force: {
	 					repulsion: 200,
	 					edgeLength: 120,
	 				},
	 				roam: true,
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
	 					fontSize:16,
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
	 		window.addEventListener("resize", function() {
	 			myChart.resize();
	 		})
	 	})
	 }
function kg2Draw(btnVal){
	
}
function kg3Draw(btnVal){
	
}