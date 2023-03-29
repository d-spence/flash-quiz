# Flash Quiz

A digital flash card quiz program written in Python. It loads the questions from a csv-like file and will display a random row in the form of a question. It keeps displaying new questions until the user exits.

![Flash Quiz running in the terminal](example.png)

## Usage

Simply run the script using Python. Press the **ENTER** key to display the answer and press **ENTER** again to show the next question. To exit press **CTRL+C**. These controls will also be displayed on the first question.

`python flash-quiz.py`

## Requirements

- Python 3
- tabulate

`pip install tabulate`

## FAQ

| Question | Answer |
| -------- | ------ |
| The script isn't working correctly. | Make sure you have a file named 'quiz-questions.txt' in the same directory as 'flash-quiz.py'. |
| I get an error when I try to run the script. | Do you have Python 3 on your system path? Do you have the tabulate package installed? Verify that both are installed correctly. Also note that the os.system('cls') command used in the script might not work for all terminals. Try running it in PowerShell. |
| I have another issue. | Feel free to send me a message if you can't get it working! |

## Acknowledgements

Questions in the included 'quiz-questions.txt' file are from the Google IT Support course glossary with some minor modifications of my own.

## License

MIT License (See LICENSE file for details)
