/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server;

import javax.xml.ws.ServiceMode;

import net.vexelon.mkp.server.conf.ConfigException;
import net.vexelon.mkp.server.conf.Configuration;
import net.vexelon.mkp.server.conf.Options;
import net.vexelon.mkp.server.conf.SysPropsConfiguration;
import net.vexelon.mkp.server.di.ServiceModule;
import net.vexelon.mkp.server.di.ServletModule;
import net.vexelon.mkp.server.nlp.FSModelLoader;
import net.vexelon.mkp.server.nlp.ModelLoader;
import net.vexelon.mkp.server.nlp.NLPException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * Bootstrap class must take care of:
 * <ol>
 * <li> Loading configuration files
 * <li> Validating loaded settings
 * <li> Perform system self tests
 * <li> Create configuration registry instance
 * 
 * @author p.petrov
 *
 */
public class Bootstrap {
	
	private static final Logger log = LoggerFactory.getLogger(Bootstrap.class);
	
	private Configuration configuration;
	
	private ModelLoader modelLoader;
	
	public void init() throws BootException {
		
		/*
		 * Make sure required environment variables are set
		 */
//		String configDir = System.getenv(Globals.ENV_CONFIG_DIR);
//		if (configDir == null) {
//			throw new BootException("Required environment variable " + Globals.ENV_CONFIG_DIR + " is not set!");
//		}
		
		/*
		 * Setup logging
		 */
//		Path log4jPath = Paths.get(configDir, Globals.LOGGING_LOG4J_NAME);
//		try {
//			validateResourceExists(log4jPath, TPL_LOG4J_PATH);
//		} catch (IOException e) {
//			throw new BootException(String.format("Failed to copy %s to %s ! (%s)", 
//					Globals.LOGGING_LOG4J_NAME, configDir, e.toString()));
//		}
//		
//		PropertyConfigurator.configureAndWatch(log4jPath.toString(), Globals.LOGGING_REFRESH_PERIOD);

		log.info("Server is booting ...");
		//TODO add version manifest reader
		
		/*
		 * Run sanity checks
		 */
		try {
			SanityTest.run();
		} catch (Exception e) {
			throw new BootException("Self testing has failed!", e);
		}
		
		/*
		 * Init/Load configurations
		 */
		log.info("Loading configurations ...");
		
		try {
			configuration = new SysPropsConfiguration();
			configuration.load();
		} catch (ConfigException e) {
			throw new BootException("Failed to load configuration properties!", e);			
		}
		
		/*
		 * Init/Load NLP models
		 */
		log.info("Loading NLP models ...");
		
		try {
			modelLoader = new FSModelLoader("models-registry.json");
			modelLoader.reload();
		} catch (NLPException e) {
			throw new BootException("Failed to load models!", e);			
		}		
		
		/*
		 * Start self-tests
		 */
		// TODO:
		
		//TODO sync NTP server
		
		/*
		 * Register injectors
		 */
		log.info("Registering injectors ...");
		
		ServletModule.configurationInstance = configuration;
		ServiceModule.modelLoaderInstance = modelLoader;
		
		log.info("{} is starting ...", configuration.getString(Options.SERVER_NAME));		
	}
	
//	private void validateResourceExists(Path destination, Path resourcePath) throws IOException  {
////		try {
//			if (!destination.toFile().exists()) {
////				InputStream is = getResourceAsStream(getServletContext(), resourcePath);
//				Files.copy(resourcePath, destination);
//			}
////		} catch (Exception e) {
////			System.err.println(String.format("Failed to copy %s to %s ! (%s)", 
////					resourcePath, destination, e.toString()));
////			return; // Fatal!
////		}			
//	}	
	
	public void destroy() {
		// Leer
	}
	
}
