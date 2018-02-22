# TriviaGame

This Trivia Game is linked to the trivia API site: https://opentdb.com/api_config.php. This allows this game to pull from a very large pool of questions to provide more options.

The game starts by allowing the user to select a category out of 7 options or choose random which can cycle through any category. It also allows the user to select a difficulty level based on easy, medium, or hard. They can also choose random here which will vary the difficulty of each question randomly generated. 

Based on the user's input during each question, either the correct or incorrect response will be displayed. Both will comfirm whether they got it right or not and display a funny gif to go along with that response. If incorrect, it will state what the correct answer was.

There is a known issue that questions which correct answers that include a special character such as "'" (apostrophe) will also show as the user got the question incorrect even if they really selected the correct answer. The comparison happening in the background uses the original source data but the stored answer shows the apostrophe (or other special character) as normal while the answer from the API has the code that represents the special character. This causes the if function to state false when comparing what should be the same answers.

Included simple logic that stores each question into an array and checks if the new question has already been added, or displayed. If it has already been used, it just repulls a new question. There is a slight potential issue as it is possible the user can define the category and difficulty to cause the available questions to become low. I originally wanted to keep the list going as they restart using the "start over" button but this can potentially cause it to get stuck in a loop where no available question is left to use. There is no logic to stop that and require the user to pick a new category or take another action.


Extra things I would like to add:
  1. Fix the special character issue.
  2. Improve the logic for not duplicating questions. This currently resets each game, including when "start over" button is             pressed and the page is not reloaded.
