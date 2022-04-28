package net.vexelon.telnet;

public class Main {

    public static void main(String[] args) {
        try {
            new Server().start("0.0.0.0", 5678);
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }
}
