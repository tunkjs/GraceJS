//抽象定义

G.Page('header',
	function(id){
		this.PLObj={};//私有不公开的属性
		this.id=id;
		//this.init();
	},{
		dataset:['{id}',{
			Count:0,
		}],
		subscribe:{
			'PLinit{id}':'action',
			init:function(m){
				$('#'+this.id).html($('#'+this.id).html()+m);
			},
		},
		util:{
			'util:PL':function(el,p){},
		},
		event:{
			//'click body@#{id}':'clickThis',
		}
	},{
		'#{id}':function(el,ds){
			//G.__.open(1);
			G.__.log('<br/><a id="'+this.id+'" href="#PLinit'+this.id+':'+this.id+'/init:OOOOOO?????">'+this.id+'</a><br/><a id="'+this.id+'" href="#PLinit'+this.id+':'+this.id+'/init:OOOOOO?????">'+this.id+'</a>');
			if(!el.length) 
				this.$('body').append('<br/><a id="'+this.id+'" href="#PLinit'+this.id+':'+this.id+'/init:OOOOOO?????">'+this.id+'</a><br/><a id="'+this.id+'" href="#PLinit'+this.id+':'+this.id+'/init:OOOOOO?????">'+this.id+'</a>');
		},
	},{
		loadPage:function(s,options){},
		init:function(){
			$('#'+this.id).html('OKOKOKOK!!');
		},
		clickThis:function(el,e,ds){
			this.publish('PLinit'+this.id,this.id);
		},
		action:function(m){
			var d=this.DS('header/'+this.id);
			var c=parseInt(d.get('Count'));
			d.set('Count',c+1);
			this.$('#'+m).chznText(c+1);
		}
	}
);