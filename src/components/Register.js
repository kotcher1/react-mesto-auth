import React from 'react'
import PopupWithForm from './PopupWithForm'
import InfoTooltip  from './InfoTooltip';
import { register } from '../utils/auth.js';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.onClose = props.onClose;
    this.state = {
      email: '',
      password: '',
      status: ''
    }
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    register(this.state.password, this.state.email).then((res) => {
      if(res){
        this.setState({
          status: 'success'
        })
      } else {
        this.setState({
          status: 'fail'
        })
      }
      this.props.onRegister();
    })
 }


  render() {
    return (
      <div>
        <section className="register">
          <PopupWithForm onSubmit={this.handleSubmit} isOpen={true} name="login" title="Регистрация" buttonTitle="Зарегистрироваться" version="black">
            <input className="popup__input popup__input_white" type="email" placeholder="Email" id="email" name="email" required minLength="2" maxLength="40" onChange={this.handleChange} />
            <span className="popup__input-error">
            </span>
            <input className="popup__input popup__input_white" type="password" placeholder="Пароль" id="password" name="password" required minLength="2" maxLength="200" onChange={this.handleChange} />
            <span className="popup__input-error">
            </span>
          </PopupWithForm>
          <div className="register__question">
            <p className="register__question-text">
              Уже зарегистрированы?
            </p>
            <a className="register__link" href="/sign-in">
              Войти
            </a>
          </div>
          <InfoTooltip status={this.state.status} isOpen={this.props.isOpen} onClose={this.onClose}/>
        </section>
      </div>
    )
  }
}

export default Register