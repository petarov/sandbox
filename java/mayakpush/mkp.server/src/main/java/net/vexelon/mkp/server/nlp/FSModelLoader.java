/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.nlp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Optional;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

import opennlp.tools.namefind.TokenNameFinderModel;
import opennlp.tools.util.model.BaseModel;

/**
 * File system models loader.
 * 
 * @author p.petrov
 *
 */
public class FSModelLoader implements ModelLoader {
	
	@SuppressWarnings("unused")
	private class ModelTuple {
		String name;
		String type;
		String description;
		String fileName;
		BaseModel model;
	}
	
	protected static final Logger log = LoggerFactory.getLogger(FSModelLoader.class);
	
	@SuppressWarnings("serial")
	protected static final Type stringStringMapType = new TypeToken<Map<String, Map<String, String>>>(){}.getType();
	
	private String pathToModelsRegistry;
	
	private List<ModelTuple> modelTuples = new ArrayList<FSModelLoader.ModelTuple>();
	
	public FSModelLoader(String path) {
		this.pathToModelsRegistry = path;
	}

	@Override
	public void reload() throws NLPException {

		InputStream is = Thread.currentThread().getContextClassLoader().getResourceAsStream(pathToModelsRegistry);
		if (is == null)
			throw new NLPException(pathToModelsRegistry + " resource not found!");
		
		if (!modelTuples.isEmpty())
			modelTuples.clear();
		
		/*
		 * Load all models in local tuples
		 */
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(is))) {
			Gson gson = new Gson();
			Map<String, Map<String, String>> registry = gson.fromJson(reader, stringStringMapType);
			
			Iterator<Entry<String, Map<String, String>>> iterator = registry.entrySet().iterator();
			while (iterator.hasNext()) {
				Entry<String, Map<String, String>> entry = iterator.next();
				
				/*
				 * Create new tuple that holds all available model infos
				 */
				ModelTuple tuple = new ModelTuple();
				tuple.name = entry.getKey();
				tuple.type = entry.getValue().get("type");
				tuple.description = entry.getValue().get("desc");
				tuple.fileName = entry.getValue().get("file");
				log.trace("Loading model - {} from {}", tuple.name, tuple.fileName);
				
				/*
				 * Load model binary data into an OpenNLP model
				 */
				if (tuple.type.equals(TokenNameFinderModel.class.getName())) {
					try (InputStream modelStream =  Thread.currentThread().getContextClassLoader()
							.getResourceAsStream(tuple.fileName)) {
						
						if (is == null) {
							log.warn("Failed loading model {} from {}.", tuple.name, tuple.fileName);
							continue;
						}
					
						tuple.model = new TokenNameFinderModel(modelStream);
					} 
				}
				
				modelTuples.add(tuple);
			}
			
			if (log.isWarnEnabled() && modelTuples.isEmpty()) {
				log.warn("No models lodaded!");
			}
			
		} catch (IOException e) {
			throw new NLPException("Failed loading models from file system!", e);
		}
	}

	@Override
	public Optional<BaseModel> getModel(ModelType modelType) {
		for (ModelTuple tuple : this.modelTuples) {
			if (modelType.name().equals(tuple.name))
				return Optional.of(tuple.model);
		}
		return Optional.absent();
	}
	
	@Override
	public Optional<BaseModel> getModelByType(Class<?> modelClass) {
		for (ModelTuple tuple : this.modelTuples) {
			if (modelClass.getName().equals(tuple.type))
				return Optional.of(tuple.model);
		}
		return Optional.absent();		
	}

}
