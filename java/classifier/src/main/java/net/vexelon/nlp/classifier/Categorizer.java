package net.vexelon.nlp.classifier;

import java.util.List;

import opennlp.tools.doccat.DoccatModel;
import opennlp.tools.doccat.DocumentCategorizerME;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Categorizer {
	
	private static final Logger log = LoggerFactory.getLogger(Categorizer.class);

	protected Categorizer() {
		// TODO Auto-generated constructor stub
	}
	
    public void categorize(String text, List<DoccatModel> models) {
    	
    	for (DoccatModel doccatModel : models) {
    		DocumentCategorizerME categorizer = new DocumentCategorizerME(doccatModel);
    		double[] outcome = categorizer.categorize(text);
    		String category = categorizer.getBestCategory(outcome);
    		
    		log.info("Category/Results: {} / {}", category, categorizer.getNumberOfCategories());
		}
    	
    }	
	
	// --- static -----------------------------------------------------------
	
	public static Categorizer newInstance() {
		return new Categorizer();
	}	
}
