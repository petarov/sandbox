package net.vexelon.osgi.ex02.serialize;

public interface CSVSerializable {

	CSVSerializable add(String text);
	
	String serialize();
}
