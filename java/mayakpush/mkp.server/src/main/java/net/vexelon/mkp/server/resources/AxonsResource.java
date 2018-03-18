/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.resources;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.examples.httppatch.PATCH;
import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;

import com.google.inject.servlet.RequestScoped;

import net.vexelon.mkp.server.conf.defs.Globals;
import net.vexelon.mkp.server.pojo.AxonPojo;
import net.vexelon.mkp.server.pojo.ResponsePojo;
import net.vexelon.mkp.server.services.axons.AxonsService;
 
/**
 * Content resources stub. 
 * All sub operations and requests related to CRUD of charts are described here.
 * 
 * @author p.petrov
 *
 */
@Path(Globals.RESOURCE_AXONS)
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class AxonsResource extends AbstractResource {
	
	private AxonsService axonService; 
	
	@Inject
	public AxonsResource(AxonsService axonService) {
		this.axonService = axonService;
	}
	
	/**
	 * Get a list of available axons
	 * 
	 * <pre>
	 * GET /axons HTTP/1.1
	 * Accept: application/json
	 * </pre>
	 *  
	 * @return
	 */
	@GET
    public Response getAxons() { 
		log.debug("@GET getAxons");
		
		axonService.getResources();
		
		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
				.entity("List of Axons")
				.build();
	}
	
	/**
	 * Create new axon
	 * 
	 * <pre>
	 * POST /axons HTTP/1.1
	 * Accept: application/json
	 * Content-Type: application/json
	 * </pre>
	 *  
	 * @param json
	 * @return 
	 */
	@POST
    public Response createAxon(AxonPojo json) {
		log.debug("@POST createAxon");
		
		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
//				.entity(new Gson().toJson(json))
				.entity(json)
				.build();
	}
	
	/**
	 * Get properties of an axon.
	 * Get axon by Id.
	 * 
	 * <pre>
	 * GET /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * </pre>
	 *  
	 * @param axonId
	 * @return
	 */
	@Path("/{id}")
	@GET 
    public Response getAxon(@PathParam("id") String axonId) { 
		log.debug("@GET getAxon");
		
		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
				.entity("getAxon " + axonId)
				.build();
	}	

	/**
	 * Update properties for given chart Id.
	 * 
	 * <pre>
	 * PATCH /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * Content-Type: application/json
	 * </pre>
	 *  
	 * @param axonId
	 * @param json
	 * @return
	 */
	@Path("/{id}")
	@PATCH 
	public Response updateAxonPropeties(@PathParam("id") String axonId, AxonPojo json) {
		log.debug("@PATCH updateAxon");

		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
				.entity(json)
				.build();
	}
	
	/**
	 * Removes existing axon.
	 * 
	 * <pre>
	 * DELETE /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * </pre>
	 *  
	 * @param axonId
	 * @return
	 */
	@Path("/{id}")
	@DELETE
	public Response deleteAxon(@PathParam("id") String axonId) {
		
		//TODO: proper authorization
		
		ResponsePojo resp = new ResponsePojo();
		resp.setIsoDate(new DateTime().toString(ISODateTimeFormat.dateTime()))
			.setStatusCode(Response.Status.OK.getStatusCode())
			.setStatusMessage("OK");		
		
		log.debug("@DELETE {}", axonId);
		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
				.entity(resp.toJSON())
				.build();
	}
	
	/**
	 * Purge removed axon form data store.
	 * 
	 * <pre>
	 * DELETE /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * </pre>
	 *  
	 * @param axonId
	 * @return
	 */
	@Path("/removed/{id}")
	@DELETE
	public Response purgeAxon(@PathParam("id") String axonId) {
		
		ResponsePojo resp = new ResponsePojo();
		resp.setIsoDate(new DateTime().toString(ISODateTimeFormat.dateTime()))
			.setStatusCode(Response.Status.OK.getStatusCode())
			.setStatusMessage("OK");		
		
		log.debug("@DELETE {}", axonId);
		return Response.status(Response.Status.OK)
				.type(MediaType.APPLICATION_JSON)
				.entity(resp.toJSON())
				.build();
	}
	
	/**
	 * Update axon data.
	 *  
	 * <pre>
	 * POST /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * Content-Type: text/plain
	 * </pre>
	 * 
	 * @param axonId
	 * @param json
	 * @return
	 */
	@Path("/{id}")
	@POST 
	@Consumes(MediaType.TEXT_PLAIN)
    public Response updateAxon(@PathParam("id") String axonId, AxonPojo json) {
		log.info("@POST updateAxon");
		
		return Response.status(Response.Status.OK)
				.type(MediaType.TEXT_PLAIN)
				.entity(json)
				.build();
	}
	
	/**
	 * Train axon with model data.
	 *  
	 * <pre>
	 * POST /axons/{id} HTTP/1.1
	 * Accept: application/json
	 * Content-Type: text/plain
	 * </pre>
	 * 
	 * @param axonId
	 * @param model
	 * @return
	 */
	@Path("/{id}/train")
	@POST 
	@Consumes(MediaType.TEXT_PLAIN)
    public Response trainAxon(@PathParam("id") String axonId, String model) {
		log.info("@POST trainAxon");
		
		return Response.status(Response.Status.OK)
				.type(MediaType.TEXT_PLAIN)
				.entity(model)
				.build();
	}	
 
}
