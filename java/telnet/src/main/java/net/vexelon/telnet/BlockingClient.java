package net.vexelon.telnet;

import java.io.BufferedReader;
import java.io.InputStreamReader;
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

            System.out.println(new BufferedReader(new InputStreamReader(socket.getInputStream())).readLine());
        }

        System.out.println("Good bye!");
    }

}
