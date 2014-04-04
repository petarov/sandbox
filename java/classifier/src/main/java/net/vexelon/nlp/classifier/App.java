package net.vexelon.nlp.classifier;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import opennlp.tools.doccat.DoccatModel;
import opennlp.tools.doccat.DocumentCategorizerME;

/**
 * Natural Language Processing Test App
 *
 */
public class App 
{
	private final static Logger log = LoggerFactory.getLogger(App.class);
	
    public static void main( String[] args )
    {
        App app = new App();
        try {
        	app.start();
        } catch (Exception e) {
        	log.error("Fatal Error", e);
        }
    }
    
    public void start() throws Exception {
    	
    	String[] testFiles = {
    			"data/test/Cosmic barometer could reveal violent events in universe's past.txt",
    			"data/test/Mars-mimicking chamber explores habitability of other planets.txt",
    			"data/test/NASA Mars Orbiter images may show 1971 Soviet lander.txt",
    			//"data/test/Observatory.txt",
    			"data/test/Space tool for lunar exploration.txt"
    	};
    	
    	List<DoccatModel> models = loadModels();
    	
    	for (String path : testFiles) {
    		log.info("----- Testing: {} ------", path);
			String contents = readFile(path);
			categorize(contents, models);
		}
    	
    }
    
    private String readFile(String filePath) throws IOException {
    	List<String> lines = Files.readAllLines(FileSystems.getDefault().getPath(filePath), Charset.forName("utf-8"));
    	log.trace("Lines Read: {}", lines.size());
    	
    	String text = StringUtils.join(lines.toArray());
    	return text;
    }
    
    private void categorize(String text, List<DoccatModel> models) {
    	
    	for (DoccatModel doccatModel : models) {
    		DocumentCategorizerME categorizer = new DocumentCategorizerME(doccatModel);
    		double[] outcome = categorizer.categorize(text);
    		String category = categorizer.getBestCategory(outcome);
    		
    		log.info("Category found: {}", category);
		}
    	
    }
    
    private List<DoccatModel> loadModels() throws IOException {
    	
    	List<DoccatModel> modelsList = new ArrayList<DoccatModel>();
    	String[] modelFiles = {
    			"data/en-comets.bin",
    			"data/en-mars.bin"
    	};
    	
    	InputStream is = null;
    	try {
    		
    		for (String path : modelFiles) {
    			log.info("Loading model: {}", path);
    			is = new FileInputStream(path);
    			DoccatModel model = new DoccatModel(is);
    			modelsList.add(model);
			}
    		
    	} finally {
    		if (is != null) {
    			is.close();
    		}
    	}
    	
    	return modelsList;
    }
}
