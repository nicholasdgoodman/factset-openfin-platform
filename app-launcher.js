const runtime = require('hadouken-js-adapter');

module.exports = (api, options) => {
    const { serve } = api.service.commands;
    const serveFn = serve.fn;
    
    serve.fn = async (...args) => {
        let result = await serveFn(...args);

        let { url } = result;
        
        await runtime.launch({ manifestUrl: `${url}app.json` });

        return result;
    }
}
