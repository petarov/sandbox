/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf;

import java.math.BigInteger;

public interface Configuration {
	
	/**
	 * 
	 * @throws ConfigException
	 */
	void load() throws ConfigException;
	
	/**
	 * Clears all currently loaded options and reload them
	 * @throws ConfigException
	 */
	void reload() throws ConfigException;
	
	/**
	 * Size of all loaded options
	 * @return <code>Integer</code>
	 */
	int getOptionsCount();

	/**
	 * Get raw configuration value
	 * @param option
	 * @return
	 * @throws NullPointerException
	 */
	Object getValue(Options option);
	
	/**
	 * 
	 * @param option
	 * @return
	 * @throws NullPointerException
	 */
	String getString(Options option);
	
	/**
	 * 
	 * @param option
	 * @return
	 * @throws NullPointerException
	 */
	long getLong(Options option);
	
	/**
	 * 
	 * @param option
	 * @return
	 * @throws NullPointerException
	 */
	int getInt(Options option);
	
	/**
	 * 
	 * @param option
	 * @return
	 * @throws NullPointerException
	 */
	BigInteger getBigInteger(Options option);
	
}
