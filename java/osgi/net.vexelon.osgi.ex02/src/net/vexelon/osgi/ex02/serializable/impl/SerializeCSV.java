package net.vexelon.osgi.ex02.serializable.impl;

import java.util.ArrayList;
import java.util.List;

import net.vexelon.osgi.ex02.serialize.CSVSerializable;

public class SerializeCSV implements CSVSerializable {
	
	List<String> values = new ArrayList<>();

	@Override
	public CSVSerializable add(String text) {
		values.add(text);
		return this;
	}

	@Override
	public String serialize() {
		StringBuilder sb = new StringBuilder(1024);
		for (String s : values) {
			sb.append(s);
			sb.append(";");
		}
		sb.setLength(sb.length() - 1);
		return sb.toString();
	}

}
