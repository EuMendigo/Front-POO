import './login-screen.css'
import React, { useState } from 'react';
import axios from 'axios';

type Props = {
    closeFunction?: () => void
}

export default function loginscreen({ closeFunction }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://restaurante-poo-api.up.railway.app/login', { username, password });
            console.log('Login Bem Sucedido')
        } catch (error) {
            console.log('login mal sucedido')
        }
    };
    return (
        <div className='modal-login'>
            <div className='login-screen'>
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
                    Entrar
                </div>
            </div>
        </div>
    )


}
