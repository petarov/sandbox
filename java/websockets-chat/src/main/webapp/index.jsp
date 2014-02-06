<!DOCTYPE html>
<html>
    <head>
        <meta charset=UTF-8>
        <title>WebSocket Chat</title>
        <script>
        	var MSG_JOIN = 100;
        	var MSG_CHAT = 110;
            var ws;

            function openConn(callback) {
            	if (!ws) {
            		ws = new WebSocket("ws://localhost:8080/ws");
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
            		var packet = {};
            		
            		if (justOpened) {
            			// user joined packet
            			packet.msg = document.getElementById("name").value + ' joined chat.'
            			packet.who = document.getElementById("name").value;
            			packet.type = MSG_JOIN;
            			ws.send(JSON.stringify(packet));
            		}
            		// chat msg packet
            		packet = {
            			msg: document.getElementById("msg").value,
            			who: document.getElementById("name").value,
            			type: MSG_CHAT
            		};
                    ws.send(JSON.stringify(packet));
                    
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