/*auto*/
require(['pcks/common/header','pcks/common/left','utils/chzn'], function () {
	//G.Package('people').Init();
	//加载过程构建本包，构建本包后，开始构建依赖包，叶子节点构建完毕后开始执行
	//可在Require调用callback的时候调用本包初始化，开始加载依赖包
	//包加载后，开始链式执行所有初始化
});

//先加载此基本配置，包名、依赖包、初始化函数
G.Package.Main('common',function(Class,$){//Class不作构建
	console.log(Class);
	$('a').append('ccc');
	
	
	
	
});
	
	/*
		
		
		1. 加载本包，生成完整包，依赖包分别标志是否已经初始化，本包初始化状态标注False
		2. 根据依赖包配置，逐个加载依赖包，每个依赖包加载完后，执行初始化函数
		3. 如果依赖包都执行了初始化，执行本包初始化函数，对本包的初始化标注设置True值
	
		每个包有自己的状态信息，内部的类，依赖信息，还有依赖加载状态，
	
	
	
	*/







