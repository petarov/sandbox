/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server;

import com.google.common.base.Charsets;

/**
 * What we would like to do here is to run a number of tests on the current JVM. 
 * <p>
 * Often we check for encoding or encryption algorithm availability exceptions. In such cases we would
 * like to know as early as possible instead of having a chain of checked exceptions in the code.
 * <p>
 * Therefore, if we test these during Bootstrap we can *assume* we would not expect any such exceptions later
 * when the application is running. 
 * 
 * @author p.petrov
 *
 */
public class SanityTest {
	
	public static void run() throws Exception {
		
		/*
		 * Would throw UnsupportedEncodingException if Java VM is started without UTF-8 support!
		 */ 
		"Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich".getBytes(Charsets.UTF_8);
		"Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч ".getBytes(Charsets.UTF_8);
	}

}
