import './login-screen.css'

type Props = {
    closeFunction?: () => void
}

export default function loginscreen({ closeFunction }: Props) {
    return (
        <div className='modal-login'>
            <div className='login-screen'>
                <img onClick={closeFunction} className='Close-Button' src={require('../../Assets/Close-Button.svg').default} />
                <img className='logo-icon' src={require('../../Assets/logo.png')} />
                <div className='put-infos'>
                    <div className='set-email'>
                        nome de usuario ou email
                        <input className='email-input' type='string' placeholder='USERNAME' />
                    </div>
                    <div className='set-password'>
                        senha
                        <input className='password-input' type='password' placeholder='PASSWORD' />
                    </div>
                </div>
                <div className='confirm-button'>
                    Entrar
                </div>
            </div>
        </div>
    )


}
