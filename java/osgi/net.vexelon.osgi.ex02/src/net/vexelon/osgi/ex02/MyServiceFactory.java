package net.vexelon.osgi.ex02;

import net.vexelon.osgi.ex02.serializable.impl.SerializeCSV;
import net.vexelon.osgi.ex02.serialize.CSVSerializable;

import org.osgi.framework.Bundle;
import org.osgi.framework.ServiceFactory;
import org.osgi.framework.ServiceRegistration;

public class MyServiceFactory implements ServiceFactory<CSVSerializable> {
	
	private int count = 0;

	@Override
	public CSVSerializable getService(Bundle arg0,
			ServiceRegistration<CSVSerializable> arg1) {
		
		count++;
		System.out.println("Created CSV Instances = " + count);
		return new SerializeCSV();
	}
	
	
	@Override
	public void ungetService(Bundle arg0,
			ServiceRegistration<CSVSerializable> arg1, CSVSerializable arg2) {
		count--;
		System.out.println("Removed CSV Instance. New count = " + count);
	}
}
