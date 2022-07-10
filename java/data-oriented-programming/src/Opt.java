import java.util.function.Function;

sealed interface Opt<T> {

	record Some<T>(T value) implements Opt<T> {

	}

	record None<T>() implements Opt<T> {

		@Override
		public T value() {
			return null;
		}
	}

	T value();

	default <U> Opt<U> map(Function<T, U> mapper) {
		return switch (this) {
			case Some<T> s -> new Some<>(mapper.apply(s.value));
			case None<T> n -> new Opt.None<>();
		};
	}
}


