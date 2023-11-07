import { redirect } from 'react-router-dom'
import './TopFixedBar.css'
import { useAuth } from '../../contexts/AuthContexts'

type Props = {
    showLoginFunction?: () => void
}

export default function TopFixedBar({ showLoginFunction }: Props) {
    const { token, signOut } = useAuth()

    const handleSignOut = () => {
        if (!token && showLoginFunction) {
            showLoginFunction()
            return
        }

        signOut()
    }

    const redirectToPage = (link: string) => {
        window.location.href = link
    }

    return (
        <div className="topFixedBar">
            <img onClick={() => redirectToPage('/')} className="logo" alt="Logo" src={require("../../Assets/logo.png")}></img>
            <ul className="optionsTopBar">
                <li onClick={() => redirectToPage('/')} >QUEM SOMOS</li>
                <li onClick={() => redirectToPage('/cardapio')} >CARDAPIO</li>
                <li onClick={() => redirectToPage('/localizacao')}>LOCALIZAÇÃO</li>
                <li onClick={() => redirectToPage('/avaliacoes')}>AVALIAÇÕES</li>
            </ul>
            <div onClick={handleSignOut} className="login-button" >
                <img className="login-logo" src={require("../../Assets/login-icon.svg").default}></img>
                {token ? "LOGOUT" : "LOGIN"}
            </div>



        </div>
    )
}