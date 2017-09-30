/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf.defs;

/**
 * Global constants
 *
 */
public final class Globals {
	
	public static final String VENDOR_NAME = "Vexelon.NET Services";
	
	/*
	 * Environment variable which points to server configuration files
	 */
	public static final String ENV_CONFIG_DIR = "MKP_CFG_DIR";
	
	/*
	 * Log4j variables
	 */
	public static final String LOGGING_LOG4J_NAME = "log4j.properties";
	public static final int LOGGING_REFRESH_PERIOD = 15000; // milliseconds
	
	/*
	 * Name of server configuration file
	 */
	public static final String SERVER_CONF_FILE = "server.conf";
	
	/**
	 * Resources names
	 */
	public static final String RESOURCE_USERS = "/users";
	public static final String RESOURCE_AXONS = "/axons";
	public static final String RESOURCE_CLASSIFIER = "/classifier";

}
