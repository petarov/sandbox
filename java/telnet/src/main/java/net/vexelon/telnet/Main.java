package net.vexelon.telnet;

public class Main {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("Insufficient arguments!");
        }

        try {
            switch (args[0]) {
                case "server":
                    new BlockingServer().start(args[1], Integer.parseInt(args[2]));
                    break;

                case "client":
                    new BlockingClient().connect(args[1], Integer.parseInt(args[2]));
                    break;
            }
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
}
