import json

def load_context():

  files = [
    "data/organization.json",
    "data/rules.json",
    "data/events.json",
    "data/news.json"
  ]

  context = ""

  for file in files:
    with open(file, "r", encoding="utf-8") as f:
      data = json.load(f)

    context += f"\n{json.dumps(data, ensure_ascii=False, indent=2)}"

  return context