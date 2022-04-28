package net.vexelon.telnet;

import java.net.InetSocketAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;

public class BlockingServer {

    public void start(String address, int port) throws Exception {
        var es = Executors.newFixedThreadPool(10);
        var server = new ServerSocket();
        server.bind(new InetSocketAddress(address, port));

        var clientId = 0;

        for (; ; ) {
            es.execute(new EchoLoop(++clientId, server.accept()));
        }
    }

    private static class EchoLoop implements Runnable {

        private int clientId;
        private Socket client;

        public EchoLoop(int clientId, Socket client) {
            this.clientId = clientId;
            this.client = client;
        }

        @Override public void run() {
            try {
                var addr = client.getInetAddress().getHostAddress();
                System.out.println("(#" + clientId + ") : New client connection from " + addr);

                var buffer = new StringBuilder();
                var input = client.getInputStream();
                int eofs = 0;
                int read;

                while (eofs < 3 && (read = input.read()) != -1) {
                    if (((char) read) == '\n') {
                        eofs += 1;
                        System.out.println("(#" + clientId + ") : " + buffer);
                        client.getOutputStream().write(("ECHO : " + buffer + "\r\n").getBytes(StandardCharsets.UTF_8));
                        buffer.setLength(0);
                    } else if (((char) read) != '\r') {
                        eofs = 0;
                        buffer.append((char) read);
                    }
                }

                client.close();

                System.out.println("(#" + clientId + ") : Closed client connection from " + addr);
            } catch (Throwable t) {
                throw new RuntimeException(t);
            }
        }
    }
}
