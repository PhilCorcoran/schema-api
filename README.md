schema-api
==========

Serves up a JSON definition of a REST API. Enables self documenting services. Validates data against a JSON schema using tv4


# Examples

```js

var schemaAPI = require('schema-api')({
    nickname: 'PetService',
    validation: true
});

var app=express();
//validate the data returned from the database against the 'Cat' model using tv4
app.get('/cat.json', loadDatafromDB(), schemaAPI.validate('Cat'),handleErr);
```

The API schema will be served at ``/schema`` and ``/schema/PetService``. The second url means that the ``Swagger-UI`` will display the nickname clearly.(https://github.com/wordnik/swagger-ui)
This is useful if you are developing a set of micro services which may be deployed on different servers and domains. Each service can serve up a definition of its own API and this will work cross-domain. In production the API schema is not served and the ``Access-Control-Allow-Origin`` header is not set.

# Options
``nickname`` the name of the service shown by Swagger-UI and the also the final part of the url.  
``schema`` the path to the schema which defaults to ``apiSchema.json`` in the same directory as the main module.  
``validation`` indicates that you will use tv4 JSON validation. The ``models`` will be loaded from your schema file at startup.



## Release History
|Version|Date|Description|
|:--:|:--:|:--|
|v0.2.0|2014-08-22| TV4 JSON validation |
|v0.1.2|2014-05-07| Add Options request for Swagger UI in CORS situation |
|v0.1.1|2014-04-30| Access-Control-Allow-Headers |
|v0.1.0|2014-04-29| Initial Version|
# License 

(The MIT License)
