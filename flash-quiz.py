import csv
import random
import os
from tabulate import tabulate

questions = []
questions_file_path = 'quiz-glossary.txt'
prompt1 = 'Press ENTER to see answer... '
prompt2 = 'Press ENTER to continue or CTRL+C to exit... '
width = 64

with open(questions_file_path, newline='', encoding='utf-8') as csvfile:
  reader = csv.reader(csvfile, delimiter=':', skipinitialspace=True)

  # populate list of questions with csv rows [['term', 'definition'], [...]]
  for row in reader:
    questions.append(row)


def showQuestion():
  rand_idx = random.randrange(0, len(questions))
  question = questions[rand_idx]

  os.system('cls')
  print(tabulate(
    [[question[1] + '?']],
    headers=[f'QUESTION #{rand_idx}'],
    tablefmt='simple_grid',
    colalign=('center',),
    maxcolwidths=[width]))
  input(prompt1)
  print(tabulate(
    [[question[0]]],
    headers=['ANSWER'],
    tablefmt='simple_grid',
    colalign=('center',),
    maxcolwidths=[width]))
  input(prompt2)


showQuestion() # show question with starting helper prompts
prompt1 = prompt2 = '... '

while True:
  showQuestion()
