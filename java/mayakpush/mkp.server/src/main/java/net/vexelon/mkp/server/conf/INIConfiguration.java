/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf;

import java.math.BigInteger;
import java.nio.file.Path;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

public class INIConfiguration implements Configuration {
	
	PropertiesConfiguration properties;
	
	public INIConfiguration(Path path) throws ConfigException {
		try {
			properties = new PropertiesConfiguration(path.toFile());
		} catch (ConfigurationException e) {
			throw new ConfigException("Error while opening configuration file!", e);
		}
		
		// validate all mandatory options
		Options[] options = Options.values();
		for (Options opt : options) {
			if (!opt.isOptional() && !properties.containsKey(opt.getName())) {
				throw new ConfigException(opt, opt.getName() + " - Missing required option!");
			}
		}
	}

	@Override
	public void load() throws ConfigException {
		try {
			properties.load();
		} catch (ConfigurationException e) {
			throw new ConfigException("Error while loading configuration file!", e);
		}		
	}

	@Override
	public void reload() throws ConfigException {
		try {
			// Reload immediately
			properties.refresh();
		} catch (ConfigurationException e) {
			throw new ConfigException("Failed reloading configurations!", e);
		}
	}

	@Override
	public int getOptionsCount() {
		throw new RuntimeException("Not implemented!");
	}

	@Override
	public Object getValue(Options option) {
		return properties.getProperty(option.getName());
	}

	@Override
	public String getString(Options option) {
		return properties.getString(option.getName());
	}

	@Override
	public long getLong(Options option) {
		return properties.getLong(option.getName());
	}

	@Override
	public int getInt(Options option) {
		return properties.getInt(option.getName());
	}

	@Override
	public BigInteger getBigInteger(Options option) {
		return properties.getBigInteger(option.getName());
	}

}
