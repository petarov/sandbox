import java.math.BigInteger;

public interface Token {

	record Operand(BigInteger value) implements Token {

		@Override
		public String toString() {
			return value.toString();
		}
	}

	record Operator(Operators operator) implements Token {

		@Override
		public String toString() {
			return String.valueOf(operator.getNotation());
		}
	}
}
