package net.vexelon.osgi.pgpdir.consumer;

import java.util.List;

import net.vexelon.osgi.pgpdir.PGPDirException;
import net.vexelon.osgi.pgpdir.search.Searchable;
import net.vexelon.osgi.pgpdir.search.User;

public class SearchJob implements Runnable {
	
	Searchable service;
	private String query;
	
	public SearchJob(Searchable service, String query) {
		this.service = service;
		this.query = query;
	}

	@Override
	public void run() {
		try {
			service.open("ldap://keyserver.pgp.com:389");
			
			List<User> users = service.search(query);
			if (users.size() == 0) {
				System.out.println("Nothing found for '" + query + "'");
				return;
			}
			System.out.println("--- Found " + users.size() + " matches!");
			for (User user : users) {
				System.out.println("UserId: " + user.getUserId());
				System.out.println("E-mail: " + user.getUserEmail());
				System.out.println("Key ID: " + user.getKeyId());
				System.out.println("Fingerprint: " + user.getKeyFingerprint());
				System.out.println("-----------------------------");
			}
		} catch (PGPDirException e) {
			System.err.println("Search failed! " + e.toString());
		} finally {
			if (service != null)
				try { service.close(); } catch (PGPDirException e) {};
		}
	}

}
