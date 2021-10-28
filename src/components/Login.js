import React from 'react'
import PopupWithForm from './PopupWithForm'

class Login extends React.Component {

  render() {
    return (
      <div>
        <section className="login">
          <PopupWithForm isOpen={true} name="login" title="Вход" buttonTitle="Войти" version="black">
            <input className="popup__input popup__input_white" type="email" placeholder="Email" id="email" name="email" required minLength="2" maxLength="40" />
            <span className="popup__input-error">
            </span>
            <input className="popup__input popup__input_white" type="password" placeholder="Пароль" id="password" name="password" required minLength="2" maxLength="200" />
            <span className="popup__input-error">
            </span>
          </PopupWithForm>
        </section>
      </div>
    )
  }
}

export default Login