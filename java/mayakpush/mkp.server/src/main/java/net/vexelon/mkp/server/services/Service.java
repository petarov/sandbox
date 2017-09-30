/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.services;

import java.util.Map;

public interface Service {
	
	/**
	 * Unique resource path
	 * @return <code>String</code>
	 */
	String getName();

	/**
	 * List of sub-resources links provided by this resource
	 * @return Map of <code>String</code> key/value pairs describing name and url for 
	 * each resource.
	 */
	Map<String, String> getResources();	
}
