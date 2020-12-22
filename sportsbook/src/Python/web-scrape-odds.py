import sys
import json
import requests
from bs4 import BeautifulSoup

def scraping():
    ADDRESS = 'https://www.sportsbookreview.com'
    EXTENSION = '/betting-odds/ncaa-basketball'
    DATE = 'December 22'
    # EXTENSION = sys.argv[1]
    # DATE = sys.argv[2]
    ADDRESS_LIST = []
    ODDS = []
    REACHED = False
    COUNT = 0

    #builds a list of all game links
    html_data = requests.get(ADDRESS + EXTENSION)
    soup = BeautifulSoup(html_data.text, 'lxml')
    for links in soup.find_all('a', class_='gradientContainer-3iN6G'):
        ADDRESS_LIST.append(links['href'])

    #Loop through all links
    for i in range(0, len(ADDRESS_LIST), 2):
        USER_SETTINGS = 'user_settings=eyJkYXRhIjoie1wic2V0dGluZ3NcIjpbe1wiaWRcIjpcIjVhNGJhMjYzODI4MTg5NTNjMDkyZWZmMFwiLFwidmFsdWVcIjpcIlxcXCJ0aW1lXFxcIlwifSx7XCJpZFwiOlwiNWE0M2MxMWI4MjgxODk1M2MwOTJlZmU1XCIsXCJ2YWx1ZVwiOlwiXFxcIlVTL0Vhc3Rlcm5cXFwiXCJ9LHtcImlkXCI6XCI1YTQzYzBhZjgyODE4OTUzYzA5MmVmZTRcIixcInZhbHVlXCI6XCJcXFwiMjM4LTIwXFxcIlwifSx7XCJpZFwiOlwiNWE0M2JlOWQ4MjgxODk1M2MwOTJlZmUzXCIsXCJ2YWx1ZVwiOlwiXFxcInVzXFxcIlwifSx7XCJpZFwiOlwiNWE0M2JlNzA4MjgxODk1M2MwOTJlZmUyXCIsXCJ2YWx1ZVwiOlwiZmFsc2VcIn0se1wiaWRcIjpcIjVhNDNiZTQwODI4MTg5NTNjMDkyZWZlMVwiLFwidmFsdWVcIjpcInRydWVcIn0se1wiaWRcIjpcIjVhNDNiZGMxODI4MTg5NTNjMDkyZWZlMFwiLFwidmFsdWVcIjpcImZhbHNlXCJ9LHtcImlkXCI6XCI1YTQzYThjYTgyODE4OTUzYzA5MmVmZGFcIixcInZhbHVlXCI6XCJmYWxzZVwifSx7XCJpZFwiOlwiNWE0Mjg0OWM4MjgxODk1M2MwOTJlZmQ5XCIsXCJ2YWx1ZVwiOlwiXFxcInRydWVcXFwiXCJ9LHtcImlkXCI6XCI1YjBlYmNiMjVkMzQ0NjI4YTU0ZDRmZmFcIixcInZhbHVlXCI6XCJcXFwiY29tcGFjdFxcXCJcIn1dfSIsInR5cGUiOiJvYmplY3QifQ=='
        
        game_data = requests.get(
            ADDRESS + ADDRESS_LIST[i],
            headers={"cookie" : USER_SETTINGS}
        )

        soup2 = BeautifulSoup(game_data.text, 'lxml')

        game_odds = {}

        section = soup2.find('section', class_='container-2-2cB')
        date = section.find('label').text
        result = date.find(DATE)
        if result == -1:
            if REACHED:
                break
            else:
                continue
        else:
            REACHED = True
        game_odds['date'] = date

        game_period = soup2.find_all('div', class_='container-2fbfV')

        #full game numbers
        full_game = game_period[0]


        teams = full_game.find_all('span', class_='participantBox-3ar9Y')
        team1 = teams[0].text
        team2 = teams[1].text
        teams = {'away': team1, 'home': team2}
        game_odds['teams'] = teams

        lines = full_game.find_all('span', class_='opener')
        if len(lines) < 10:
            continue
        team1_spread = lines[0].text
        team1_spread = team1_spread.replace('\u00BD', '.5')
        team1_spread_odds = lines[1].text
        team2_spread = lines[2].text
        team2_spread = team2_spread.replace('\u00BD', '.5')
        team2_spread_odds = lines[3].text
        team1_moneyline = lines[4].text
        team2_moneyline = lines[5].text
        over_under = lines[6].text
        over_under = over_under.replace('\u00BD', '.5')
        over_odds = lines[7].text
        under_odds = lines[9].text

        full_game = {
            'spread': {
                'away_spread': team1_spread,
                'away_odds': team1_spread_odds,
                'home_spread': team2_spread,
                'home_odds': team2_spread_odds
            },
            'moneyline': {
                'away': team1_moneyline,
                'home': team2_moneyline
            },
            'over_under': {
                'total': over_under,
                'over': over_odds,
                'under': under_odds
            }
        }
        game_odds['full_game'] = full_game

        #first half numbers
        first_half = game_period[1]
        first_half_lines = first_half.find_all('span', class_='opener')
        
        if len(first_half_lines) == 10:
            first_half_team1_spread = first_half_lines[0].text
            first_half_team1_spread = first_half_team1_spread.replace('\u00BD', '.5')
            first_half_team1_spread_odds = first_half_lines[1].text
            first_half_team2_spread = first_half_lines[2].text
            first_half_team2_spread = first_half_team2_spread.replace('\u00BD', '.5')
            first_half_team2_spread_odds = first_half_lines[3].text
            first_half_team1_moneyline = first_half_lines[4].text
            first_half_team2_moneyline = first_half_lines[5].text
            first_half_over_under = first_half_lines[6].text
            first_half_over_under = first_half_over_under.replace('\u00BD', '.5')
            first_half_over_odds = first_half_lines[7].text
            first_half_under_odds = first_half_lines[9].text

            first_half = {
                'spread': {
                    'away_spread': first_half_team1_spread,
                    'away_odds': first_half_team1_spread_odds,
                    'home_spread': first_half_team2_spread,
                    'home_odds': first_half_team2_spread_odds
                },
                'moneyline': {
                    'away': first_half_team1_moneyline,
                    'home': first_half_team2_moneyline
                },
                'over_under': {
                    'total': first_half_over_under,
                    'over': first_half_over_odds,
                    'under': first_half_under_odds
                }
            }
        else:
            first_half = {
                'spread': {
                    'away_spread': None,
                    'away_odds': None,
                    'home_spread': None,
                    'home_odds': None
                },
                'moneyline': {
                    'away': None,
                    'home': None
                },
                'over_under': {
                    'total': None,
                    'over': None,
                    'under': None
                }
            }

        game_odds['first_half'] = first_half

        graph_address = ADDRESS + ADDRESS_LIST[i][:-5] + "line-history/"
        game_odds['graph_address'] = graph_address

        ODDS.append(game_odds)
        COUNT += 1

    with open('./sportsbook/src/odds.json', 'w') as data:
        json.dump(ODDS, data)

if __name__ == "__main__":
    scraping()