public class Main {

	public static void main(String[] args) {
		testOpt();
	}

	public static void  testTree() {
		/**
		 *                  100
		 *       54                             102
		 *                                   44       17
		 *    12           2             2     13       79
		 *  4    56     1       0            15  34       69
		 * 7   17  78     43  2   77                    5
		 */

	}

	public static void testOpt() {
		Opt<String> john = new Opt.Some<>("John");
		Opt<String> none = new Opt.None<>();

		System.out.println("> " + john.map(v -> "Hello " + v + "!").value());
		System.out.println("> " + none.map(v -> "Hello " + v + "!").value());
	}
}