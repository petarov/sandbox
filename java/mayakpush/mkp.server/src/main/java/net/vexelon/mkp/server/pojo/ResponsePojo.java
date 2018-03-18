/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.pojo;

import com.google.gson.annotations.SerializedName;

public class ResponsePojo extends AbstractPojo {
	
	@SerializedName("dateTime")
	private String isoDate;
	
	@SerializedName("status")
	private int statusCode;
	
	@SerializedName("msg")
	private String statusMessage;
	
	public String getIsoDate() {
		return isoDate;
	}
	public ResponsePojo setIsoDate(String isoDate) {
		this.isoDate = isoDate;
		return this;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public ResponsePojo setStatusCode(int statusCode) {
		this.statusCode = statusCode;
		return this;
	}
	public String getStatusMessage() {
		return statusMessage;
	}
	public ResponsePojo setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
		return this;
	}

}
