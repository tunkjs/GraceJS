define(['g', 'oop/base','./common/css','_/utils','_/is'],
function (g, Base, Css) {

	
	
	var BaseFactory=g.Base.Factory;
	
	var WidgetFactory=g.Class(function WidgetFactory(){},{
		Inherit:BaseFactory,
		extend:function(){
			WidgetFactory.Super.extend.call(this);
			this.extends.push(Css);
			this.extends.push({ 
				__type__ : 'WIDGET', 
				destroy : function () { 
					this.el=null; 
					this.off(); 
					for (var p in this) { 
						if (this.hasOwnProperty(p)) { 
							delete this[p]; 
						} 
					} 
					this.destroy = function () {}; 
				} 
			}); 
		}, 
		toExtend:function(){
			WidgetFactory.Super.toExtend.call(this);
			this.Constructor.prototype.__blacklist__=['__type__'];
			//this.Constructor.prototype.__extendlist__=['options'];
		},
		makeConstructor_ : function () { 
			if (this.parent !== this.Empty && this.parent != this.constr){ 
				Widget.prototype.__name__ = this.name; 
				var obj=this.constructorCallback(); 
				function Widget() { 
					g.utils.call(this,arguments,obj); 
				} 
				this.Constructor=Class; 
			}else this.Constructor =  this.constr; 
		}, 
		
		
		construct:function(configs){ 
			WidgetFactory.Super.construct.call(this,configs);
			this._cssInit();
			
		}, 
		
		implement:function(){ 
			WidgetFactory.Super.implement.call(this);
			
		},
		
		
	});
	
	
	
	
	var wf=new WidgetFactory(1);
	
	g.Widget = function(){ 
		return wf.create(arguments[0],arguments[1]);
	};
	g.Widget.Factory=WidgetFactory;
	return g.Base;
});
