define([],function(){window.TPL=window.TPL||{}; window.TPL["test"]=function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<!doctype html>\r\n<html>\r\n<head>\r\n<meta charset="utf-8">\r\n<title>无标题文档</title>\r\n<script src="compose.js"></script>\r\n<script type="text/javascript">\r\nfunction DD(){}\r\nDD.prototype=new Date();\r\n\r\nfunction SS(){this.ss="!!";}\r\nSS.prototype=new String(\'asdasdasd\');\r\nSS.prototype.alertSS=function(){alert(this.ss);}\r\n\r\nfunction SSS(){this.sss="!!!!!!"}\r\nSSS.prototype=new SS();\r\nSSS.prototype.alertSSS=function(){alert(this.sss);}\r\n\r\n\r\nfunction extend(cons,proto){\r\n\t//\'some/class/path:method\'\r\n\tfor(var x in proto) cons.prototype[x]=proto[x];\r\n\treturn cons;\r\n\t\r\n}\r\nfunction rebuilt(base,cons,proto){\r\n\t\r\n\tvar pr=base.prototype;\r\n\tfor(var x in pr) cons.prototype[x]=pr[x];\r\n\tfor(var x in proto) cons.prototype[x]=proto[x];\r\n\tcons.prototype.baseProto=pr;\r\n\treturn ;\r\n\t\r\n}\r\nfunction inherit(base,cons,proto){\r\n\tfunction Constructor(){\r\n\t\tvar args=arguments;\r\n\t\tif(args.length==0)this.base=new base();\r\n\t\telse if(args.length==1)this.base=new base(args[0]);\r\n\t\telse if(args.length==2)this.base=new base(args[0],args[1]);\r\n\t\telse if(args.length==3)this.base=new base(args[0],args[1],args[2]);\r\n\t\t\r\n\t\tcons.apply(this,args);\r\n\t\treturn this;\r\n\t}\r\n\t//原型准备就绪\r\n\tvar pr=base.prototype;\r\n\tfor(var x in pr) Constructor.prototype[x]=pr[x];\r\n\tfor(var x in proto) Constructor.prototype[x]=proto[x];\r\n\t\r\n}\r\n\r\n</script>\r\n</head>\r\n\r\n<body>\r\n</body>\r\n</html>\r\n';
}
return __p;
 function _escape(string) {if (string == null) return ''; return ('' + string).replace(new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'), function(match) {return {'&': '&amp;','<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#x27;','/': '&#x2F;'}[match]; });};};})