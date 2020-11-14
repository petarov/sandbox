# Requirements:
#   pip3 install  -U nltk
#   pip3 install HanTa

import nltk
import codecs
from HanTa import HanoverTagger as ht

text = '''Heute ist der 3. Mai 2014 und Dr. Meier feiert seinen 43. Geburtstag.
Ich muss unbedingt daran denken, Mehl, usw. für einen Kuchen einzukaufen. Aber leider
habe ich nur noch EUR 3.50 in meiner Brieftasche.'''

tagger = ht.HanoverTagger('morphmodel_ger.pgz')
#print(tagger.analyze('Fachmärkte'))

sentences = nltk.sent_tokenize(text,language='german')

nouns = [] 
sentences_tok = [nltk.tokenize.word_tokenize(sent) for sent in sentences]
for sent in sentences_tok:
    tags = tagger.tag_sent(sent) 
    print(tags)
    #nouns_from_sent = [lemma for (word,lemma,pos) in tags if pos == "NN" or pos == "NE"]
    nouns_from_sent = [lemma for (word,lemma,pos) in tags if pos == "ART" or pos == "PPOSAT"]
    nouns.extend(nouns_from_sent)

lemmatizer = nltk.WordNetLemmatizer()

for w in nouns:
    print(tagger.analyze(w, taglevel = 3))

