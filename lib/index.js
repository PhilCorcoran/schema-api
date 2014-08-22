var fs = require('fs'),
    path = require('path'),
    tv4 = require('tv4');

module.exports = AS;

function AS(options) {
    if (!(this instanceof AS)) return new AS(options);
    options = options || {};
    this.nickname = options.nickname || 'nickname';
    this.schemaFile = options.schema || path.join(path.dirname(process.mainModule.filename), 'apiSchema.json');
    if (options.validation && options.validation == true) {
        this.models = (JSON.parse(fs.readFileSync(this.schemaFile))).models;
        if(!this.models){
            throw new Error('Validation was set to true but no models exist in file: '+this.schemaFile);
        }
    }
}

AS.prototype.serve = function() {
    var self = this;
    return function servit(req, res, next) {
        if ('development' !== process.env.NODE_ENV) {
            return next();
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Location,Content-Type');
        if ('OPTIONS' === req.method) {
            return res.send({
                status: 'OK'
            }); // swagger-ui makes an options request in CORS situations.
        }
        if ('GET' !== req.method) {
            return next();
        }
        var apiURL = '/schema/' + self.nickname;
        if ('/schema' != req.url && apiURL !== req.url) {
            return next();
        }
        var data = fs.readFileSync(self.schemaFile);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    }
}
AS.prototype.validate = function(model) {
    var self = this;
    return function validtv4(req, res, next) {
        console.log('validtv4()');
        if (!res.locals.data) {
            console.log('no res.locals.data');
            return next(new Error('No data to validate'));
        }
        var schema = self.models[model];
        if (!schema) {
            console.log('apiSchema has no such model:%s', model);
            return next(new Error('No model to validate'));
        }
        var data = res.locals.data;
        var result = tv4.validateResult(data, schema);
        if (!result.valid || result.valid != true) {
            console.log('Tv4 validation failed:%s', JSON.stringify(result));
            return next(new Error('Invalid data'));
        }
        return next();
    }
}
