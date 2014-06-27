package net.vexelon.osgi.ex03.serialize;

public interface CSVSerializable {

	CSVSerializable add(String text);
	
	String serialize();
}
