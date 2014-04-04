package net.vexelon.nlp.classifier;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import opennlp.tools.doccat.DoccatModel;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ModelManager {
	
	private static final Logger log = LoggerFactory.getLogger(ModelManager.class);
	
	private static ModelManager _instance = new ModelManager();
	
	protected ModelManager() {
		// TODO Auto-generated constructor stub
	}
	
    public List<DoccatModel> loadModels(Path directoryPath) throws IOException {
    	
    	List<DoccatModel> modelsList = new ArrayList<DoccatModel>();
    	
    	// load all models from data/
    	try (DirectoryStream<Path> ds = Files.newDirectoryStream(directoryPath)) {
    		for (Path file : ds) {
    			String ext = FilenameUtils.getExtension(file.getFileName().toString());
    			if (ext.equals("bin")) {
    				log.info("Loading model: {}", file);
    				try (InputStream is = new FileInputStream(file.toFile())) {
    					DoccatModel model = new DoccatModel(is);
    					modelsList.add(model);
    				}   	
    			}
    		}
    	}
    	
    	return modelsList;
    }	
	
	// --- static -----------------------------------------------------------
	
	public static ModelManager getInstance() {
		return _instance;
	}

}
