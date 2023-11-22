Blockly.Blocks['generateHttpRequestJson'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Generate HTTP Request");

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("HTTP Method")
            .appendField(new Blockly.FieldDropdown([["GET", "GET"], ["POST", "POST"]]), "Method"); // add more as needed

        this.appendValueInput("URL")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("URL");

        this.appendValueInput("Headers")
            .setCheck("Object")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Headers (JSON)");

        this.appendValueInput("Parameters")
            .setCheck("Object")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Parameters (JSON)");

        this.appendValueInput("Data")
            .setCheck("Object")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Data (JSON)");

        this.setOutput(false, "Object");
        this.setColour("rgb(52, 168, 83)");    
        this.setTooltip("Generate JSON for an HTTP request.");
        this.setHelpUrl("");
    }
};

// Generate code block
Blockly.JavaScript['generateHttpRequestJson'] = function (block) {
    var method = block.getFieldValue('Method');
    var value_url = Blockly.JavaScript.valueToCode(block, 'URL', Blockly.JavaScript.ORDER_ATOMIC);
    var value_headers = Blockly.JavaScript.valueToCode(block, 'Headers', Blockly.JavaScript.ORDER_ATOMIC);
    var value_parameters = Blockly.JavaScript.valueToCode(block, 'Parameters', Blockly.JavaScript.ORDER_ATOMIC);
    var value_data = Blockly.JavaScript.valueToCode(block, 'Data', Blockly.JavaScript.ORDER_ATOMIC);

    // Generate the JSON object for the HTTP request.
    var code = '{\n';
    if (value_url) {
        code += '  "url": "' + value_url + '",\n';
    }
    if (value_headers) {
        code += '  "headers": ' + value_headers + ',\n';
    }
    if (value_parameters) {
        code += '  "parameters": ' + value_parameters + ',\n';
    }
    if (value_data) {
        code += '  "data": ' + value_data + ',\n';
    }
    code += '  "method": "' + method + '"\n';
    code += '}';

    return code;  // Return the generated code as a string.
};

Blockly.Blocks['http_request_url'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("URL")
            .appendField(new Blockly.FieldTextInput("https://example.com"), "URL");
        this.setOutput(true, "String");
        this.setColour("rgb(66, 133, 244)");
        this.setTooltip("Input for the URL of the HTTP request.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['http_request_url'] = function (block) {
    var url = block.getFieldValue('URL');
    return [url, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['http_request_headers'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Headers (JSON)")
            .appendField(new Blockly.FieldTextInput('{"Content-Type": "application/json"}'), "Headers");
        this.setOutput(true, "Object");
        this.setColour(230);
        this.setTooltip("Input for the headers (JSON) of the HTTP request.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['http_request_headers'] = function(block) {
    var headers = block.getFieldValue('Headers');
    try {
        var parsedHeaders = JSON.parse(headers);
        var headersCode = JSON.stringify(parsedHeaders);
    } catch (e) {
        console.error("Invalid JSON format for headers: " + headers);
        var headersCode = "{}";
    }
    return [headersCode, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['http_request_parameters'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Parameters (JSON)")
            .appendField(new Blockly.FieldTextInput('{"param1": "value1", "param2": "value2"}'), "Parameters");
        this.setOutput(true, "Object");
        this.setColour("rgb(251, 188, 5)"); 
        this.setTooltip("Input for the parameters (JSON) of the HTTP request.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['http_request_parameters'] = function (block) {
    var parameters = block.getFieldValue('Parameters');
    try {
        var parsedParameters = JSON.parse(parameters);
        return [JSON.stringify(parsedParameters), Blockly.JavaScript.ORDER_ATOMIC];
    } catch (e) {
        console.error("Invalid JSON format for parameters: " + parameters);
        return ["{}", Blockly.JavaScript.ORDER_ATOMIC];
    }
};

Blockly.Blocks['http_request_data'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Data (JSON)")
            .appendField(new Blockly.FieldTextInput('{"key1": "value1", "key2": "value2"}'), "Data");
        this.setOutput(true, "Object");
        this.setColour("rgb(142, 36, 170)");
        this.setTooltip("Input for the data (JSON) of the HTTP request.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['http_request_data'] = function (block) {
    var data = block.getFieldValue('Data');
    try {
        var parsedData = JSON.parse(data);
        return [JSON.stringify(parsedData), Blockly.JavaScript.ORDER_ATOMIC];
    } catch (e) {
        console.error("Invalid JSON format for data: " + data);
        return ["{}", Blockly.JavaScript.ORDER_ATOMIC];
    }
};