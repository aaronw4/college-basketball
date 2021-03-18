import sys
import json
import requests
from bs4 import BeautifulSoup

def scraping():
    teams = {}
    
    ADDRESS1 = 'https://www.teamrankings.com/ncaa-basketball/stat/points-per-game'
    ADDRESS2 = 'https://www.teamrankings.com/ncaa-basketball/stat/opponent-points-per-game'
    ADDRESS3 = 'https://www.teamrankings.com/ncaa-basketball/stat/possessions-per-game'
    DATE = '?date=2021-02-26'

    html_data_ppg = requests.get(ADDRESS1 + DATE)
    soup_ppg = BeautifulSoup(html_data_ppg.text, 'lxml')
    table_ppg = soup_ppg.find('tbody')
    teams_ppg = table_ppg.find_all('tr')
    for team in teams_ppg:
        stats = team.findAll('td')
        name = stats[1].find('a').text
        off_points = stats[2].text
        if off_points == '--':
            continue
        teams[name] = []
        teams[name].append(off_points)

    html_data_oppg = requests.get(ADDRESS2 + DATE)
    soup_oppg = BeautifulSoup(html_data_oppg.text, 'lxml')
    table_oppg = soup_oppg.find('tbody')
    teams_oppg = table_oppg.find_all('tr')
    for team in teams_oppg:
        stats = team.findAll('td')
        name = stats[1].find('a').text
        opp_points = stats[2].text
        if opp_points == '--':
            continue
        teams[name].append(opp_points)

    html_data_pos = requests.get(ADDRESS3 + DATE)
    soup_pos = BeautifulSoup(html_data_pos.text, 'lxml')
    table_pos = soup_pos.find('tbody')
    teams_pos = table_pos.find_all('tr')
    for team in teams_pos:
        stats = team.findAll('td')
        name = stats[1].find('a').text
        possessions = stats[2].text
        if possessions == '--':
            continue
        teams[name].append(possessions)

    STATS = []
    team_names = teams.keys()
    for name in team_names:
        team_stats = {}
        team_stats['name'] = name
        team_stats['AdjO'] = float(teams[name][0])/float(teams[name][2])*100
        team_stats['AdjD'] = float(teams[name][1])/float(teams[name][2])*100
        team_stats['AdjT'] = teams[name][2]
        STATS.append(team_stats)

    with open('./sportsbook/src/pastStats.json', 'w') as data:
        json.dump(STATS, data)

if __name__ == "__main__":
    scraping()
