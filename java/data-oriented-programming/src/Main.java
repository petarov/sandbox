public class Main {

	public static void main(String[] args) {
		testOpt();
	}

	public static void testOpt() {
		Opt<String> john = new Opt.Some<>("John");
		Opt<String> none = new Opt.None<>();

		System.out.println("> " + john.map(v -> "Hello " + v + "!").value());
		System.out.println("> " + none.map(v -> "Hello " + v + "!").value());
	}
}