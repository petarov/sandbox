package sockets;

import java.io.IOException;

import org.eclipse.jetty.util.Callback;
import org.eclipse.jetty.util.FutureCallback;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketListener;
import org.eclipse.jetty.websocket.core.api.WebSocketConnection;

public class MyEchoSocketListener implements WebSocketListener {
	
	private WebSocketConnection outbound;

	@Override
	public void onWebSocketBinary(byte[] arg0, int arg1, int arg2) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onWebSocketClose(int arg0, String arg1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onWebSocketConnect(Session arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onWebSocketError(Throwable arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void onWebSocketText(String message) {
		
		System.out.println("Text");

		if (outbound == null)
        {
            return;
        }

        try
        {
            String context = null;
            Callback callback = new FutureCallback();
            outbound.write(context, callback, message);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }		

	}

}
