define(['oop/package/var/packages','oop/package/class/var/_behavior','oop/package/class/behavior/event','oop/package/class/behavior/util','oop/package/class/behavior/dataset','oop/package/class/behavior/subscribe'], function(packages,_behavior) {
	
	/*
		@options 	string	Extend:pkgName.className
							Rebuild:pkgName.className
							Partial:className
					object	{Extend:Class.PKG.pkgName.className,Partial:'className'}
		
	*/
	
	//类构造器
	function Class(){
		
		var options,name,cons,behavior,proto,that=this;
		
		var args=arguments,tmp,keys,extend,arg,c;
		
		//判别传入构件
		argsLoop:{
			for(var i=0,len=args.length;i<len;i++){
				
				arg=args[i];
				if(typeof arg =='undefined') continue;
				c=arg.constructor;
				tmp=null;
				
				if(c==String){//判定
					if(arg.indexOf(':')==-1) {
						name=arg;
						continue;
					}
					tmp=arg.split(':');
					options={};
					if(tmp[1].indexOf('.')==-1) {
						if(tmp[0]!='Partial') options[tmp[0]]=this.scope[tmp[1]];
						else {
							options[tmp[0]]=tmp[1];
							name=tmp[1];
						}
					}else {
						var t=tmp[1].split('.');
						options[tmp[0]]=this.Class.PKG[t[0]][t[1]];
					}
				}else if(c==Function){//判定
					cons=arg;
				}else if(c==Object){
					
					extend='Extend';
					if(!arg[extend]) extend='Rebuild';
					if(!arg[extend])extend=null;
					
					if(extend||arg['Partial']||arg['Name']){
						options=arg;
						if(arg['Name'])name=arg['Name'];
						if(extend){
							if(arg[extend].constructor==String){
								if(arg[extend].indexOf('.')==-1) options[extend]=this.scope[arg[extend]];
								else {
									tmp=arg[extend].split('.');
									options[extend]=this.Class.PKG[tmp[0]][tmp[1]];
								}
							}
						}
						if(arg['Partial'])name=arg['Partial'];
						
					}else{
						keys=Object.keys(arg);
						keysLoop:{
							for(var j=0,l=keys.length;j<l;j++){
								if(keys[j] in _behavior) {
									behavior=arg;
									break keysLoop;
								}
							}
							proto=arg;
						}
					}
				}
			}
		}
		
		if(cons||behavior){//构成原型类条件
			//获取类名 
			if(cons){
				if(!name) 
					name=cons.prototype.constructor.name;
				
			}else {
				cons=function (){};//应该使用文件名命名
				cons.EMPTY=true;
			}
		}
		
		//Partial处理
		if(options&&options['Partial']){
			name=options['Partial'];
			options['Name']=name;
			var part=this.partial[name]=this.partial[name]||{};
			part.options=$.extend(part.options||{},options);
			if(cons&&(part.cons&&part.cons.EMPTY===true||!part.cons)) part.cons=cons;
			if(behavior) {
				for(var x in behavior) {
					if(!part.behavior) part.behavior={};
					part.behavior[x]=$.extend(part.behavior[x]||{},behavior[x]);
				}
			}
			if(proto) part.proto=$.extend(part.proto||{},proto);
			
			if(cons&&!cons.EMPTY||options['Extend']&&options['Extend'].constructor==Function) {
				//对象创建时执行构造
				this.scope[name]=this.Class[name]=this.classes[name]=function(){
					//删除局部类标识，执行构造
					delete part.options.Partial;
					var c=Class.call(that,part.options,part.cons,part.behavior,part.proto);
					switch(arguments.length){
						case 0:
						return new c();
						break;case 1:
						return new c(arguments[0]);
						break;case 2:
						return new c(arguments[0],arguments[1]);
						break;case 3:
						return new c(arguments[0],arguments[1],arguments[2]);
						break;
					}
				}
				
			}else if(!this.classes[name]&&!cons&&!part.cons&&proto){
				this.scope[name]=this.Class[name]=this.classes[name]=part.proto;
			}
			return;
		}
		
		//继承处理
		if(extend){
			var _cons,_behav,beh;
			_cons=options[extend].prototype.constructor;
			if(_cons){//如果是原型类
				_behav=options[extend].prototype.BEHAVIOR;
				if(_behav){
					if(options.Behavior) {
						beh=options.Behavior;
						if(beh.constructor==String) beh=beh.replace(/\s/g,'').split(/[\,]/g);
					}else beh=Object.keys(_behavior);
					//根据继承行为种类进行拷贝构件
					tmp={};//二层克隆
					for(var i=0,len=beh.length;i<len;i++)
						tmp[beh[i]]=_.extend({},_behav[beh[i]]||{},behavior[beh[i]]||{});
					behavior=_.extend({},behavior||{},tmp);
					if(!Object.keys(behavior).length) behavior=null;
				}
				proto=_.extend({},options[extend].prototype||{},proto||{});
				if(!Object.keys(proto).length) proto=null;
				
			}else{//如果是静态类
				proto=_.extend({},options[extend]||{},proto||{});
				if(!Object.keys(proto).length) proto=null;
			}
		}
		
		//构造器处理
		if(cons){
			if(proto) for(var x in proto) Constructor.prototype[x]=proto[x];
			
			if(_cons) Constructor.prototype.BASECLASS=_cons.prototype.PACKAGE+'.'+_cons.prototype.NAME;
			
			Constructor.prototype.Base=options[extend].prototype;
			
			if(behavior) {
				//维护代码干净，添加行为属性存储行为信息
				Constructor.prototype.BEHAVIOR=behavior;
				//行为在类构建期执行的行
				for(var x in behavior) _behavior[x].Build(behavior[x],Constructor);
			}else delete Constructor.prototype.BEHAVIOR;
			
			if(name) Constructor.prototype.NAME=name;
			else delete Constructor.prototype.NAME;
			
			Constructor.prototype.PACKAGE=this.name;
			Constructor.prototype.CONSTRUCTOR=cons;
			Constructor.prototype.constructor=Constructor;
			
			if(name){
				this.scope[name]=this.Class[name]=this.classes[name]= Constructor;
			}
			
			return Constructor;
		}else{
			if(name){
				this.scope[name]=this.Class[name]=this.classes[name]= proto;
			}
			return proto;
		}
		
		
		
		function Constructor(){
			// Extend ： 方法重载，执行子类初始化！！！！！
			// Rebuilt： 仅执行子类初始化 
			if(extend=='Extend'&&_cons){
				var me;
				switch(arguments.length){
					case 0:
					me=new _cons();
					break;case 1:
					me=new _cons(arguments[0]);
					break;case 2:
					me=new _cons(arguments[0],arguments[1]);
					break;case 3:
					me=new _cons(arguments[0],arguments[1],arguments[2]);
					break;
				}
				for(var x in me) if(me.hasOwnProperty(x)) this[x]=me[x];
				
			}
			
			switch(arguments.length){
				case 0:
				cons.call(this);
				break;case 1:
				cons.call(this,arguments[0]);
				break;case 2:
				cons.call(this,arguments[0],arguments[1]);
				break;case 3:
				cons.call(this,arguments[0],arguments[1],arguments[2]);
				break;
			}
			
			if(behavior) for(var x in behavior) _behavior[x].Init(behavior[x],this);
			
			return this;
			
		}
		
	}
	
	
	
	
	return Class;
});

