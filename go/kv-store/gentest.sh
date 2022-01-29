#!/bin/sh

SURL="http://127.0.0.1:5607"
POUT=post-urls.txt
GOUT=get-urls.txt
MAX=100

rm -f $POUT
rm -f $GOUT

i=0
while [[ $i -le $MAX ]]
do
   KEY1=key$RANDOM
   VAL1=$RANDOM
   KEY2=key$RANDOM
   VAL2=$RANDOM
   KEY3=key$RANDOM
   VAL3=$RANDOM

   echo "$SURL/ POST $KEY1=$VAL1" >> $POUT
   echo "$SURL/ POST $KEY2=$VAL2&$KEY3=$VAL3" >> $POUT

   echo "$SURL/?key=$KEY1" >> $GOUT
   echo "$SURL/?key=$KEY2&key=$KEY3" >> $GOUT

    ((i = i + 1))
done

echo Done.
