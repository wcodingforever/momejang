import requests

# file = { 'file' : ("Blank2.gif", open("Blank.gif", "rb"), 'image/gif') }
# file2 = {'file' : ("TestText2.txt", open("TestText.txt", "rb"), 'text/plain') }
# file3 = {'file' : ("small2.png", open("small.png", "rb"), 'image/png') }
file4 = { 'file' : ("Pretty2.jpg", open("Pretty.jpg", "rb"), 'image/jpg') }
# fileCol = [file, file2, file3, file4]
r = requests.post("http://localhost:8001", files=file4)
print(r)