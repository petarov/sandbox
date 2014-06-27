package net.vexelon.osgi.ex01;

import net.vexelon.osgi.ex02.math.Computable;
import net.vexelon.osgi.ex02.serialize.CSVSerializable;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

public class Activator implements BundleActivator {
	
	// there's no guaranteed that these services will be available
	// throughout the life-cycle of this bundle
	ServiceReference<?> serviceRefSum;
	ServiceReference<?> serviceRefMul;
	ServiceReference<CSVSerializable> serviceSerializeCSV;

	MyServiceTracker serviceTrackerCSV;
	
	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext context) throws Exception {
		System.out.println("!! EX01 !!");
		
		// never cache the service, always use the tracker!
		serviceTrackerCSV = new MyServiceTracker(context);
		serviceTrackerCSV.open();
		
		// untracked services
		
		serviceRefSum = context.getServiceReference("net.vexelon.osgi.ex02.math.impl.Sum");
		Computable operation = (Computable) context.getService(serviceRefSum);
		operation.add(5).add(12).add(2);
		System.out.println("Sum = " +operation.compute());
		
		serviceRefMul = context.getServiceReference("net.vexelon.osgi.ex02.math.impl.Multiply");
		operation = (Computable) context.getService(serviceRefMul);
		operation.add(5).add(12).add(2);
		System.out.println("Multiplication = " + operation.compute());	
		
		serviceSerializeCSV = context.getServiceReference(CSVSerializable.class);
		CSVSerializable csv = context.getService(serviceSerializeCSV);
		csv.add("Customer").add("Omicron Ltd.").add("Items").add("BFGS");
		System.out.println("CSV = " + csv.serialize());
		context.ungetService(serviceSerializeCSV);
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext context) throws Exception {
		System.out.println("!! Goodbye EX01 !!");
		
		{
			CSVSerializable csv = serviceTrackerCSV.getService();
			if (csv != null) {
				csv.add("Customer").add("Delta AG").add("Items").add("AK48");
				System.out.println("CSV = " + csv.serialize());
				serviceTrackerCSV.close();
			}
		}
		
		context.ungetService(serviceRefSum);
		context.ungetService(serviceRefMul);
	}

}
