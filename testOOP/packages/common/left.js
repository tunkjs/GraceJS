G.Package([],function (Class, $) {
	//load的callback需要等待所有js加载后才能执行
	Class(function left() {
		setTimeout(function(){
			Class.Load(['base'],function(C,$){
				//console.log('base:');
				//console.log(C);
			});
		},3000);
	}, {
		//行为定义
		
	}, {
		//方法
		
	});
	Class(function view() {
		
	}, {
		//行为定义
		
	}, {
		//方法
		
	});
	
});
	