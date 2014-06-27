package net.vexelon.osgi.pgpdir.consumer;

import org.eclipse.osgi.framework.console.CommandInterpreter;
import org.eclipse.osgi.framework.console.CommandProvider;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Activator implements BundleActivator, CommandProvider {
	
	Logger logger = LoggerFactory.getLogger(Activator.class);
	
	private BundleContext context;
	private StringBuilder builder;
	
	@Override
	public void start(BundleContext context) throws Exception {
		logger.info("* PGP Consumer started.");
		this.context = context;
		
		// register command provider
		context.registerService(CommandProvider.class.getName(), this, null);
	}

	@Override
	public void stop(BundleContext context) throws Exception {
		logger.info("* PGP Consumer closed.");
	}
	
	@Override
	public String getHelp() {
		if (builder == null) {
			builder = new StringBuilder();
			builder.append("---PGPService Commands---\n")
			.append("\tversion - returns version information\n")
			.append("\techo - echo your input\n")
			.append("\tsearch - Search for user in PGP directory\n");
		}
		return builder.toString();
	}
	
	public void _version(CommandInterpreter ci) throws Exception {
		String version = context.getBundle().getHeaders().get(Constants.BUNDLE_VERSION);
		System.out.println("\t " + version);
	}
	
	public void _echo(CommandInterpreter ci) throws Exception {
		System.out.println("\t " + ci.nextArgument());
	}
	
	public void _search(CommandInterpreter ci) throws Exception {
		String arg;
		do {
			arg = ci.nextArgument();
			if (arg != null) {
				arg = arg.trim();
				LDAPDirectoryServiceProducer consumer = new LDAPDirectoryServiceProducer();
				logger.info("Searching for '{}'", arg);
				consumer.search(arg);
			}
		} while (arg != null);
	}	
	
}
