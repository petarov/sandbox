package net.vexelon.osgi.ex02;

import net.vexelon.osgi.ex02.math.Computable;
import net.vexelon.osgi.ex02.math.impl.Multiply;
import net.vexelon.osgi.ex02.math.impl.Sum;
import net.vexelon.osgi.ex02.serializable.impl.SerializeCSV;
import net.vexelon.osgi.ex02.serialize.CSVSerializable;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;

public class MyServiceActivator implements BundleActivator {
	
	ServiceRegistration<?> serviceRegSum;
	ServiceRegistration<?> serviceRegMul;
	ServiceRegistration<?> serviceSer2;

	@Override
	public void start(BundleContext arg0) throws Exception {
		
		// register by name
		
		Computable compSum = new Sum();
		serviceRegSum = arg0.registerService(Sum.class.getName(), compSum, null);
				
		Computable compMul = new Multiply();
		serviceRegMul = arg0.registerService(Multiply.class.getName(), compMul, null);
		
		// register by className
//		CSVSerializable ser = new SerializeCSV();
//		serviceSer = arg0.registerService(CSVSerializable.class, ser, null);
		serviceSer2 = arg0.registerService("net.vexelon.osgi.ex02.serialize.CSVSerializable", 
				new MyServiceFactory(), null);
	
		System.out.println("!! Registered EX02 !!");
	}

	@Override
	public void stop(BundleContext arg0) throws Exception {
		serviceRegSum.unregister();
		serviceRegMul.unregister();
		serviceSer2.unregister();
	}

}
