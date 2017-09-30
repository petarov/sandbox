/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.services.axons;

import net.vexelon.mkp.server.pojo.AxonPojo;
import net.vexelon.mkp.server.services.Service;
import net.vexelon.mkp.server.services.ServiceException;

public interface AxonsService extends Service {
	
	/**
	 * Create a new axon given input parameters.
	 * @return New {@link AxonPojo} instance.
	 * @throws ServiceException
	 */
	AxonPojo create() throws ServiceException;
	
	/**
	 * 
	 * @return Updated {@link AxonPojo} instance.
	 * @throws ServiceException
	 */
	AxonPojo update() throws ServiceException;
	
	/**
	 * Remove axon from activated list
	 * @throws ServiceException
	 */
	void delete(int id) throws ServiceException;
	
	/**
	 * Delete chart from data storage
	 * @throws ServiceException
	 */
	void purge(int id) throws ServiceException;	

}
