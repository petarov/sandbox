/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.nlp;

@SuppressWarnings("serial")
public class NLPException extends Exception {
	
	public NLPException(String msg) {
		super(msg);
	}
	
	public NLPException(String msg, Throwable t) {
		super(msg, t);
	}

}
