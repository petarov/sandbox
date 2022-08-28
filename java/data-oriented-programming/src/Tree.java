sealed public interface Tree<T> {

	// Data Oriented Programming

	record Node<T>(T data, Tree<T> left, Tree<T> right) implements Tree<T> {


	}

	record Nil<T>() implements Tree<T> {

	}

	default Node<T> insertLeft(Node<T> parent, Node<T> left) {
		return switch (parent) {
			case Node<T> n -> {
			}
			case Nil<T> n -> parent.left = new Node<T>(left.data, left, null);
		}
	}

}
