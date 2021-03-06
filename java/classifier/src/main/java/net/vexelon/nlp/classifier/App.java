package net.vexelon.nlp.classifier;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.nio.file.DirectoryStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FilenameUtils;
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
    	
    	List<DoccatModel> models = ModelManager.getInstance().loadModels(FileSystems.getDefault().getPath("data"));
    	
    	// test all files ending on .txt in the data/test folder
    	Categorizer catg = Categorizer.newInstance();
    	
    	try (DirectoryStream<Path> ds = Files.newDirectoryStream(FileSystems.getDefault().getPath("data/test"))) {
    		for (Path file : ds) {
    			String ext = FilenameUtils.getExtension(file.getFileName().toString());
    			if (ext.equals("txt")) {
	        		log.info("----- Testing: {} ------", file);
	    			String contents = readFile(file);
	    			catg.categorize(contents, models);
    			}
    		}
    	}
    }
    
    private String readFile(Path filePath) throws IOException {
    	List<String> lines = Files.readAllLines(filePath, Charset.forName("utf-8"));
//    	log.trace("Lines read: {}", lines.size());
    	String text = StringUtils.join(lines.toArray());
    	return text;
    }
        

}
