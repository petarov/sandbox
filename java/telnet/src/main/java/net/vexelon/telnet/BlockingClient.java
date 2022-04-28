package net.vexelon.telnet;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

public class BlockingClient {

    public void connect(String host, int port) throws Exception {
        var socket = new Socket();
        socket.connect(new InetSocketAddress(host, port), 10_000);

        System.out.println("*** Welcome to ACME's Telnet. Enjoy! ***\n");
        var reader = new BufferedReader(new InputStreamReader(System.in));

        for (; ; ) {
            System.out.print("> ");
            var line = reader.readLine();
            if ("exit".equalsIgnoreCase(line) || "quit".equalsIgnoreCase(line)) {
                break;
            }

            if (socket.isClosed()) {
                System.out.println("Received EOF");
                break;
            }

            socket.getOutputStream().write((line + "\r\n").getBytes(StandardCharsets.UTF_8));
        }

        System.out.println("Good bye!");
    }

}
