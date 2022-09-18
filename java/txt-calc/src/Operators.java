import java.math.BigInteger;
import java.util.Arrays;
import java.util.Optional;

public enum Operators implements Operation {

	PLUS('+', BigInteger::add),
	MINUS('-', BigInteger::subtract),
	MUL('*', BigInteger::multiply),
	DIV('/', BigInteger::divide),
	;

	private final char      notation;
	private final Operation operation;

	Operators(char notation, Operation operation) {
		this.notation = notation;
		this.operation = operation;
	}

	public char getNotation() {
		return notation;
	}

	@Override
	public BigInteger apply(BigInteger a, BigInteger b) {
		return operation.apply(a, b);
	}

	public static Optional<Operators> fromNotation(char notation) {
		return Arrays.stream(values()).filter(v -> v.notation == notation).findAny();
	}
}

interface Operation {

	BigInteger apply(BigInteger a, BigInteger b);
}
