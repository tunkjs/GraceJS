define(['oop/package/var/requiredPackages','oop/package/class/var/_behavior','oop/package/class/behavior/event','oop/package/class/behavior/util'], function(requiredPackages,_behavior) {
	
	
	function Class(cons,behavior,proto){
		//获取类名
		var name=cons.prototype.constructor.name;
		if(!name) throw new Error('the constructor should be named.');
		//维护代码干净，添加行为属性存储行为信息
		cons.prototype.BEHAVIOR=behavior;
		//设置原型
		for(var x in proto) cons.prototype[x]=proto[x];
		//行为在类构建期执行的行为
		
		for(var x in behavior) _behavior[x].Build(behavior[x],cons);
		
		
		
		
		function Constructor(){
			//var new cons
			var me;//为了使对象实例带有构造函数的特性，不使用常规的继承实现，最多支持5个参数
			switch(arguments.length){
				case 0:
				me=new cons();
				break;case 1:
				me=new cons(arguments[0]);
				break;case 2:
				me=new cons(arguments[0],arguments[1]);
				break;case 3:
				me=new cons(arguments[0],arguments[1],arguments[2]);
				break;case 4:
				me=new cons(arguments[0],arguments[1],arguments[2],arguments[3]);
				break;case 5:
				me=new cons(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);
				break;
			}
			
			for(var x in behavior) _behavior[x].Init(behavior[x],me);
			
			return me;
			
		}
		
		
		
		
		
		
		
		
		
		this.classes[name]= Constructor;
		
		
		
		
	}
	
	
	
	
	return Class;
});

