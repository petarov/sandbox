/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import net.vexelon.mkp.server.conf.defs.Globals;

import com.google.inject.servlet.RequestScoped;

/**
 * Content resources stub. 
 * All sub operations and requests related to CRUD of charts are described here.
 * 
 * @author p.petrov
 *
 */
@Path(Globals.RESOURCE_USERS)
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class UsersResource extends AbstractResource  {
	
	@Context
    SecurityContext securityContext;
	
	/**
	 * <pre>
	 * GET /users/{id} HTTP/1.1
	 * Accept: application/json
	 * </pre>
	 *  
	 * Get properties for given user Id
	 * @param userId
	 * @return
	 */
	@GET
    public Response getUsers() { 
		return Response.status(Response.Status.OK)
				.type(MediaType.TEXT_PLAIN)
				.entity("GET USERS")
				.build();
	}	
	
	
}
