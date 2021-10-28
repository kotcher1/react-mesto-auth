import logo from '../images/logo.svg';

function Header( {page} ) {

  let buttonTitle;
  
  if (page === 'log_in') {
    buttonTitle = 'Регистрация'
  } else if (page === 'sign_up') {
    buttonTitle = 'Вход'
  } else if (page === 'main') {
    buttonTitle = 'Выйти'
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__line">
        {page === 'main' && (
          <p className="header__user-email">
            email@mail.com
          </p>
        )}
        <button className={`header__button ${page === 'main' && 'header__button_title_logout'}`} type="button">
          {buttonTitle}
        </button>
      </div> 
    </header>
  )
}

export default Header