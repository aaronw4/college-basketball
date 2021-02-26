import sys
import json
import requests
from bs4 import BeautifulSoup

def scraping():
    ADDRESS = 'https://www.sportsbookreview.com'
    EXTENSION = '/betting-odds/ncaa-basketball/?date='
    DATE = '20210222'
    # EXTENSION = sys.argv[1]
    # DATE = sys.argv[2]
    TEAMS_LIST = []
    SCORES_LIST = []
    SPREADS_LIST = []
    TOTALS_LIST = []
    ADDRESS_LIST = []
    TEST_DATA = []
    USER_SETTINGS = 'user_settings=eyJkYXRhIjoie1wic2V0dGluZ3NcIjpbe1wiaWRcIjpcIjVhNGJhMjYzODI4MTg5NTNjMDkyZWZmMFwiLFwidmFsdWVcIjpcIlxcXCJ0aW1lXFxcIlwifSx7XCJpZFwiOlwiNWE0M2MxMWI4MjgxODk1M2MwOTJlZmU1XCIsXCJ2YWx1ZVwiOlwiXFxcIlVTL0Vhc3Rlcm5cXFwiXCJ9LHtcImlkXCI6XCI1YTQzYzBhZjgyODE4OTUzYzA5MmVmZTRcIixcInZhbHVlXCI6XCJcXFwiMjM4LTIwXFxcIlwifSx7XCJpZFwiOlwiNWE0M2JlOWQ4MjgxODk1M2MwOTJlZmUzXCIsXCJ2YWx1ZVwiOlwiXFxcInVzXFxcIlwifSx7XCJpZFwiOlwiNWE0M2JlNzA4MjgxODk1M2MwOTJlZmUyXCIsXCJ2YWx1ZVwiOlwiZmFsc2VcIn0se1wiaWRcIjpcIjVhNDNiZTQwODI4MTg5NTNjMDkyZWZlMVwiLFwidmFsdWVcIjpcInRydWVcIn0se1wiaWRcIjpcIjVhNDNiZGMxODI4MTg5NTNjMDkyZWZlMFwiLFwidmFsdWVcIjpcImZhbHNlXCJ9LHtcImlkXCI6XCI1YTQzYThjYTgyODE4OTUzYzA5MmVmZGFcIixcInZhbHVlXCI6XCJmYWxzZVwifSx7XCJpZFwiOlwiNWE0Mjg0OWM4MjgxODk1M2MwOTJlZmQ5XCIsXCJ2YWx1ZVwiOlwiXFxcInRydWVcXFwiXCJ9LHtcImlkXCI6XCI1YjBlYmNiMjVkMzQ0NjI4YTU0ZDRmZmFcIixcInZhbHVlXCI6XCJcXFwiY29tcGFjdFxcXCJcIn1dfSIsInR5cGUiOiJvYmplY3QifQ=='
    headers={
        "cookie" : USER_SETTINGS,
        "User-Agent" : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0'
    }

    html_data = requests.get(
        ADDRESS + EXTENSION + DATE,
        headers=headers
    )
    soup = BeautifulSoup(html_data.text, 'lxml')
    # Create list of all team names
    for teams in soup.find_all('span', class_='participantBox-3ar9Y'):
        TEAMS_LIST.append(teams.text)

    # Create list of all team scores
    for scores in soup.find_all('div', class_='finalScore-156Hx'):
        points = scores.find_all('div')
        SCORES_LIST.append(points[0].text)
        SCORES_LIST.append(points[1].text)

    # Create a list of all game links
    for links in soup.find_all('a', class_='gradientContainer-3iN6G'):
        ADDRESS_LIST.append(links['href'])

    # Create list of game spreads
    for i in range(0, len(ADDRESS_LIST), 2):
        adddress_tail = ADDRESS_LIST[i][:-5]
        game_data = requests.get(
            ADDRESS + adddress_tail + 'line-history',
            headers=headers
        )
        soup2 = BeautifulSoup(game_data.text, 'lxml')
        containers = soup2.find_all('span', class_='column-GaqNx')
        if len(containers) < 4:
            break
        odds1 = containers[4].text.split()
        odds2 = containers[5].text.split()
        spread1 = odds1[0]
        spread2 = odds2[0]
        spread1 = spread1.replace('\u00BD', '.5')
        spread2 = spread2.replace('\u00BD', '.5')
        SPREADS_LIST.append(spread1)
        SPREADS_LIST.append(spread2)

    # Create object with data
    for i in range(0, len(SCORES_LIST), 2):
        team_stats = {}

        team_stats['team1'] = TEAMS_LIST[i]
        team_stats['team2'] = TEAMS_LIST[i+1]
        team_stats['score1'] = SCORES_LIST[i]
        team_stats['score2'] = SCORES_LIST[i+1]
        team_stats['spread1'] = SPREADS_LIST[i]
        team_stats['spread2'] = SPREADS_LIST[i+1]
        team_stats['date'] = DATE

        TEST_DATA.append(team_stats)
    
    with open('./sportsbook/src/test.json', 'w') as data:
        json.dump(TEST_DATA, data)
    
if __name__ == "__main__":
    scraping()
