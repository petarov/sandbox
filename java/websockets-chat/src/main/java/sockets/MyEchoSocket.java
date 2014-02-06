package sockets;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import protocol.Packet;

import com.google.gson.Gson;

@WebSocket(maxTextMessageSize = 64 * 1024)
public class MyEchoSocket {
	
	private static List<Session> sessionsList = new ArrayList<Session>();
	
	@SuppressWarnings("unused")
	private Session session;
	
	@OnWebSocketConnect
	public void onConnect(Session session) {
		this.session = session;
		sessionsList.add(session);
		System.out.println("New dude connected from " + session.getRemoteAddress().toString());
	}
	
	@OnWebSocketClose
	public void onClose(Session session, int statusCode,
			String reason) {
		System.out.println("Dude has DISconnected: " + session.getRemoteAddress().toString());
		sessionsList.remove(session);
		session = null;
	}

	@OnWebSocketMessage
	public void onText(Session session, String message) {
		Gson gson = new Gson();
		Packet packet = gson.fromJson(message, Packet.class);
		
		System.out.println(packet.toString());
		
		for (Session s : sessionsList) {
			if (s.isOpen()) {
				s.getRemote().sendStringByFuture(packet.toEchoMessage());
			}
		}
	}
	
	@OnWebSocketMessage
	public void onBinaryMethod(Session session, byte data[],
			int offset, int length) {
		// simple BINARY message received, with Connection
		// that it occurred on.
	}
	
}
