package net.vexelon.telnet;

import java.net.*;

public class Server {

    public Server() {
    }

    public void start(String address, int port) throws Exception {
        var server = new ServerSocket();
        server.bind(new InetSocketAddress(address, port));

        var client = server.accept();
        System.out.println("New client connection from " + client.getInetAddress().getHostAddress());

        var buffer = new StringBuilder();
        var input = client.getInputStream();
        int eofs = 0;
        int read;

        while (eofs < 3 && (read = input.read()) != -1) {
            if (((char) read) == '\n') {
                eofs += 1;
                System.out.println(buffer);
                buffer.setLength(0);
            } else if (((char) read) != '\r') {
                eofs = 0;
                buffer.append((char) read);
            }
        }

        System.out.println("Client connection closed.");
    }
}
