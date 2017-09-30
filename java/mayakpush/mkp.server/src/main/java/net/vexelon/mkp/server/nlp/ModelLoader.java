/*
 * Copyright (C) 2014 Vexelon.NET Services
 * http://vexelon.net
*/
package net.vexelon.mkp.server.nlp;

import com.google.common.base.Optional;

import opennlp.tools.util.model.BaseModel;

public interface ModelLoader {
	
	/**
	 * Reload models from data source.
	 * @throws NLPException
	 */
	void reload() throws NLPException;
	
	/**
	 * Get first available model by type.
	 * @param modelType
	 * @return
	 */
	Optional<BaseModel> getModel(ModelType modelType);
	
	/**
	 * Get model by name.
	 * @param modelName
	 * @return
	 */
	Optional<BaseModel> getModelByType(Class<?> modelClass);

}
