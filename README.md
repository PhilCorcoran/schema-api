schema-api
==========

Serves up a JSON definition of a REST API. Enables self documenting services.


# Examples

```js
var apiSchema=require('schema-api');
var app = express();
app.use(apiSchema({nickname:'PetService'}));
```

The API schema will be served at ``/schema`` and ``/schema/PetService``. The second url means that the ``Swagger-UI`` will display the nickname clearly.(https://github.com/wordnik/swagger-ui)
This is useful if you are developing a set of micro services which may be deployed on different servers and domains. Each service can serve up a definition of its own API and this will work cross-domain. In production the API schema is not served and the ``Access-Control-Allow-Origin`` header is not set.

# Options
``nickname`` the name of the service shown by Swagger-UI and the also the final part of the url.  
``schema`` the path to the schema which defaults to ``apiSchema.json`` in the same directory as the main module.



## Release History
|Version|Date|Description|
|:--:|:--:|:--|
|v0.1.0|2014-04-29| Initial Version|
|v0.1.1|2014-04-30| Access-Control-Allow-Headers |
|v0.1.2|2014-05-07| Add Options request for Swagger UI in CORS situation |
|v0.1.2|2014-07-09| Allow all methods in development environment |
# License 

(The MIT License)
