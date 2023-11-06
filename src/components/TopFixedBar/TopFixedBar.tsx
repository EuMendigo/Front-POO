import './TopFixedBar.css'

type Props = {
    showLoginFunction?: () => void
}

export default function TopFixedBar({ showLoginFunction }: Props) {



    const redirectToPage = (link: string) => {
        window.location.href = link
    }

    return (
        <div className="topFixedBar">
            <img className="logo" alt="Logo" src={require("../../Assets/logo.png")}></img>
            <ul className="optionsTopBar">
                <li onClick={() => redirectToPage('/')} >QUEM SOMOS</li>
                <li onClick={() => redirectToPage('/cardapio')} >CARDAPIO</li>
                <li onClick={() => redirectToPage('/localizacao')}>LOCALIZAÇÃO</li>
                <li onClick={() => redirectToPage('/avaliacoes')}>AVALIAÇÕES</li>
            </ul>
            <div onClick={showLoginFunction} className="login-button" >
                <img className="login-logo" src={require("../../Assets/login-icon.svg").default}></img>
                LOGIN
            </div>
        </div>
    )
}