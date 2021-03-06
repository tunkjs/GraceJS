define(['g','_/array'], function(g,array) {
	
	/*
		
		以数据为中心，实现简单的数据检索，数据事件绑定
		
	*/
	
	
	
	function ArrayModel(data){
		for(var i=0,l=data.length;i<l;i++) this[i]=data[i];
		this.length=data.length;
		
	}
	
	ArrayModel.prototype={
		
		constructor:ArrayModel,
		
		pop:Array.prototype.pop,
		push:Array.prototype.push,
		shift:Array.prototype.shift,
		unshift:Array.prototype.unshift,
		
		concat:Array.prototype.concat,
		
		indexOf:Array.prototype.indexOf,
		lastIndexOf:Array.prototype.lastIndexOf,
		
		
		reverse:Array.prototype.reverse,
		
		splice:Array.prototype.splice,
		slice:Array.prototype.slice,
		
		toArray:function(){
			return this.slice();
		},
		toString:function(){
			
		},
		
		clone:function(){},
		
		
	};
	
	for(var x in array) (function(x,func){
			ArrayModel.prototype[x]=function(){
				if(arguments.length==1) return func(this,arguments[0]);
				else return func(this);
			};
		})(x,g.array[x]);
		
		
	return ArrayModel;
	
});