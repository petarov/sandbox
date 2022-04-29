package net.vexelon.telnet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;

public class BlockingServer {

    public void start(String host, int port) throws IOException {
        var es = Executors.newFixedThreadPool(10);

        try (var server = new ServerSocket()) {
            server.bind(new InetSocketAddress(host, port));

            var clientId = 0;

            while (true) {
                es.execute(new EchoLoop(++clientId, server.accept()));
            }
        }
    }

    private record EchoLoop(int clientId, Socket client) implements Runnable {

        @Override public void run() {
            try {
                var addr = client.getInetAddress().getHostAddress();
                System.out.println("(#" + clientId + ") : New client connection from " + addr);

                int eofs = 0;
                while (eofs < 3) {
                    var line = new BufferedReader(new InputStreamReader(client.getInputStream())).readLine();
                    if (line == null) break; // conn closed

                    eofs += line.isEmpty() ? 1 : 0; // client sent empty lines

                    client.getOutputStream().write(("ECHO : " + line + "\r\n").getBytes(StandardCharsets.UTF_8));
                }

                client.close();

                System.out.println("(#" + clientId + ") : Closed client connection from " + addr);
            } catch (Throwable t) {
                throw new RuntimeException(t);
            }
        }
    }
}
