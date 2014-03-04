import java.util.Arrays;
import java.util.Random;

/**
 * Created by Administrator on 04.03.14.
 */
public class Sorter implements Runnable {

    int[] arrayToSort;

    public int[] getArrayToSort() {
        return arrayToSort;
    }

    public Sorter() {
    }

    public Sorter(int[] in) {
        this.arrayToSort = in;
    }

    public static void shuffleArray(int[] arr){
        int n = arr.length;
        Random rnd = new Random();
        for (int i = 0; i < n; ++i) {
            int tmp = arr[i];
            int randomPos = i + rnd.nextInt(n - i);
            arr[i] = arr[randomPos];
            arr[randomPos] = tmp;
        }
    }

    public void sort(int[] in) {
        Arrays.sort(in);
    }

    public void sort(int[] in, int from, int to) {
        //int[] newIn = Arrays.copyOfRange(in, from, to);
        //Arrays.sort(newIn);
        Arrays.sort(in, from, to);
    }

    @Override
    public void run() {
        Arrays.sort(this.arrayToSort);
    }
}
