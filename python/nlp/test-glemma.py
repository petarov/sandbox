# Requirements:
#   pip3 install -U germalemma

from germalemma import GermaLemma

lemmatizer = GermaLemma()

# passing the word and the POS tag ("N" for noun)
#lemma = lemmatizer.find_lemma('Feinstaubbelastungen', 'N')
lemma = lemmatizer.find_lemma('Ebenen', 'N')
print(lemma)
# -> lemma is "Feinstaubbelastung"
