import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class Calculator {

	private final Collection<Token> tokens;

	private Calculator(Collection<Token> tokens) {
		this.tokens = tokens;
	}

	public static BigInteger calculate(String expression) {
		return new Calculator(tokenize(expression)).calculate();
	}

	public static Collection<Token> tokenize(String expression) {
		var allowed = Arrays.stream(Operators.values()).map(Operators::getNotation).collect(Collectors.toSet());

		var tokens = new ArrayList<Token>();
		var buf = new StringBuilder();
		var lastTokenIsOp = false;

		for (var ch : expression.toCharArray()) {
			if (Character.isDigit(ch)) {
				buf.append(ch);
				lastTokenIsOp = false;
			} else if (allowed.contains(ch)) {
				if (lastTokenIsOp) {
					throw new IllegalArgumentException("Invalid expression! Operator follows an operator: " + ch);
				}
				tokens.add(new Token.Operand(new BigInteger(buf.toString())));
				buf.setLength(0);
				tokens.add(new Token.Operator(Operators.fromNotation(ch)
						.orElseThrow(() -> new IllegalArgumentException("Invalid operator:" + ch))));
				lastTokenIsOp = true;
			} else if (!Character.isWhitespace(ch)) {
				throw new IllegalArgumentException("Invalid expression! Operator or operand not supported: " + ch);
			}
		}

		if (!buf.isEmpty()) {
			tokens.add(new Token.Operand(new BigInteger(buf.toString())));
		}

		return tokens;
	}

	private BigInteger calculate() {
		tokens.forEach(System.out::println);
		return null;
	}
}
