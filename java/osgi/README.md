OSGi Tests & Apps
===================================

A list of various OSGi experiments and tests.

## PGP Key Search Service

This is an OSGi based application that consists of 3 bundles:

  * [net.vexelon.osgi.pgpdir](net.vexelon.osgi.pgpdir) - Defines interfaces for a PGP key search service implementation.
  * [net.vexelon.osgi.pgpdir.service](net.vexelon.osgi.pgpdir.service) - Implements PGP key searching in an LDAP server.
  * [net.vexelon.osgi.pgpdir.consumer](net.vexelon.osgi.pgpdir.consumer) - Enumerates available services and provides user command line.
  
The consumer bundle uses [Declarative Services](http://wiki.osgi.org/wiki/Declarative_Services) to discover and register existing PGP services. 

To run this application in Eclipse Equinox, create a new *OSGi Framework* Run Configuration and select the 3 bundles. Click on *Add Required Bundles* to select dependencies.

Use the following commands in the OSGi console:
  
    search <name or e-mail address>
	echo <test message>

Each search query is done in a separate thread, so you may search for more than one user at a time. When the search is completed, the results will be displayed in the OSGi console.
	

## Other Tests

  * [net.vexelon.osgi.ex01](net.vexelon.osgi.ex01) - Service Tracker tests
  * [net.vexelon.osgi.ex02](net.vexelon.osgi.ex02) - Service Tracker tests
  * [net.vexelon.osgi.ex03.consumer](net.vexelon.osgi.ex03.consumer) - Declarative services test
  * [net.vexelon.osgi.ex03.provider](net.vexelon.osgi.ex03.provider) - Declarative services test