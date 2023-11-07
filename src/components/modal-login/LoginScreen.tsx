import './login-screen.css'
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContexts';

type Props = {
    closeFunction?: () => void
}


export default function LoginScreen({ closeFunction }: Props) {
    const { signIn, loading } = useAuth()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        signIn({ usuario: username, password }).finally(() => {
            if (closeFunction) {
                closeFunction()
            }
        })
    };

    return (
        <div className='modal-login'>
            <div className='login-screen'>
                <img className='background-login-photo' src={require('../../Assets/Italy.jpg')} />
                <img onClick={closeFunction} className='Close-Button' src={require('../../Assets/Close-Button.svg').default} />
                <img className='logo-icon' src={require('../../Assets/logo.png')} />
                <div className='put-infos'>
                    <div className='set-email'>
                        nome de usuario ou email
                        <input
                            className='email-input'
                            type='string'
                            placeholder='USERNAME'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='set-password'>
                        senha
                        <input className='password-input'
                            type='password'
                            placeholder='PASSWORD'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div onClick={handleLogin} className='confirm-button'>
                    {loading ? <><h1>Carregando</h1></> : "Entrar"}


                </div>
            </div>
        </div>
    )


}
