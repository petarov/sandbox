package net.vexelon.osgi.pgpdir.service;

import net.vexelon.osgi.pgpdir.search.Searchable;
import net.vexelon.osgi.pgpdir.search.SearchableProducer;

public class LDAPDirectoryProducer implements SearchableProducer {

	@Override
	public Searchable newSearchable() {
		return new LDAPDirectory();
	}

}
