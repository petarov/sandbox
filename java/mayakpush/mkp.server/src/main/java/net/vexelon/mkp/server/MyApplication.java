/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server;

import javax.inject.Inject;
import javax.ws.rs.ApplicationPath;

import net.vexelon.mkp.server.auth.AuthorizationRequestFilter;
import net.vexelon.mkp.server.di.ServletModule;

import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.ResourceConfig;
import org.jvnet.hk2.guice.bridge.api.GuiceBridge;
import org.jvnet.hk2.guice.bridge.api.GuiceIntoHK2Bridge;

import com.google.inject.Guice;

@ApplicationPath("resources")
public class MyApplication extends ResourceConfig {
	
	@Inject
    public MyApplication(ServiceLocator serviceLocator) {
        packages("net.vexelon.mkp.server.resources", // App REST resources
        		"net.vexelon.mkp.server.filters", // App filters
        		"com.fasterxml.jackson.jaxrs.json", // support for JSON Body Reader/Writer
        		"org.glassfish.jersey.examples.httppatch" // support for HTTP PATCH
        		);
        
        // handle API access authorization
        register(AuthorizationRequestFilter.class);
        
        /*
         * @see https://hk2.java.net/guice-bridge/
         * 
         * Guice services can be injected into any injection point in HK2. In order to do this you 
         * must tell HK2 about the Guice Injector which has the Guice service definitions. 
         * This is accomplished in two steps. In the first step you should have the ServiceLocator 
         * that contains services you wish to be injected with Guice services. You must initialize 
         * this ServiceLocator with some required Guice/HK2 bridge services. You can do this using 
         * the utility class GuiceBridge. This is a code snippet that initializes a ServiceLocator:
         */
        GuiceBridge.getGuiceBridge().initializeGuiceBridge(serviceLocator);
        
		/*
		 * In the second step you must tell your initialized ServiceLocator about the specific 
		 * Guice Injector(s) that you want it to look for services in. You do this with the 
		 * GuiceIntoHK2Bridge service that was added in the previous step. The following code 
		 * snippet adds a Guice Injector to be searched for services when injecting into HK2 
		 * services: 
		 */
        GuiceIntoHK2Bridge guiceBridge = serviceLocator.getService(GuiceIntoHK2Bridge.class);
        guiceBridge.bridgeGuiceInjector(Guice.createInjector(new ServletModule()));
    }
}