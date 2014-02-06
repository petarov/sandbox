package servlets;

import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;

import sockets.MyEchoSocket;

@SuppressWarnings("serial")
public class WSServlet extends WebSocketServlet {

	@Override
	public void configure(WebSocketServletFactory factory) {
		// register a socket class as default
		factory.getPolicy().setIdleTimeout(10 * 1000);
		factory.register(MyEchoSocket.class);		
	}
}
