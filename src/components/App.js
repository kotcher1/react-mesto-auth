import Header from './Header'
import Main from './Main'
// import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import React from 'react'
import {api} from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext' 
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'

class App extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      currentUser: {},
      cards: [],
      loggedIn: false,
    }
  }

  getCard() {
    api.getInitialCards()
    .then((apiCards) => {
      this.setState({cards: apiCards})
    }).catch((err) => {
      console.log(err);
    })
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    const apiMethod = isLiked ? "DELETE" : "PUT";
    api.likeCard(card._id, apiMethod)
    .then((newCard) => {
      this.setState((state) => ({
        cards: state.cards.map((c) => (c._id === card._id ? newCard : c)),
      }));
    }).catch((err) => {
      console.log(err);
    })
  } 

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      this.setState((state) => ({
        cards: state.cards.filter((c) => c._id !== card._id)}));
    }).catch((err) => {
      console.log(err);
    })
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  }

  closeAllPopups = () => {
    this.setState({ isAddPlacePopupOpen: false, isEditProfilePopupOpen: false, isEditAvatarPopupOpen: false, selectedCard: {}});
  }

  handleCardClick = (card) => {
    this.setState({ selectedCard: card });
  }

  handleUpdateUser = ({name, about}) => {
    api.setUserInfo(name, about)
      .then((user) => {
        this.setState({currentUser: user});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  handleUpdateAvatar = ({avatar}) => {
    api.changeAvatar(avatar)
      .then((user) => {
        this.setState({currentUser: user});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  handleAddPlaceSubmit = ({cardName, cardLink}) => {
    api.addCard(cardName, cardLink)
      .then((newCard) => {
        this.setState({cards: [newCard, ...this.state.cards]});
        this.closeAllPopups();
      }).catch((err) => {
        console.log(err);
      })
  }

  getUserInfo() {
    api.getUserInfo()
      .then((user) => {
        this.setState({currentUser: user});
      }).catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.getUserInfo();
    this.getCard();
  }

  render() {
    return (
      <BrowserRouter>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <div className="page">
            <main>
              <Switch>
                <ProtectedRoute component={Main} loggedIn={this.state.loggedIn} exact path="/"
                  onEditProfile={this.handleEditProfileClick} 
                  onAddPlace={this.handleAddPlaceClick} 
                  onEditAvatar={this.handleEditAvatarClick}
                  isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
                  isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
                  isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
                  selectedCard={this.state.selectedCard}
                  closeAllPopups={this.closeAllPopups}
                  onOpenPopup={this.handleCardClick}
                  onUpdateUser={this.handleUpdateUser}
                  onUpdateAvatar={this.handleUpdateAvatar}
                  cards={this.state.cards}
                  onCardLike={this.handleCardLike}
                  onCardDelete={this.handleCardDelete}
                  onAddCard={this.handleAddPlaceSubmit}
                  >
                </ProtectedRoute>
                <Route path="/sign-up">
                  <Header page="sign_up"/>
                  <Register />
                </Route>
      	        <Route path="/sign-in">
                  <Header page="log_in"/>
                  <Login />
                </Route>
              </Switch>
            </main>
          </div>
        </CurrentUserContext.Provider>
      </BrowserRouter>
    );
  }

}

export default App;
