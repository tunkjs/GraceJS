define(['function/JSONClone'], function (JSONClone) {

	function DSEvent() {
		this.handle = {
			//仅当前节点的更新会触发事件
			'path1/path2' : {
				all : {
					//namespace:[callback1,callback2],
				},
			},
			//关联事件，关联所有子节点的更新
			'path1/path2/' : {
				delete : {
					//namespace:[callback1,callback2],
				},
			},
		};
	}

	DSEvent.prototype = {
		constructor : DSEvent,
		//固定参数调用
		add : function (path, event, namespace, callback) {
			if(arguments.length!=4) throw new Error('lack of some parametters');
			path = path.replace(/\s/ig, '');
			namespace = namespace||'none';
			event = event||'all';
			var hs = this.handle[path] = this.handle[path] || {};

			var ev = hs[event]=hs[event] || {};
			var ns = ev[namespace]=ev[namespace] || [];
			ns.push(callback);
		},
		//删除委托事件//固定参数调用
		del : function (path, event, namespace) {
			if(arguments.length!=3) throw new Error('lack of some parametters');
			path = path.replace(/\s/ig, '');
			namespace = namespace||'none';
			event = event||'all';

			var hs = this.handle[path];
			if (hs) {
				if (event == 'all')
					if (namespace == 'none')
						delete this.handle[path];
					else
						for (var x in hs) {
							delete hs[x][namespace];
						}
				else {
					if (namespace == 'none') {
						delete hs[event];
					} else {
						if (hs[event])
							delete hs[event][namespace];
					}
				}
			}
		},

		trigger : function (e) {
			var path=e.path.replace(/\s/ig, ''), event=e.event, namespace=e.namespace;
			
			if (!namespace && !event) {
				namespace = 'none';
				event = 'all';
			} else if (!namespace) {
				namespace = 'none';
			}
			//是否作用于所有子节点
			var isExtend = path.lastIndexOf('/') == path.length - 1;
			if (isExtend){
				e.currentPath = path;
				e.handle=this.handle[path];
				if(e.handle)_trigger(e);
			}
			var p = path.split('/');
			if (isExtend)
				p.pop();
			//事件冒泡
			while (p.length) {
				e.currentPath=p.join('/');
				e.handle=this.handle[e.currentPath];
				if(e.handle)_trigger(e);
				p.pop();
				if (p.length){
					e.currentPath=p.join('/')+ '/';
					e.handle=this.handle[e.currentPath];
					if(e.handle)_trigger(e);
				}else {
					
				}
			}
		},

	};
	function _trigger(e) {
		
	var handles=e.handle, path=e.path, event=e.event, namespace=e.namespace;
	e=JSONClone(e);
	delete e['handle'];
		var es,
		ns,
		x,
		y;
		if (handles) {
			if (event == 'all') { //all事件不会引起其他事件的触发
				if (namespace == 'none') {
					if (ns = handles['all'])
						for (x in ns)
							ns[x].forEach(function (fn) {
								fn(e);
							});
				} else {
					(ns = handles['all']) && ns[namespace] && ns[namespace].forEach(function (fn) {
						fn(e);
					});
				}
			} else {
				if (namespace == 'none') {
					if (ns = handles[event])
						for (x in ns)
							ns[x].forEach(function (fn) {
								fn(e);
							});
					//任何其他事件的触发都会引起事件all触发
					if (ns = handles['all'])
						for (x in ns)
							ns[x].forEach(function (fn) {
								fn(e)
							});
				} else {
					if (ns = handles[event])
						ns[namespace] && ns[namespace].forEach(function (fn) {
							fn(e)
						});
					//任何其他事件的触发都会引起事件all触发
					if (ns = handles['all'])
						ns[namespace] && ns[namespace].forEach(function (fn) {
							fn(e)
						});
				}

			}
		}
	}
	
	return DSEvent;

});
