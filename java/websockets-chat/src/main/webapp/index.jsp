<!DOCTYPE html>
<html>
    <head>
        <meta charset=UTF-8>
        <title>WebSocket Chat</title>
        <script>
            var ws;

            function openConn(callback) {
            	if (!ws) {
            		ws = new WebSocket("ws://localhost:8083/ws");
                    ws.onopen = function() {
                    	callback(true);
                    };
                    ws.onmessage = function(message){
                        document.getElementById("chatlog").textContent += message.data + "\n";
                    };
                    ws.onclose = function() {
                    	closeConnect();
                    };
            	} else {
            		callback();
            	}
            }
            
            function postToServer(){
//             	if (document.getElementById("name").value.length < 3) {
//             		alert("Nickname required!");
//             		return;
//             	}
            	openConn(function(justOpened) {
            		if (justOpened) {
            			ws.send(document.getElementById("name").value + ' joined chat.');	
            		}
                    ws.send(document.getElementById("msg").value);
                    document.getElementById("msg").value = "";
            	});
            }
            function closeConnect(){
                ws.close();
                ws = null;
            }
        </script>
    </head>
    <body>
    	<h3>WebSockets Demo</h3>
    	
    	<br>
    	<br>
    	
        <textarea id="chatlog" readonly cols="40" rows="25"></textarea><br/>
        Nickname <input id="name" type="text" />
        <br>
        Message&nbsp;&nbsp;&nbsp;<input id="msg" type="text" />
        <button type="submit" id="sendButton" onClick="postToServer()">Send</button>
        <button type="submit" id="sendButton" onClick="closeConnect()">Close</button>
    </body>
</html>