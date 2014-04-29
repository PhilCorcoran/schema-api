var path=require('path'),
fs=require('fs');

module.exports=function(options){
	options =options || {};
	var nickname=options.nickname || 'nickname';
	var schemaFile=options.schema ||  path.join(path.dirname(process.mainModule.filename),'apiSchema.json');
	
	return function (req,res,next){
		if('development' !== process.env.NODE_ENV){
			return next();
		}
		res.setHeader('Access-Control-Allow-Origin', '*');
		if('GET'!==req.method){
			return next();
		}
		var apiURL='/schema/'+nickname;
		if('/schema'!=req.url && apiURL !==req.url){
			return next();
		}
		var data=fs.readFileSync(schemaFile);
		res.setHeader('Content-Type', 'application/json');
		res.send(data);
	}
}