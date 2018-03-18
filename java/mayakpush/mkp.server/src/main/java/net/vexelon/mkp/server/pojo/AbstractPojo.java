/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.pojo;

import com.google.gson.Gson;

public abstract class AbstractPojo {
	
	protected static final Gson GSON = new Gson();
	
	public String toJSON() {
		return GSON.toJson(this);
	}

}
