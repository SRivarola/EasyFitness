import './styles.css'
import logo from '../../assets/logoBigg.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosLogIn } from "react-icons/io/"

export default function Header() {

    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('logged'))
    const color = 'e20079'

    const handleClick = () => {
        localStorage.removeItem('logged')
        navigate('/', {replace: true})
    }

  return (
    <nav className='header-root'>
        <ul className='header-ul'>
            <li className='header-logo'>
                <img src={logo} alt='logo de la empresa' />
            </li>
            {
                userData?.role === 'Personal' &&
                <li className='linksConttainer'>
                    <ul className='links'>
                        <li><Link to='/'>Buscar</Link></li>
                        <li><Link to='/register'>Registrar</Link></li>
                        <li onClick={handleClick}>
                            <IoIosLogIn className='icon' />
                        </li>
                    </ul>
                </li>
            }
        </ul>

    </nav>
  )
}