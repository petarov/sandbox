package net.vexelon.osgi.pgpdir.search;

import java.util.List;

import net.vexelon.osgi.pgpdir.PGPDirException;

public interface Searchable {
	
	void open(String url) 
			throws PGPDirException;
	
	void close()
			throws PGPDirException;

	List<User> search(String userId)
			throws PGPDirException;
}
