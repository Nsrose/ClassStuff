## Edits appropriate lines of new attendance web app. 
import urllib2
import sys
import os


valid_buildings = {
    "Pimentel" : (37.873421, -122.256020),
    "Evans" : (37.873635, -122.257914),
    "Wheeler" : (37.871135, -122.259062),
    "Soda" : (37.875588, -122.258803),
    "Dwinelle" : (37.870579, -122.260509),
}

def parse_script(app_name, firebase_url, xcoord, ycoord):
    '''Reads script.js and edits the appropriate fields.'''
    scriptjs_path = app_name + "/static/js/script.js"
    newscript_path = app_name + "/static/js/script-new.js"
    scriptjs = open(scriptjs_path, 'r')
    lines = scriptjs.readlines()
    new_lines = lines
    for i in range(len(lines)):
        line = lines[i]
        new_line = line
        split_line = new_line.split(" ")
        if i == 1:
            # Url line
            last = '"' + str(firebase_url) + '";\n'
            split_line[-1] = last
            new_line = (" ").join(split_line)
        elif i == 4:
            # xcoord line
            last = str(xcoord) + ';\n'
            split_line[-1] = last
            new_line = (" ").join(split_line)
        elif i == 5:
            # ycoord line
            last = str(ycoord) + ';\n'
            split_line[-1] = last
            new_line = (" ").join(split_line)
        
        new_lines[i] = new_line

    newscriptjs = open(newscript_path, 'w')
    new_content = (' ').join(new_lines)
    newscriptjs.write(new_content)
    
    scriptjs.close()
    newscriptjs.close()

    os.remove(scriptjs_path)
    os.rename(newscript_path, scriptjs_path)

    return

app_name = sys.argv[1]     

done = False
while not done:

    firebase_url = raw_input("Enter the Firebase URL where you will collect data: ")
    try:
        print("Checking url...")
        urllib2.urlopen(firebase_url)
    except urllib2.HTTPError, e: 
        print("This doesn't appear to be a valid URL.")
    except urllib2.URLError, e:
        print("This doesn't appear to be a valid URL.")
    done = True

done = False
while not done:

    print("\n")
    print("Valid buildings:")
    for building in valid_buildings:
        print(building)
    print("\n")    
    location_string = raw_input("Enter the building where this class will be held: ")

    if location_string not in valid_buildings:
        print("Error -- " + location_string + " is not a valid campus building.")
    else:
        done = True

coords = valid_buildings[location_string]
xcoord = coords[0]
ycoord = coords[1]
parse_script(app_name, firebase_url, xcoord, ycoord)

