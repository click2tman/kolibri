import sortBy from 'lodash/sortBy';
import shuffle from 'kolibri.lib.shuffle';
import logger from 'kolibri.lib.logging';

const logging = logger.getLogger(__filename);

/*
 * Choose a an evenly-distributed random selection of questions from exercises.
 * @param {number} numQuestions - target number of questions
 * @param {array} exerciseIds - exercise IDs
 * @param {array} exerciseTitle - exercise titles
 * @param {array} questionIdArrays - arrays of question IDs corresponding to the exercise IDs
 * @param {number} seed - value to seed the random shuffle with
 * @return {array} - objects of the form { exercise_id, question_id, title }
 */
export default function selectQuestions(
  numQuestions,
  exerciseIds,
  exerciseTitles,
  questionIdArrays,
  seed
) {
  if (exerciseIds.length !== questionIdArrays.length) {
    throw new Error('exerciseIds and questionIdArrays must have the same length');
  }
  if (exerciseIds.length !== exerciseTitles.length) {
    throw new Error('exerciseIds and exerciseTitles must have the same length');
  }
  if (
    questionIdArrays.reduce((acc, questionArray) => acc + questionArray.length, 0) < numQuestions
  ) {
    throw new Error('Not enough questions to reach numQuestions');
  }
  if (numQuestions < exerciseIds.length) {
    logging.warn(`Selecting ${numQuestions} questions from ${exerciseIds.length} exercises`);
  }

  // helps iterate over exercises pseudo-randomly, in case there are too many exercises
  const randomIndexes = shuffle(Array.from(Array(exerciseIds.length).keys()), seed);
  function get(array, i) {
    return array[randomIndexes[i]];
  }

  // copy and shuffle the question IDs
  const shuffledQuestionIdArrays = questionIdArrays.map(questionArray =>
    shuffle(questionArray.slice(0), seed)
  );

  // fill up the output list
  const output = [];
  let i = 0;
  while (output.length < numQuestions) {
    // check if we've used up all questions in one exercise
    if (get(shuffledQuestionIdArrays, i).length) {
      // if not, add it to the list
      output.push({
        exercise_id: get(exerciseIds, i),
        question_id: get(shuffledQuestionIdArrays, i).pop(),
        title: get(exerciseTitles, i),
      });
    }
    // cycle through questions
    i = (i + 1) % exerciseIds.length;
  }

  // sort the resulting questions by exercise title
  return sortBy(output, 'title');
}
