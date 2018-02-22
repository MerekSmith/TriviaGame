# TriviaGame

This Trivia Game is linked to the trivia API site: https://opentdb.com/api_config.php. This allows this game to pull from a very large pool of questions to provide more options.

The game starts by allowing the user to select a category out of 7 options or choose random which can cycle through any category. It also allows the user to select a difficulty level based on easy, medium, or hard. They can also choose random here which will vary the difficulty of each question randomly generated. 

Based on the user's input during each question, either the correct or incorrect response will be displayed. Both will comfirm whether they got it right or not and display a funny gif to go along with that response. If incorrect, it will state what the correct answer was.

There is a known issue that questions which correct answers that include a special character such as "'" (apostrophe) will also show as the user got the question incorrect even if they really selected the correct answer. The comparison happening in the background uses the original source data but the stored answer shows the apostrophe (or other special character) as normal while the answer from the API has the code that represents the special character. This causes the if function to state false when comparing what should be the same answers.

This character issue also causes a potential issue of repeating questions. There is some if logic while pulling the question that compares the value of "question" but if a special character is involved, it acts similiar to the above situation. If working correctly, however, as long as the page is never refreshed, the user should never see the same question twice.


Extra things I would like to add:
  1. Fix the special character issue.
