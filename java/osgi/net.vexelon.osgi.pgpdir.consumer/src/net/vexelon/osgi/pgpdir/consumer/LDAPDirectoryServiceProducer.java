package net.vexelon.osgi.pgpdir.consumer;

import net.vexelon.osgi.pgpdir.search.Searchable;
import net.vexelon.osgi.pgpdir.search.SearchableProducer;

/**
 * 
 * Consume provided services using available bindings
 *
 * http://zenit.senecac.on.ca/wiki/index.php/Steps_for_Building_Declarative_Services
 */
public class LDAPDirectoryServiceProducer {
	
	private static SearchableProducer serviceProducer;
	
	public synchronized void bindServ(SearchableProducer service) {
		System.out.println("* Searchable service bound!\n");
		serviceProducer = service;
	}
	
	public synchronized void unbindServ(SearchableProducer service) {
		System.out.println("* Searchable service unbound!\n");
		serviceProducer = null;
	}
	
	public void search(String query) {
		if (serviceProducer == null) {
			System.err.println("Service producer not available!\n");
			return;
		}
		Searchable searchService = serviceProducer.newSearchable();
		Thread t = new Thread(new SearchJob(searchService, query));
		t.start();
	}
}
