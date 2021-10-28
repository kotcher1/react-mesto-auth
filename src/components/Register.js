import React from 'react'
import PopupWithForm from './PopupWithForm'

class Register extends React.Component {

  render() {
    return (
      <div>
        <section className="register">
          <PopupWithForm isOpen={true} name="login" title="Регистрация" buttonTitle="Зарегистрироваться" version="black">
            <input className="popup__input popup__input_white" type="email" placeholder="Email" id="email" name="email" required minLength="2" maxLength="40" />
            <span className="popup__input-error">
            </span>
            <input className="popup__input popup__input_white" type="password" placeholder="Пароль" id="password" name="password" required minLength="2" maxLength="200" />
            <span className="popup__input-error">
            </span>
          </PopupWithForm>
          <div className="register__question">
            <p className="register__question-text">
              Уже зарегистрированы?
            </p>
            <a className="register__link">
              Войти
            </a>
          </div>
        </section>
      </div>
    )
  }
}

export default Register