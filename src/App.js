import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import request from 'superagent';

import {
  addToNumberOfQuestionsAsked,
  addToScore,
  addToWinStreak,
  getAnswers,
  getAnswersFromImages,
  resetWinStreak,
  setAllBreeds,
  setCorrectBreedGameUno,
  setCorrectBreedGameDos,
  addShownBreeds,
  addTenCoins,
  getAllBreeds,
  getThreeRandomImages,
  setGameVariation,
  keyHandling,
  addThreeUniques,
  addImagesToTempSelectedBreeds
} from './actions/AppActions';

import userFeedback from './functions/userFeedback';
import ImageContainer from './containers/ImageContainer';
import ThreeImagesContainer from './containers/ThreeImagesContainer';
import ButtonsContainer from './containers/ButtonsContainer';
import QuestionContainer from './containers/QuestionContainer';

import { Header } from './components/Header';
import { Neck } from './components/Neck';
//import { Movie } from './components/Movie';

let isButtonOnFocus = false;

class App extends PureComponent {
  componentDidMount() {
    document.getElementsByClassName('0').click;
    window.addEventListener('keyup', e => this.keyHandling(e));
    this.props.getAllBreeds();
    request
      .get('https://dog.ceo/api/breeds/list/all')
      .then(res => {
        this.props.setAllBreeds(res.body.message);
      })
      .then(() =>
        this.props.addThreeUniques(
          this.props.allBreeds,
          this.props.selectedBreeds
        )
      )
      .then(() => {
        this.props.addImagesToTempSelectedBreeds(this.props.tempSelectedBreeds);
      })
      .then(() => this.nextQuestion());
  }

  gameEins() {
    setTimeout(() => {
      const index = Math.floor(
        Math.random() * this.props.selectedBreeds.length
      );
      const correctBreed = this.props.selectedBreeds[index];
      const correctImage =
        correctBreed.images[
          Math.floor(Math.random() * correctBreed.images.length)
        ];

      this.props.setCorrectBreedGameUno(correctImage);

      this.props.getAnswers(
        correctBreed.name,
        this.props.selectedBreeds.map(breed => breed.name)
      );
    }, 1000);
  }

  getOneRandomImage() {
    request
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res => this.props.setCorrectBreedGameUno(res.body.message))
      .then(() => {
        this.props.getAnswers(
          this.props.correctBreedObj.name,
          this.props.allBreeds
        );
      });
  }

  getThreeRandomImages() {
    request
      .get('https://dog.ceo/api/breeds/image/random/3')
      .then(res => this.props.getThreeRandomImages(res.body.message))
      .then(() => {
        this.props.setCorrectBreedGameDos(this.props.threeImages);
        this.props.getAnswersFromImages(this.props.threeImages);
      });
  }

  nextQuestion() {
    const gameVariationBool = Math.floor(Math.random() * 2);

    /** DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV */
    // /** DEV DEV DEV DEV */ const gameVariationBool = true;
    /** DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV DEV */

    this.props.setGameVariation(gameVariationBool);
    gameVariationBool
      ? // ? this.getOneRandomImage()
        this.gameEins()
      : this.getThreeRandomImages();
  }

  // Actions
  incrementQuestionsAsked() {
    this.props.addToNumberOfQuestionsAsked();
  }

  incrementScore() {
    this.props.addToScore();
  }

  incrementWinStreak() {
    this.props.addToWinStreak();
  }

  resetWinStreak() {
    this.props.resetWinStreak();
  }

  addToShownBreeds(correctBreedName) {
    this.props.addShownBreeds(correctBreedName);
  }

  addTenCoins() {
    this.props.addTenCoins();
  }

  keyHandling(e) {
    if (!isButtonOnFocus) {
      //const focusThis = document.getElementsByClassName('0')[0];
      return (isButtonOnFocus = true);
    } else {
      const codeOfKey = e.keyCode;
      this.props.keyHandling(codeOfKey);
    }
  }

  WrongButton(userFeedBack) {
    this.resetWinStreak();
    userFeedBack.wrongAnswersStyles();

    setTimeout(() => {
      userFeedBack.defaultStyles();

      this.nextQuestion();
    }, 2000);
  }

  RightButton(userFeedBack) {
    this.incrementScore();
    this.incrementWinStreak();
    this.addTenCoins();

    userFeedBack.rightAnswerStyles();

    setTimeout(() => {
      userFeedBack.defaultStyles();

      if (this.props.currentStreak === 10) {
        this.props.addThreeUniques(
          this.props.allBreeds,
          this.props.selectedBreeds
        );
        this.props.addImagesToTempSelectedBreeds(this.props.tempSelectedBreeds);
      }

      this.nextQuestion();
    }, 750);
  }

  // Event Handlers
  handleButtonClick = e => {
    e.preventDefault();
    console.log(e);

    const correctBreed = this.props.correctBreedObj.name;
    const targetValue = e.target.value;
    const userFeedBack = new userFeedback(
      document.getElementById('button-' + correctBreed),
      document.getElementById('button-' + targetValue)
    );

    this.incrementQuestionsAsked();
    this.addToShownBreeds(correctBreed);

    if (targetValue === correctBreed) {
      this.RightButton(userFeedBack);
    } else {
      this.WrongButton(userFeedBack);
    }
  };
  rightAnswerImage(correctImage) {
    this.incrementScore();
    this.incrementWinStreak();
    this.addTenCoins();
    setTimeout(() => {
      this.nextQuestion();
      correctImage.className = 'three-images-hover';
    }, 750);
  }

  wrongAnswerImage(correctImage) {
    this.resetWinStreak();
    setTimeout(() => {
      this.nextQuestion();
      correctImage.className = 'three-images-hover';
    }, 2000);
  }

  handleImageClick = e => {
    const correctBreed = this.props.correctBreedObj.name;
    const correctImage = document.getElementById('img-' + correctBreed);
    correctImage.className = 'correct-img';

    this.incrementQuestionsAsked();
    this.addToShownBreeds(correctBreed);

    if (e.target.getAttribute('value') === correctBreed) {
      this.rightAnswerImage(correctImage);
    } else {
      this.wrongAnswerImage(correctImage);
    }
  };

  render() {
    return (
      <div className="Container">
        {/*<Movie />*/}
        <Header />
        {this.props.gameVariation ? (
          <ImageContainer />
        ) : (
          <ThreeImagesContainer onClick={this.handleImageClick} />
        )}
        <Neck />
        {this.props.gameVariation ? (
          <ButtonsContainer onClick={this.handleButtonClick} />
        ) : (
          <QuestionContainer />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  correctBreedObj,
  allBreeds,
  threeImages,
  gameVariation,
  tempSelectedBreeds,
  selectedBreeds,
  currentStreak
}) => ({
  correctBreedObj,
  allBreeds,
  threeImages,
  gameVariation,
  tempSelectedBreeds,
  selectedBreeds,
  currentStreak
});

const mapDispatchToProps = {
  addToNumberOfQuestionsAsked,
  addToScore,
  addToWinStreak,
  getAnswers,
  getAnswersFromImages,
  resetWinStreak,
  setAllBreeds,
  setCorrectBreedGameUno,
  setCorrectBreedGameDos,
  getAllBreeds,
  addShownBreeds,
  addTenCoins,
  keyHandling,
  getThreeRandomImages,
  setGameVariation,
  addThreeUniques,
  addImagesToTempSelectedBreeds
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
