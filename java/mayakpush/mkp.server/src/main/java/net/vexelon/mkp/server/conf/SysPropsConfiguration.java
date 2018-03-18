/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.conf;

import java.math.BigInteger;
import java.util.Hashtable;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Caching class for all <code>System.getProperties</code> found in {@link Options}
 * <p>
 * Why cache these? 
 * {@linkplain http://stackoverflow.com/questions/18045391/should-i-cache-system-getpropertyline-separator}
 * 
 * @author p.petrov
 *
 */
public class SysPropsConfiguration implements Configuration {
	
	private static final Logger log = LoggerFactory.getLogger(SysPropsConfiguration.class);
	
	private static final int DEFAULT_SIZE = 10;
	
	private Map<String, Integer> _intValues = new Hashtable<String, Integer>(DEFAULT_SIZE);
	private Map<String, Long> _longValues = new Hashtable<String, Long>(DEFAULT_SIZE);
	private Map<String, String> _stringValues = new Hashtable<String, String>(DEFAULT_SIZE);
	private Map<String, BigInteger> _bigintValues = new Hashtable<String, BigInteger>(DEFAULT_SIZE);
	
	private int _countValues = 0; 

	@Override
	public void load() throws ConfigException {
		
		Options[] options = Options.values();
		for (Options option : options) {
			String sysVal = System.getProperty(option.getName());
			if (sysVal == null) {
				if (!option.isOptional()) {
					throw new ConfigException(option, 
							option.getName() + " - Missing required option!");
				}
//				sysVal = option.getDeclaringClass();
				continue;
			}
			
			try {
				if (option.getType().equals(Integer.class)) {
					// Integer
					_intValues.put(option.getName(), Integer.parseInt(sysVal));
				} else if (option.getType().equals(Long.class)) {
					// Long
					_longValues.put(option.getName(), Long.parseLong(sysVal));
				} else if (option.getType().equals(String.class)) {
					// String
					_stringValues.put(option.getName(), sysVal);
				} else if (option.getType().equals(BigInteger.class)) {
					// BigInteger
					_bigintValues.put(option.getName(), new BigInteger(sysVal));
				}				
			} catch (NumberFormatException e) {
				throw new ConfigException(option, 
						option.getName() + " - Failed to to parse value!", e);
			}
			
			if (log.isTraceEnabled())
				log.trace("Loaded config key={}", option.getName());
		}
		
	}

	@Override
	public void reload() throws ConfigException {
		_intValues.clear();
		_longValues.clear();
		_stringValues.clear();
		_bigintValues.clear();
		_countValues = 0;
		load();
	}

	@Override
	public int getOptionsCount() {
		return _countValues;
	}

	@Override
	public Object getValue(Options option) {
		if (_stringValues.containsKey(option.getName()))
			return _stringValues.get(option.getName());
		if (_longValues.containsKey(option.getName()))
			return _longValues.get(option.getName());
		if (_intValues.containsKey(option.getName()))
			return _intValues.get(option.getName());
		if (_bigintValues.containsKey(option.getName()))
			return _bigintValues.get(option.getName());
		
		//XXX: Not the best solution here but will behave the same as the other getter methods
		throw new NullPointerException(option.getName() + " - property not found!");
	}

	@Override
	public String getString(Options option) {
		return _stringValues.get(option.getName());
	}

	@Override
	public long getLong(Options option) {
		return _longValues.get(option.getName());
	}

	@Override
	public int getInt(Options option) {
		return _intValues.get(option.getName());
	}

	@Override
	public BigInteger getBigInteger(Options option) {
		return _bigintValues.get(option.getName());
	}

}
