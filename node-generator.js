module.exports = function(RED) {
    function nodeGeneratorNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        //properties field
        this.name = config.name;
        this.desc = config.desc;
        this.require = config.require;
        this.properties = config.properties;
        this.codeBeforeReceivePayload = config.codeBeforeReceivePayload;
        this.codeWhenReceivePayload = config.codeWhenReceivePayload;

        node.on('input', function(msg) {
            msg.payload = {};
            msg.payload.name = this.name;
            msg.filename = '/data/node-creation/lexer-nodered-' + this.name +'/';
            msg.payload.desc = this.desc;
            if(this.require)
                msg.payload.require = this.require.split(',');
            else
                msg.payload.require = {};
            if(this.properties)
                msg.payload.properties = this.properties.split(',');
            else
                msg.payload.properties = {};
            msg.payload.codeBeforeReceivePayload = this.codeBeforeReceivePayload;
            msg.payload.codeWhenReceivePayload = this.codeWhenReceivePayload;
            node.send(msg);
        });
    }
    RED.nodes.registerType("node-generator",nodeGeneratorNode);
}