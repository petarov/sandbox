/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.di;

import net.vexelon.mkp.server.conf.Configuration;

/**
 * Dependency Injection bindings entry point. 
 * Binds instances common to all modules in the application.
 * 
 * @author p.petrov
 *
 */
public class ServletModule extends com.google.inject.servlet.ServletModule {
	
	/**
	 * Static Configuration instance
	 * This instance will be created during the bootstrap process. We use exactly <b>one</b> 
	 * configuration throughout all modules.
	 */
	public static Configuration configurationInstance;

	@Override
	protected void configureServlets() {
		super.configureServlets();
		
		bind(Configuration.class).toInstance(configurationInstance);
		
		install(new ServiceModule());
	}

}
