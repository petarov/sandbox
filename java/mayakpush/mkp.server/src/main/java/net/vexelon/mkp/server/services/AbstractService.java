/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.services;

import net.vexelon.mkp.server.conf.Configuration;
import net.vexelon.mkp.server.nlp.ModelLoader;

import com.google.inject.Inject;

public abstract class AbstractService implements Service {

	/*
	 * Injected
	 */
	
	protected Configuration configuration;
	
	protected ModelLoader modelLoader;
	
	@Inject
	protected AbstractService(Configuration configuration, ModelLoader modelLoader) {
		this.configuration = configuration;
		this.modelLoader = modelLoader;
	}	

}
