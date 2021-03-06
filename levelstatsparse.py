#!/usr/bin/python

import sys
from bs4 import BeautifulSoup
import requests
import unicodedata
import argparse
import json

# Set up the level number argument to parse for our script.
parser = argparse.ArgumentParser(description='Process a level number.')
parser.add_argument('-l','--level', help='Level Number', required=True)
args = vars(parser.parse_args())
levelId = args['level']

try:

    # Get the response text from the levelstats page.
    response = requests.get('http://www.flashflashrevolution.com/levelstats.php?level=' + levelId)
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
    tr[7] = Notecount
    tr[8] = Release Date
    tr[9] = Song Length
    tr[10] = Number of AAA's
    tr[11] = Number of FC's
    tr[12] = Number of Players
    tr[13] = Number of Times Played
    """
    title = songTitle.get_text()
    musician = songInfoTds[0].get_text()
    stepartist = songInfoTds[2].get_text()
    levelNum = songInfoTds[3].get_text()
    songGenre = songInfoTds[4].get_text()
    songStyle = songInfoTds[5].get_text()
    difficulty = songInfoTds[6].get_text()
    noteCount = songInfoTds[7].get_text()
    releaseDate = songInfoTds[8].get_text()
    songLength = songInfoTds[9].get_text()

    # Normalize the unicode strings in our data
    title = unicodedata.normalize('NFKD', title).encode('ascii','ignore')
    musician = unicodedata.normalize('NFKD', musician).encode('ascii','ignore')
    stepartist = unicodedata.normalize('NFKD', stepartist).encode('ascii','ignore')
    levelNum = unicodedata.normalize('NFKD', levelNum).encode('ascii','ignore')
    songGenre = unicodedata.normalize('NFKD', songGenre).encode('ascii','ignore')
    songStyle = unicodedata.normalize('NFKD', songStyle).encode('ascii','ignore')
    difficulty = unicodedata.normalize('NFKD', difficulty).encode('ascii','ignore')
    noteCount = unicodedata.normalize('NFKD', noteCount).encode('ascii','ignore')
    releaseDate = unicodedata.normalize('NFKD', releaseDate).encode('ascii','ignore')
    songLength = unicodedata.normalize('NFKD', songLength).encode('ascii','ignore')

    # Create a dictionary to return
    songInfo = {}
    songInfo['title'] = title
    songInfo['musician'] = musician
    songInfo['stepartist'] = stepartist
    songInfo['id'] = levelNum
    songInfo['genre'] = songGenre
    songInfo['style'] = songStyle
    songInfo['difficulty'] = difficulty
    songInfo['notecount'] = noteCount 
    songInfo['release'] = releaseDate
    songInfo['length'] = songLength

    # For transferring data back to node through stdout
    print json.dumps(songInfo, sort_keys=True, indent=4, separators=(',', ': '))

except:

    # Create a dictionary to return to prevent a page blowup
    songInfo = {}
    songInfo['title'] = 'Invalid Id'
    songInfo['musician'] = 'Invalid Id'
    songInfo['stepartist'] = 'Invalid Id'
    songInfo['id'] = levelId
    songInfo['genre'] = 'Invalid Id'
    songInfo['style'] = 'Invalid Id'
    songInfo['difficulty'] = 'Invalid Id'
    songInfo['notecount'] = 'Invalid Id'
    songInfo['release'] = 'Invalid Id'
    songInfo['length'] = 'Invalid Id'

    # For transferring data back to node through stdout
    print json.dumps(songInfo, sort_keys=True, indent=4, separators=(',', ': '))
