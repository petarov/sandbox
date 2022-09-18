import java.math.BigInteger;

public interface Token {

	record Operand(BigInteger value) implements Token {}

	record Operator(Operators operator) implements Token {}
}
