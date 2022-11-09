import './NavBar.css';

export const NavBar = () => {
  return (
    <div className='navbar navbar-dark bg-violet mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            Johanna
        </span>

        <button className='btn btn-outline-light'>
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Salir</span>
        </button>

    </div>
  )
};