define(['g','./event_dom','./event_router','./event_storage','oop/events'], function(g,event_dom,event_router,event_storage,events) {

	
	
	
	var event={
		__blacklist__:['_eventInit'],
		_eventInit:function(){
			if(this.Event){
				
			}
		},
		
		on:function(path){
			
		},
		
		off:function(){},
		
		once:function(){},
		
		trigger:function(){},
		
		
		
	};
	
	function getType(key){
		
		return ;
	}
	
	return event;
	
	
	
	
	
	
	
	
	
	
	
	
	//事件函数绑定执行
	function bind(that,path){
		var ev=that.BEHAVIOR.Event;
		
		var handle=ev[path];
		
		path=fixPath(path,that);
		
		var index=path.indexOf(' ');
		
		if(index>-1){
			if(handle.constructor==String)handle=that[handle];
			else handle=function($el,e){handle.call(that,$el,e)};
			var etype=path.substr(0,index);
			var dom=path.substr(index+1).split('@');//
			//如果dom事件有委托
			if(dom.length==2)
				$(dom[0]).on(etype,dom[1],function(e){
					handle($(this),e);
				});
			else if(dom.length==1)//如果dom事件没有委托
				$(dom[0]).on(etype,function(e){
					handle($(this),e);
				});
		}else{
			if(handle.constructor==String)handle=that[handle];
			that.event=that.event||{};
			that.event[path]=handle;
		}
		
	}
	

	
	return _behavior;
});