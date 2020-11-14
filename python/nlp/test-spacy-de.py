# Requirements:
#   pip3 install -U spacy
#   python3 -m spacy download de_core_news_sm

import sys
import json
import spacy
from spacy.matcher import Matcher
from spacy.matcher import PhraseMatcher

sp = spacy.load('de_core_news_sm')

with open(sys.argv[1],"r") as f:
    input = f.read()

doc = sp(input)

# find articles

# matcher = Matcher(sp.vocab)
# pattern = [{"TAG": "ART"}]
# matcher.add("pronouns", None, pattern)

# matches = matcher(doc)

# for match_id, start, end in matches:
#     string_id = sp.vocab.strings[match_id]  # Get string representation
#     span = doc[start:end]  # The matched span
#     print(match_id, string_id, start, end, span.text)

# replace articles

pool = {
    "des": ["des", "der"],
    "die": ["die", "der", "das"],
    "der": ["der", "die", "das"],
    "das": ["das", "der", "die"],
    "dem": ["dem", "den", "der"],
    "den": ["den", "dem", "der"],
    "ein": ["ein", "eine", "einem", "einer", "eines"],
    "eine": ["ein", "eine", "einem", "einer", "eines"],
    "einer": ["ein", "eine", "einem", "einer", "eines"],
    "einem": ["ein", "eine", "einem", "einer", "eines"],
    "einen": ["ein", "eine", "einem", "einer", "eines"],
    "eines": ["ein", "eine", "einem", "einer", "eines"]
}

index = {
    "in": input,
    "out": "",
    "pos": []
}
is_bracket = False
i = 0
text = ''

for token in doc:
    #print(token.text,  token.lemma_, token.pos_, token.tag_, token.dep_)

    if token.tag_ == 'ART': # tag=DET
        i += 1
        text += " <pos-{}>".format(i)
        index["pos"].append({
            'id': i,
            'pos': token.text,
            'pool': pool[token.text.lower()]
        })
    elif token.tag_ == '$,' or token.tag_ == '$.':
        text += token.text
    elif token.tag_ == '$(':
        is_bracket = True
        text += ' ' + token.text
    elif token.tag_ == '$)':
        text += token.text
    else:
        if is_bracket:
            is_bracket = False
            text += token.text
        else:
            text += ' ' + token.text

index["out"] = text

print (json.dumps(index))
#print (json.dumps(index, indent=4))