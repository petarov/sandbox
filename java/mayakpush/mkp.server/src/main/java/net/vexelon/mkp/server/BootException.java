/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server;

@SuppressWarnings("serial")
public class BootException extends Exception {
	
	public BootException(String message) {
		super(message);
	}	
	
	public BootException(String message, Throwable t) {
		super(message, t);
	}	

}
