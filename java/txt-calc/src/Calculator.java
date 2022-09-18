import java.math.BigInteger;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class Calculator {

	private final Consumer<String> writer;

	private Calculator(Consumer<String> writer) {
		this.writer = writer;
	}

	public static BigInteger calculate(String expression) {
		return new Calculator(msg -> {}).calculate(tokenize(expression));
	}

	public static void calculate(String expression, Consumer<String> writer) {
		new Calculator(writer).calculate(tokenize(expression));
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

	private void write(int term, Collection<Token> tokens) {
		if (writer != null) {
			writer.accept("TERM " + term + " = " + tokens.stream().map(Token::toString).collect(Collectors.joining()));
		}
	}

	private BigInteger calculate(Collection<Token> tokens) {
		int term = 1;
		write(term, tokens);

		do {
			term++;
			tokens = simplify(tokens, 2);
			write(term, tokens);

			term++;
			tokens = simplify(tokens, 1);
			write(term, tokens);
		} while (tokens.size() != 1);

		if (tokens.iterator().next() instanceof Token.Operand operand) {
			return operand.value();
		}

		throw new IllegalStateException("Calculation error! Tokens=" + tokens.size());
	}

	private Collection<Token> simplify(Collection<Token> tokens, int priority) {
		// 1*4/2-10
		Token.Operator lastOp = null;
		var newTokens = new LinkedList<Token>();

		for (var token : tokens) {
			switch (token) {
				case Token.Operand operand -> {
					if (!newTokens.isEmpty() && Objects.requireNonNull(lastOp).operator().getPriority() == priority) {
						var op = (Token.Operator) newTokens.pop();
						var b = (Token.Operand) newTokens.pop();
						newTokens.push(new Token.Operand(op.operator().apply(b.value(), operand.value())));
					} else {
						newTokens.push(operand);
					}
				}
				case Token.Operator operator -> {
					newTokens.push(operator);
					lastOp = operator;
				}
				default -> throw new IllegalStateException("Unexpected value: " + token);
			}
		}

		Collections.reverse(newTokens);
		return newTokens;
	}
}
