import { SET_BREEDS } from '../reducers/allBreeds';
import { GET_THREE_IMAGES } from '../reducers/threeImages';
import { SET_CORRECT_BREED } from '../reducers/correctBreed';
import { GET_ANSWERS } from '../reducers/answers';
import { SET_GAME_VARIATION } from '../reducers/gameVariation';
import { ADD_TO_SCORE } from '../reducers/score/currentScore';
import { ADD_TO_QUESTIONS_ASKED } from '../reducers/score/numberOfQuestionsAsked';
import { ADD_TO_STREAK, RESET_STREAK } from '../reducers/currentStreak';
import { ADD_SHOWN_BREED } from '../reducers/shownBreeds';
import { ADD_TEN_COINS } from '../reducers/balance';

import request from 'superagent';

export const getAllBreeds = () => {
  return function(dispatch) {
    request.get('https://dog.ceo/api/breeds/list/all').then(res => {
      dispatch(setAllBreeds(res.body.message));
    });
  };
};

export const setAllBreeds = breeds => ({
  type: SET_BREEDS,
  payload: breeds
});

export const setCorrectBreedGameUno = breedUrl => ({
  type: SET_CORRECT_BREED,
  payload: breedUrl
});

export const getThreeRandomImages = threeImages => ({
  type: GET_THREE_IMAGES,
  payload: threeImages
});

export const getAnswers = (correctBreed, allBreeds) => ({
  type: GET_ANSWERS,
  payload: {
    correctBreed,
    allBreeds
  }
});

export const setGameVariation = bool => ({
  type: SET_GAME_VARIATION,
  payload: bool
});

export const addToScore = () => ({
  type: ADD_TO_SCORE
});

export const addToNumberOfQuestionsAsked = () => ({
  type: ADD_TO_QUESTIONS_ASKED
});

export const addToWinStreak = () => ({
  type: ADD_TO_STREAK
});

export const resetWinStreak = () => ({
  type: RESET_STREAK
});

export const addShownBreeds = breed => ({
  type: ADD_SHOWN_BREED,
  payload: breed
});

export const addTenCoins = () => ({
  type: ADD_TEN_COINS
});
