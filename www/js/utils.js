// The sendWS function should be called with an object parameter. The object format
// should be have a string event parameter, along with a payload object that contains
// the data required by the server. For example, to create a new user:
//
// var messageObj = {
//     event: "createnewuser"
//     , payload: {
//         username: "peterpan"
//         , firstname: "Peter"
//         , lastname: "Earl"
//         , password: "$#&@*`\t!%^()_-=+|?\r;][\""
//     }
// };
//
// sendWs(messageObj, callback);
// The callback parameter is optional.
//
function sendWS(inObj, callback) {
    if ("WebSocket" in window) {
        // ws = new WebSocket("ws://172.24.2.186:8001/");
        ws = new WebSocket("ws://192.168.1.193:8001/");
        // ws = new WebSocket("ws://192.168.1.119:8001/");

        ws.onopen = function() {
            var messageStr = JSON.stringify(inObj);
            ws.send(messageStr);
            console.log("Message is sent...[" + messageStr + "]");
        };
            
        ws.onmessage = function (evt) { 
            console.log("Message is received...[" + evt.data + "]");
            if (typeof callback === 'function') callback(evt.data)
        };
            
        ws.onclose = function() { console.log("Connection is closed..."); };
    }
    else { alert("WebSocket NOT supported by your Browser!"); }
}