package net.vexelon.telnet;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

public class NonBlockingServer {

    private static final int BUFFER_SIZE = 1024;
    private final Map<Integer, EchoClient> clients = new HashMap<>();

    public void start(String host, int port) throws Exception {
        var selector = Selector.open();
        var ssc = ServerSocketChannel.open();
        ssc.bind(new InetSocketAddress(host, port));
        ssc.configureBlocking(false);
        ssc.register(selector, SelectionKey.OP_ACCEPT);

        var clientId = 0;
        var buffer = ByteBuffer.allocate(BUFFER_SIZE);

        for (; ; ) {
            selector.select();
            for (var it = selector.selectedKeys().iterator(); it.hasNext(); ) {
                var key = it.next();

                if (key.isAcceptable()) {
                    clientId += 1;
                    var client = new EchoClient(clientId);
                    client.register(ssc.accept(), selector);
                    clients.put(clientId, client);
                }

                if (key.isReadable()) {
                    buffer.clear();
                    clients.get((Integer) key.attachment()).echo(key, buffer);
                }

                it.remove();
            }
            Thread.sleep(250);
        }
    }

    private static class EchoClient {

        private final StringBuilder clientBuffer = new StringBuilder();
        private final int clientId;
        private int eofs = 0;

        public EchoClient(int clientId) {
            this.clientId = clientId;
        }

        public void register(SocketChannel channel, Selector selector) throws Exception {
            channel.configureBlocking(false);
            channel.register(selector, SelectionKey.OP_READ | SelectionKey.OP_WRITE, clientId);
            System.out.println("(#" + clientId + ") : New client connection from " + channel.getRemoteAddress());
        }

        public void echo(SelectionKey key, ByteBuffer input) {
            try {
                var channel = (SocketChannel) key.channel();
                channel.read(input);

                input.flip();
                while (input.hasRemaining()) {
                    char ch = (char) input.get();
                    if (ch == '\n') {
                        eofs += 1;
                        flush(channel);
                    } else if (ch != '\r' && ch > 0) {
                        eofs = 0;
                        clientBuffer.append(ch);
                    }

                    if (eofs > 2) {
                        System.out.println("(#" + clientId + ") : Closed client connection from " + channel.getRemoteAddress());
                        channel.close();
                        return;
                    }
                }
            } catch (Throwable t) {
                throw new RuntimeException(t);
            }
        }

        private void flush(SocketChannel channel) throws IOException {
            System.out.println("(#" + clientId + ") : " + clientBuffer);

            var output = new StringBuilder();
            output.append("ECHO : ");
            output.append(clientBuffer);
            output.append("\r\n");
            clientBuffer.setLength(0);

            var wrapped = ByteBuffer.wrap(output.toString().getBytes(StandardCharsets.UTF_8));
            while (wrapped.hasRemaining()) {
                channel.write(wrapped);
            }
        }
    }
}
