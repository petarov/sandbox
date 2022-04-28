package net.vexelon.telnet;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketException;
import java.nio.charset.StandardCharsets;

public class BlockingClient {

    public void connect(String host, int port) throws Exception {
        var socket = new Socket();
        socket.connect(new InetSocketAddress(host, port), 10_000);

        System.out.println("*** Welcome to ACME's Telnet. Enjoy! ***\n");
        var reader = new BufferedReader(new InputStreamReader(System.in));
        var buffer = new StringBuilder();
        int read = 0;

        for (; ; ) {
            System.out.print("> ");
            var line = reader.readLine();
            if ("exit".equalsIgnoreCase(line) || "quit".equalsIgnoreCase(line)) {
                socket.close();
                break;
            }

            try {
                socket.getOutputStream().write((line + "\r\n").getBytes(StandardCharsets.UTF_8));
            } catch (SocketException e) {
                if (e.getMessage().toLowerCase().contains("broken pipe")) {
                    break;
                } else {
                    throw e;
                }
            }

            while ((read = socket.getInputStream().read()) > 0) {
                if (((char) read) == '\n') {
                    System.out.println(buffer);
                    buffer.setLength(0);
                    break;
                } else if (((char) read) != '\r') {
                    buffer.append((char) read);
                }
            }
        }

        System.out.println("Good bye!");
    }

}
