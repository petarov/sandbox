/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MyServletContextListener implements ServletContextListener {
	
	private static final Logger logger = LoggerFactory.getLogger(MyServletContextListener.class);

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		logger.info("*** App exit ***");
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		logger.info("*** App boot ***");

		Bootstrap bootstrap = new Bootstrap();
		try {
			bootstrap.init();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
