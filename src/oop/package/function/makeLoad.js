define(['oop/package/var/requiredPackages','oop/package/var/__require','oop/package/var/loadQueue',],function(requiredPackages,__require,loadQueue){


	function makeLoad(){
		var re=loadQueue[0];
		if(loadQueue.length) {
			var n=re.name[re.loadedLength];
			if(requiredPackages[n]){
				re.loadedLength++;
				if(re.loadedLength==re.length){
					loadQueue.shift();
					re.callback();
					makeLoad()
				}
			}else _load(n);
		}
	}
	
	function _load(name){
		__require([name],function(){});
	}
	
	
	return makeLoad;


});
