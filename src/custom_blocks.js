Blockly.Blocks['generateHttpRequestJson'] = {
    init: function () {
        this.setPreviousStatement(true, 'http_response');

        this.appendDummyInput()
            .appendField("HTTP Request");

        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("HTTP Method")
            .appendField(new Blockly.FieldDropdown([["GET", "GET"], ["POST", "POST"], ["HEAD", "HEAD"], ["PUT", "PUT"], ["DELETE", "DELETE"], ["CONNECT", "CONNECT"], ["OPTIONS", "OPTIONS"], ["TRACE", "TRACE"], ["PATCH", "PATCH"]]), "Method"); // add more as needed

        this.appendValueInput("URL")
            .setCheck("String")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("URL");

        this.appendValueInput("Headers")
            .setCheck("Object")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Headers (JSON)");

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
    var value_data = Blockly.JavaScript.valueToCode(block, 'Data', Blockly.JavaScript.ORDER_ATOMIC);

    // Generate the JSON object for the HTTP request.
    var code = '{\n';
    if (value_url) {
        code += '  "url": "' + value_url + '",\n';
    }
    if (value_headers) {
        code += '  "headers": ' + value_headers + ',\n';
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
        this.setColour("rgb(244, 180, 0)");
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

Blockly.Blocks['http_request_data'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Data (JSON)")
            .appendField(new Blockly.FieldTextInput('{"param1": "value1", "param2": "value2"}'), "Data");
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

/* ===== HTTP RESPONSE VALUES ===== */
// store http resposne data
Blockly.Blocks['http_response'] = {
    init: function() {
        this.appendStatementInput("HTTP_DATA")
            .setCheck(null)
            .appendField("HTTP Response of")
            .appendField(new Blockly.FieldLabel('', 'invisible'), 'HTTP_DATA'); // Adding a FieldLabel named 'HTTP_DATA'

        this.setOutput(true, "HTTP_DATA");
        this.setTooltip("Represents an HTTP response");
        this.setColour("rgb(234, 67, 53)"); 
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['http_response'] = function(block) {
    var httpRequest = Blockly.JavaScript.statementToCode(block, 'HTTP_DATA');
    var labelField = block.getField('HTTP_DATA');
    labelField.setVisible(false); // Hiding the FieldLabel after execution
    return [httpRequest, Blockly.JavaScript.ORDER_ATOMIC]; // Returning as output
};

// print http response data
Blockly.Blocks['print_http_response'] = {
    init: function() {
        this.appendValueInput("HTTP_RESPONSE")
            .setCheck("HTTP_DATA")
            .appendField("Print HTTP Response");
        this.setOutput(true, "HTTP_DATA");
        this.setColour("rgb(100, 100, 100)");
        this.setTooltip("Returns the HTTP Response value");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['print_http_response'] = function(block) {
    var httpResponse = Blockly.JavaScript.valueToCode(block, 'HTTP_RESPONSE', Blockly.JavaScript.ORDER_ATOMIC);
    document.getElementById('outputDiv').innerText = httpResponse;
    return [httpResponse, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.Blocks['parse_response'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Parse HTTP response");
        this.appendValueInput("RESPONSE")
            .setCheck("HTTP_DATA")
            .appendField("Response");
        this.appendValueInput("Data")
            .setCheck("Object")
            .appendField("For values");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Filter for specific values from the HTTP response data.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['parse_response'] = function(block) {
    var value_response = Blockly.JavaScript.valueToCode(block, 'RESPONSE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_data = Blockly.JavaScript.valueToCode(block, 'Data', Blockly.JavaScript.ORDER_ATOMIC);

    // Generate code to filter specific values from the HTTP response data
    var code = `Object.keys(${value_response}).reduce(function(obj, key) {
        if (${value_data}.hasOwnProperty(key)) {
            obj[key] = ${value_response}[key];
        }
        return obj;
    }, {})`;

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};



/* ===== LOGICAL OPERATORS ===== */
Blockly.Blocks['compare_values'] = {
    init: function() {
        this.appendValueInput("VALUE1")
            .setCheck(["Number", "HTTP_DATA"]) // Allowing the input of either a number or HTTP_DATA type
            .appendField("Compare");
        this.appendValueInput("VALUE2")
            .setCheck(["Number", "HTTP_DATA"]) // Allowing the input of either a number or HTTP_DATA type
            .appendField(new Blockly.FieldDropdown([["==", "EQ"], ["!=", "NEQ"], ["<", "LT"], [">", "GT"], ["<=", "LTE"], [">=", "GTE"]]), "OP");
        this.setOutput(true, "Boolean");
        this.setColour(210);  // A color value
        this.setTooltip('Compares two values.');
        this.setHelpUrl(''); // Link to a help document if needed
    }
};

Blockly.JavaScript['compare_values'] = function (block) {
    var value_value1 = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_op = block.getFieldValue('OP');
    var value_value2 = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_ATOMIC);
    
    // Convert Blockly operator representation to JavaScript operators
    var ops = {
        'EQ': '==',
        'NEQ': '!=',
        'LT': '<',
        'GT': '>',
        'LTE': '<=',
        'GTE': '>='
    };
    var op = ops[dropdown_op];

    // Handle the comparison in a way that waits for promises
    var code = `${value_value1} ${op} ${value_value2}`;  // Adjusted this line

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
