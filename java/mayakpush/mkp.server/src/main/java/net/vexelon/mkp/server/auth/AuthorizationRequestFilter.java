/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.auth;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.SecurityContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * API access filter
 * 
 * @author p.petrov
 *
 */
public class AuthorizationRequestFilter implements ContainerRequestFilter {
	
	protected static final Logger log = LoggerFactory.getLogger(AuthorizationRequestFilter.class);

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		
		final SecurityContext securityContext = requestContext
				.getSecurityContext();
		
		String apiKey = requestContext.getHeaderString("api-key");
		if (apiKey == null || apiKey.isEmpty()) {
			log.warn("Invalid API key!");
		} else {
			log.trace("API-Key: {}", apiKey);
		}
		
		if (securityContext == null || !securityContext.isUserInRole("privileged")) {
			
			log.warn("User cannot access the resource.");
//			requestContext.abortWith(Response
//					.status(Response.Status.UNAUTHORIZED)
//					.entity("User cannot access the resource.").build());
		}
	}

}
