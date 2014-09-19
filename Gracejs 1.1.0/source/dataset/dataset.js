define(['./DS', './dsevent', 'function/JSONClone', 'function/getObjByPath', 'function/setObjByPath', 'function/delObjByPath'], function (DS, dsevent, JSONClone, getObjByPath, setObjByPath, delObjByPath) {

	function DataSet() {
		//数据岛的数据树
		this.dataset = {};
	}

	DataSet.prototype = {

		initData : function (key, ds) {
			if (ds) {
				return (this.dataset[key] = JSONClone(ds)); //获得对象，强制生成
			}
		},
		getDS : function (path) {
			//返回新的数据树节点实例
			return new DS(path, this.dataset);
		},
		//Dataset事件触发
		trigger : function (path, event) {
			if (!event)
				return;
			var ev = event.split('.'),
			namespace;
			event = ev.shift();
			if (ev.length)
				namespace = ev.join('.')
					dsevent.trigger({
						path : path,
						event : event,
						namespace : namespace || 'none'
					});
		},
		on : function (path, event, namespace, callback) {
			dsevent.add(path, event, namespace, callback);
		},
		off : function (path, event, namespace) {
			dsevent.del(path, event, namespace);
		},
		delete : function (path) {
			var src = delObjByPath(path, this.dataset),
			oldValue = JSONClone(src);

			dsevent.trigger({
				path : path,
				event : 'delete',
				namespace : 'none',
				oldValue : oldValue
			});
		},
		set : function (path, newValue) {
			var src = getObjByPath(path, this.dataset),
			oldValue = JSONClone(src);

			var event = typeof src != 'undefined' ? 'update' : 'create';

			newValue = setObjByPath(path, this.dataset, newValue, 1);

			dsevent.trigger({
				path : path,
				event : event,
				namespace : 'none',
				newValue : newValue,
				oldValue : oldValue
			});
		},
		mix:function(){
			//末尾为/
		},
	}

	return DataSet;
});
