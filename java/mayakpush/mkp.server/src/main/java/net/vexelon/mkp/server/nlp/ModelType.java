/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.nlp;

public enum ModelType {
	
	DEFAULT_NAMEFINDER_PERSON(100),
	DEFAULT_NAMEFINDER_LOCATION(101)
	;
	
	private int type;

	ModelType(int type) {
		this.type = type;
	}
	
	int getType() {
		return this.type;
	}
}
