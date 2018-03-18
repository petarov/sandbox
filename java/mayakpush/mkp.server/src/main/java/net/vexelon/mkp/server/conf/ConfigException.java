/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf;

@SuppressWarnings("serial")
public class ConfigException extends Exception {
	
	protected Options option;
	
	public ConfigException(Options option) {
		this.option = option;
	}
	
	public ConfigException(Options option, String message) {
		super(message);
	}
	
	public ConfigException(Options option, String message, Throwable t) {
		super(message, t);
	}	
	
	public ConfigException(String message) {
		super(message);
	}	
	
	public ConfigException(String message, Throwable t) {
		super(message, t);
	}	

	public Options getOption() {
		return option;
	}

}
