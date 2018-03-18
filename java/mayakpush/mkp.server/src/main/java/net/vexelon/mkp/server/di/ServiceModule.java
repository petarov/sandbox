/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.di;

import net.vexelon.mkp.server.nlp.ModelLoader;
import net.vexelon.mkp.server.services.axons.AxonsService;
import net.vexelon.mkp.server.services.axons.AxonsServiceImpl;

import com.google.inject.AbstractModule;
import com.google.inject.Singleton;

/**
 * Binds instances and class types to Services
 * 
 * @author p.petrov
 *
 */
public class ServiceModule extends AbstractModule {
	
	public static ModelLoader modelLoaderInstance;

	@Override
	protected void configure() {
		
		bind(ModelLoader.class).toInstance(modelLoaderInstance);
		
		bind(AxonsService.class).to(AxonsServiceImpl.class).in(Singleton.class);
	}
}
