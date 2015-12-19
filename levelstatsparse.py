#!/usr/bin/python

import sys
from bs4 import BeautifulSoup
import requests
import unicodedata

# print 'Number of arguments:', len(sys.argv), 'arguments.'
# print 'Argument List:', str(sys.argv)

# Get the response text from the levelstats page.
response = requests.get('http://www.flashflashrevolution.com/levelstats.php?level=2130')
responseText = response.text
levelPageSoup = BeautifulSoup(responseText, "html.parser")

# Select all the song info tables and find the h2 element for the song title.
songInfoTable = levelPageSoup.select('table[width="200"]')[0] # CSS Selector
songTitle = levelPageSoup.select('h2')[1] # Song Title

# Get all the necessary td's we need for the song information.
songInfoTrs = songInfoTable.select('td[style="padding:3px;"] tr')
songInfoTds = []
for tr in songInfoTrs:
    songInfoTd = tr.select('td')[1]
    songInfoTds.append(songInfoTd)

"""
tr[0] = Musician
tr[2] = Stepartist
tr[3] = Level Number
tr[4] = Song Genre
tr[5] = Song Style
tr[6] = Difficulty
tr[7] = Release Date
tr[8] = Song Length
tr[9] = Number of AAA's
tr[10] = Number of FC's
tr[11] = Number of Players
tr[12] = Number of Times Played
"""
musician = songInfoTds[0].get_text()
stepartist = songInfoTds[2].get_text()
levelNum = songInfoTds[3].get_text()
songGenre = songInfoTds[4].get_text()
songStyle = songInfoTds[5].get_text()
difficulty = songInfoTds[6].get_text()
releaseDate = songInfoTds[7].get_text()
songLength = songInfoTds[8].get_text()

# Normalize the unicode strings in our data
musician = unicodedata.normalize('NFKD', musician).encode('ascii','ignore')
stepartist = unicodedata.normalize('NFKD', stepartist).encode('ascii','ignore')
levelNum = unicodedata.normalize('NFKD', levelNum).encode('ascii','ignore')
songGenre = unicodedata.normalize('NFKD', songGenre).encode('ascii','ignore')
songStyle = unicodedata.normalize('NFKD', songStyle).encode('ascii','ignore')
difficulty = unicodedata.normalize('NFKD', difficulty).encode('ascii','ignore')
releaseDate = unicodedata.normalize('NFKD', releaseDate).encode('ascii','ignore')
songLength = unicodedata.normalize('NFKD', songLength).encode('ascii','ignore')

# Create a dictionary to return
songInfo = {}
songInfo['musician'] = musician
songInfo['stepartist'] = stepartist
songInfo['id'] = levelNum
songInfo['genre'] = songGenre
songInfo['style'] = songStyle
songInfo['difficulty'] = difficulty
songInfo['release'] = releaseDate
songInfo['length'] = songLength

# For transferring data back to node through stdout
print songInfo
