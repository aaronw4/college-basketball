import sys
import json
import requests
from bs4 import BeautifulSoup

def scraping():
    ADDRESS = 'https://kenpom.com/index.php'
    html_data = requests.get(ADDRESS)
    soup = BeautifulSoup(html_data.text, 'lxml')
    STATS = []

    table = soup.find('tbody')
    teams = table.findAll('tr')

    for team in teams:
        team_stats = {}

        name_row = team.find('td', class_='next_left')
        if name_row is None:
            continue
        name = name_row.find('a').text
        team_stats['name'] = name

        adj_stats = team.findAll('td', class_='td-left')
        adjo = adj_stats[0].text
        adjd = adj_stats[1].text
        adjt = adj_stats[2].text
        sos = adj_stats[4].text
        team_stats['AdjO'] = adjo
        team_stats['AdjD'] = adjd
        team_stats['AdjT'] = adjt
        team_stats['SOS'] = sos

        STATS.append(team_stats)

    with open('./sportsbook/src/stats.json', 'w') as data:
        json.dump(STATS, data)

if __name__ == "__main__":
    scraping()
