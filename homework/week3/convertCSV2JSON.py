import csv
import json

csvfile = open('verkeersdoden.csv', 'r', encoding = 'utf-8-sig')
jsonfile = open('verkeersdoden.json', 'w')

reader = csv.DictReader(csvfile, delimiter = ";", fieldnames = ( "provincie","aantal doden",));

out = json.dumps( [ row for row in reader ] );  
print ("JSON parsed!");  

jsonfile.write(out);  
print ("JSON saved!");  