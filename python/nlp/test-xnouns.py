# Requirements:
#   pip3 install -U textblob-de

from textblob_de import TextBlobDE as TextBlob

text = '''Heute ist der 3. Mai 2014 und Dr. Meier feiert seinen 43. Geburtstag.
Ich muss unbedingt daran denken, Mehl, usw. für einen Kuchen einzukaufen. Aber leider
habe ich nur noch EUR 3.50 in meiner Brieftasche.'''

blob = TextBlob(text)

print(blob.nouns)
