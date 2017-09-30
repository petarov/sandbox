/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.resources;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import net.vexelon.mkp.server.conf.defs.Globals;

import com.google.inject.servlet.RequestScoped;

/**
 * Content classifier
 * 
 * @author p.petrov
 *
 */
@Path(Globals.RESOURCE_CLASSIFIER)
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class ClassifierResource extends AbstractResource  {
	
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
	@POST @Path("/{id}")
    public Response getUser(@PathParam("id") String userId) { 
		log.debug("@GET {}", userId);
		
		return null;
	}	
	
}
