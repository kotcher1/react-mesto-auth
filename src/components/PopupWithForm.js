import React from 'react'

class PopupWithForm extends React.Component {

  constructor(props) {
    super(props);
    this.title = props.title;
    this.name = props.name;
    this.buttonTitle = props.buttonTitle;
    this.onClose = props.onClose;
  }

  render() {
    return (
      <section className={`popup popup_type_${this.name} ${this.props.isOpen === true ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">
            {this.title}
          </h2>
          <form onSubmit={this.props.onSubmit} className="popup__form" name={`${this.name}`}>
            {this.props.children}
            <button type="submit" className="popup__submit">
              {this.buttonTitle}
            </button>
          </form>
          <button className="popup__close-button" type="button" onClick={this.onClose}>
          </button>
        </div>
      </section>
    )
  }
}

export default PopupWithForm