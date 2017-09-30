/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.services.axons;

import java.util.Map;

import javax.inject.Inject;

import com.google.common.collect.ImmutableMap;
import com.google.inject.Guice;
import com.google.inject.Injector;
import com.google.inject.Singleton;

import net.vexelon.mkp.server.conf.Configuration;
import net.vexelon.mkp.server.conf.Options;
import net.vexelon.mkp.server.conf.defs.Globals;
import net.vexelon.mkp.server.di.ServiceModule;
import net.vexelon.mkp.server.nlp.ModelLoader;
import net.vexelon.mkp.server.pojo.AxonPojo;
import net.vexelon.mkp.server.services.AbstractService;
import net.vexelon.mkp.server.services.ServiceException;

/**
 * Thread-safe Charts services implementation
 * 
 * @author p.petrov
 *
 */
@Singleton
public class AxonsServiceImpl extends AbstractService implements AxonsService {
	
	private ImmutableMap<String, String> resources;
	
	@Inject
	protected AxonsServiceImpl(Configuration configuration, ModelLoader modelLoader) {
		super(configuration, modelLoader);
		
		/*
		 * Initializations 
		 */
		resources = ImmutableMap.of(
				"url", configuration.getString(Options.SERVER_ADDRESS) + Globals.RESOURCE_AXONS);
	}

	@Override
	public String getName() {
		return Globals.RESOURCE_AXONS;
	}

	@Override
	public Map<String, String> getResources() {
		return resources;
	}
	
	@Override
	public AxonPojo create() throws ServiceException {
		// TODO Auto-generated method stub
		throw new ServiceException("Not implemented!");
	}
	
	@Override
	public AxonPojo update() throws ServiceException {
		// TODO Auto-generated method stub
		throw new ServiceException("Not implemented!");
	}
	
	@Override
	public void delete(int id) throws ServiceException {
		// TODO Auto-generated method stub
		throw new ServiceException("Not implemented!");
	}
	
	@Override
	public void purge(int id) throws ServiceException {
		// TODO Auto-generated method stub
		throw new ServiceException("Not implemented!");
	}
	
	// --- static -----------------------------------------------------------
	
	public static AxonsService newInstance() {
		Injector injector = Guice.createInjector(new ServiceModule());
		return injector.getInstance(AxonsServiceImpl.class);
	}

}
