import requests
import time
import json
from bs4 import BeautifulSoup

def create_json(league, match):
    response = requests.get("https://www.learnedleague.com/match.php?{}&{}".format(league, match))
    soup = BeautifulSoup(response.text, 'html.parser')
    raw_questions = soup.find_all("div", {"class": "ind-Q20"})

    questions = []
    rundles = ["A", "B", "C", "D", "E", "R"]

    for idx, q in enumerate(raw_questions):
        q.span.decompose()
        img = None
        if q.a:
            img = q.a.get("href")
            q.a.decompose()
        q_parts = q.get_text().split('-', 1)
        cat = q_parts[0].lstrip('\n\t').rstrip()
        prompt = q_parts[1].lstrip().rstrip()
        ans = soup.find(id="Q{}1ANS".format(idx + 1)).get_text().lstrip('\n\t').rstrip().lower()
        q_dict = {}
        q_dict["category"] = cat
        q_dict["prompt"] = prompt
        q_dict["answer"] = ans
        q_dict["image"] = img
        for r in rundles:
            cell = soup.find_all("td", {"class": "level{}".format(r)})[idx + 2].get_text()
            q_dict[f"{r.lower()}_percent"] = cell
        questions.append(q_dict)

    json = {}
    matchday = soup.find_all("h1", {"class": "matchday"})[0].get_text().lstrip("\n\t").rstrip()
    date = matchday.split(":", 1)[0]
    json["date"] = date
    json["league"] = league
    json["day"] = match
    json["questions"] = questions
    return json

if __name__ == "__main__":
    for l in range(97, 99):
        for m in range(1, 26):
            data = create_json(l, m)
            with open(f'league{l}_day{m}.json', 'w') as f:
                json.dump(data, f, indent=4)
            print(f"finished league {l} match {m}")
            time.sleep(3)
