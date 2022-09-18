import java.math.BigInteger;
import java.util.Arrays;
import java.util.Optional;

public enum Operators implements Operation {

	PLUS('+', 1, BigInteger::add),
	MINUS('-', 1, BigInteger::subtract),
	MUL('*', 2, BigInteger::multiply),
	DIV('/', 2, BigInteger::divide),
	;

	private final char      notation;
	private final int       priority;
	private final Operation operation;

	Operators(char notation, int priority, Operation operation) {
		this.notation = notation;
		this.priority = priority;
		this.operation = operation;
	}

	public char getNotation() {
		return notation;
	}

	public int getPriority() {
		return priority;
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
