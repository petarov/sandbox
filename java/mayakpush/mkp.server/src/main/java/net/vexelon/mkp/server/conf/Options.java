/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf;

/**
 * This enumeration holds names and types of properties we expect to be present
 * in the configuration INI file.
 * 
 * @author p.petrov
 *
 */
public enum Options {
	
	SERVER_NAME("mkp.server.name", String.class),
	SERVER_ADDRESS("mkp.server.address", String.class),
	
	;
	
	String name;
	Class<?> type;
	boolean optional;
//	Object defaultValue;
	
	Options(String name, Class<?> type, boolean optional, Object defaultValue) {
		this.name = name;
		this.type = type;
		this.optional = optional;
//		this.defaultValue = defaultValue;
	}
	
	Options(String name, Class<?> type) {
		this.name = name;
		this.type = type;
		this.optional = false;
//		this.defaultValue = null;
	}
	
	public String getName() {
		return this.name;
	}
	
	public Class<?> getType() {
		return this.type;
	}
	
	public boolean isOptional() {
		return this.optional;
	}

//	public Object getDefaultValue() {
//		return this.defaultValue;
//	}	
}
