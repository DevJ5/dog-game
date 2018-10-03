import './userFeedback';
import userFeedback from './userFeedback';

export default (
  targetValue,
  correctBreed,
  nextQuestion,
  incrementScore,
  incrementQuestionsAsked,
  incrementWinStreak,
  resetWinStreak
) => {
  const userFeedBack = new userFeedback(
    document.getElementById('button-' + correctBreed),
    document.getElementById('button-' + targetValue)
  );

  incrementQuestionsAsked();

  if (targetValue === correctBreed) {
    // Show something green
    incrementScore(); // dispatch the ADD_TO_SCORE
    incrementWinStreak();

    userFeedBack.rightAnswerStyles();

    setTimeout(() => {
      userFeedBack.defaultStyles();

      nextQuestion();
    }, 500);
  } else {
    // Show something red and wait 2 seconds before showing
    resetWinStreak();
    userFeedBack.wrongAnswersStyles();

    setTimeout(() => {
      userFeedBack.defaultStyles();

      nextQuestion();
    }, 2000);
  }
};
