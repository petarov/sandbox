package net.vexelon.osgi.ex01;

import net.vexelon.osgi.ex02.serialize.CSVSerializable;

import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.util.tracker.ServiceTracker;

public class MyServiceTracker extends ServiceTracker<CSVSerializable, CSVSerializable> {
	
	public MyServiceTracker(BundleContext context) {
		super(context, CSVSerializable.class, null);
	}

	@Override
	public CSVSerializable addingService(ServiceReference<CSVSerializable> reference) {
		CSVSerializable service = super.addingService(reference);
		System.out.println("Adding service " + service.getClass().getName());
		return service;
	}
	
	public void removedService(ServiceReference<CSVSerializable> reference, 
			CSVSerializable service) {
		
		System.out.println("Removing service " + service.getClass().getName());
		context.ungetService(reference);
	}
	
	
}
