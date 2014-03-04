import java.util.Arrays;
import java.util.Random;

/**
 * Created by Administrator on 04.03.14.
 */
public class Main {
    final int[] input = new int[1<<27];

    public static void main(String[] argv) throws Exception {
        Main m = new Main();
        m.prepare();
        //m.test1_Shuffle(); // took 2461 millis
        //m.test2_Wrapped(); // OutOfMemoryError
        m.test3_Thread(); // took 1369 millis
    }

    public void prepare() {
        Random rand = new Random();

        for(int i = 0;i < input.length;i++) {
            input[i] = Math.abs(rand.nextInt())%10;
        }
    }

    public void test1_Shuffle() {

        Sorter sorter = new Sorter();

        System.out.println("Shuffle ...");
        Sorter.shuffleArray(input);

        System.out.println("Sorting ...");
        long t0 = System.nanoTime();

        sorter.sort(input);

        /* TODO - Make the number of milliseconds printed below as small as you can.
        1. Using a single thread.
        2. Using K threads.
        */

        System.out.println("Sorting took " + (System.nanoTime() - t0) / 1000000 + " millis");
    }

    public void test2_Wrapped() {

        Sorter sorter = new Sorter();

        System.out.println("Wrapping ...");
        Integer[] in_obj = new Integer[input.length];
        for(int i = 0;i < input.length;i++) {
            in_obj[i] = new Integer(input[i]);
        }

        System.out.println("Sorting ...");
        long t0 = System.nanoTime();

        Arrays.sort(in_obj);

        /* TODO - Make the number of milliseconds printed below as small as you can.
        1. Using a single thread.
        2. Using K threads.
        */

        System.out.println("Sorting took " + (System.nanoTime() - t0) / 1000000 + " millis");
    }

    public void test3_Thread() {

        Sorter sorter = new Sorter();
        System.out.println("Sorting ...");

        long t0 = System.nanoTime();

        Sorter srt = new Sorter(Arrays.copyOfRange(input, 0, input.length / 2));
        Thread t = new Thread(srt);
        t.start();
        sorter.sort(input, input.length / 2, input.length);

        try {
            t.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.arraycopy(srt.getArrayToSort(), 0, input, input.length / 2, input.length / 2);

        /* TODO - Make the number of milliseconds printed below as small as you can.
        1. Using a single thread.
        2. Using K threads.
        */

        System.out.println("Sorting took " + (System.nanoTime() - t0) / 1000000 + " millis");
    }


}
