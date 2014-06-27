package net.vexelon.osgi.ex03.consumer;

import net.vexelon.osgi.ex03.serialize.CSVSerializable;

public class ComponentConsumer {
	
	private CSVSerializable csv;
	
	public ComponentConsumer() {
		if (csv != null) {
			csv.add("Instance");
			System.out.println(csv.serialize());
		}
	}
	
	public synchronized void setCSV(CSVSerializable csv) {
		System.out.println("CSVSerializable was set!");
		this.csv = csv;
		
		csv.add("Service").add("WAS").add("SET");
		System.out.println(csv.serialize());
	}
	
	public synchronized void unsetCSV(CSVSerializable csv) {
		System.out.println("CSVSerializable was *unset* !");
		if (this.csv == csv) {
			csv = null;
		}
	}
	
	

}
