package net.vexelon.osgi.pgpdir.service;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.List;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import net.vexelon.osgi.pgpdir.PGPDirException;
import net.vexelon.osgi.pgpdir.search.Searchable;
import net.vexelon.osgi.pgpdir.search.User;

public class LDAPDirectory implements Searchable {
	
	private final String LDAP_SEARCHBASE = "o=Searchable PGP keys";
	
	private LdapContext ldapContext;
	

	@Override
	public void open(String url) throws PGPDirException {
        
        Hashtable<String, Object> env = new Hashtable<String, Object>();
        env.put(Context.SECURITY_AUTHENTICATION, "none");
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL, url);

        //ensures that objectSID attribute values
        //will be returned as a byte[] instead of a String
//        env.put("java.naming.ldap.attributes.binary", "objectSID");
        
        // the following is helpful in debugging errors
        //env.put("com.sun.jndi.ldap.trace.ber", System.err);
        
        try {
			ldapContext = new InitialLdapContext(env, null);
		} catch (NamingException e) {
			throw new PGPDirException("Failed to initialize LDAP connection!", e);
		}
	}

	@Override
	public void close() throws PGPDirException {
		try {
			if (ldapContext != null)
				ldapContext.close();
		} catch (NamingException e) {
			throw new PGPDirException("Failed to close LDAP connection!", e);
		}
	}

	@Override
	public List<User> search(String userId) throws PGPDirException {
		List<User> usersList = new ArrayList<User>();
		
		DirContext ctx = this.ldapContext;
		
		String searchFilter = "(&(objectClass=pgpKeyInfo)(|(pgpUserID=*" + userId + ")(pgpUserID=" + userId + "*)))";

        SearchControls searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);

        try {
            NamingEnumeration<SearchResult> results = ctx.search(LDAP_SEARCHBASE, searchFilter, searchControls);

            SearchResult searchResult = null;
            if(results.hasMoreElements()) {
                 searchResult = (SearchResult) results.nextElement();
                 try {
	                 User u = new User();
	                 u.setUserId((String)searchResult.getAttributes().get("pgpUserID").get());
	                 u.setUserEmail((String)searchResult.getAttributes().get("pgpUserID").get());
	                 u.setKeyId((String)searchResult.getAttributes().get("pgpKeyID").get());
	                 u.setKeyFingerprint((String)searchResult.getAttributes().get("pgpCertID").get());
	                 usersList.add(u);
	                 
	                 //make sure there is not another item available, there should be only 1 match
	                 if(results.hasMoreElements()) {
	                     System.err.println("Matched multiple users for the accountName: " + u.getUserId());
	                     throw new PGPDirException("More than 1 match found!");
	                 }	                 
                 } catch (NamingException e) {
                	 System.err.println("Failed getting user attribute!");
                	 System.err.println(e);
                 }
            }        	
        } catch (NamingException e) {
        	throw new PGPDirException("LDAP directory search failed!", e);
        }
        
		return usersList;
	}

}
