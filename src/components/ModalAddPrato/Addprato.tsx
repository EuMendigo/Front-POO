import './Addprato.css'

import { useState } from 'react'

import { ConsultaPratosResponseData } from '../../dtos/Pratos'
import { useAuth } from '../../contexts/AuthContexts'


type pratoProps = {
    id?: number | null
    closeFunction?: () => void
}

export default function ModalAddPrato({ id, closeFunction }: pratoProps) {
    const { token } = useAuth()

    const [nomePrato, setNomePrato] = useState("")
    const [ImagePrato, setImagePrato] = useState("")
    const [descricaoPrato, setDescricaoPrato] = useState("")
    const [valorPrato, setValorPrato] = useState("")

    async function enviarPratoParaAPI(pratodata: ConsultaPratosResponseData) {
        try {
            const response = await fetch('https://restaurante-poo-api.up.railway.app/restaurante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(pratodata), // Converte os dados do prato para JSON
            });

            if (!response.ok) {
                throw new Error('Erro de servidor: ' + response.status);
            }

            const data = await response.json();
            console.log('Prato adicionado com sucesso:', data);
            return data;
        } catch (error) {
            console.error('Erro ao adicionar o prato:', error);
            throw error;
        }
    }

    // A função para lidar com o envio das informações do prato deve estar aqui, não duplicada
    const adicionarPrato = async () => {
        const pratoData: ConsultaPratosResponseData = {
            id: id,
            photo: ImagePrato || 'https://i.imgur.com/1CYCMAu.png', // URL da imagem
            nome: nomePrato, // Nome do prato
            descricao: descricaoPrato, // Descrição do prato
            preco: Number(valorPrato), // Valor do prato (convertido para número)
        };

        try {
            const resultado = await enviarPratoParaAPI(pratoData);
            window.location.reload()
        } catch (error) {
            // Lidar com erros, se houver
        }
    };


    return (
        <>
            <div className='medal-add-option'>
                <div className='add-input-box'>
                    <img onClick={closeFunction} className='Close-Button' src={require('../../Assets/Close-Button.svg').default} />

                    <div className='set-infos1'>
                        <input className='set-photo'
                            type='text'
                            value={ImagePrato}
                            onChange={(event) => setImagePrato(event.target.value)}
                            placeholder='URL DA IMAGEM'
                        />
                        <input
                            className='set-tittle'
                            type='string'
                            placeholder='NOME DO PRATO'

                            value={nomePrato}
                            onChange={(event) => setNomePrato(event.target.value)}
                        />
                        <textarea
                            className='set-description'
                            placeholder='DESCRIÇÃO'
                            value={descricaoPrato}
                            onChange={(event) => setDescricaoPrato(event.target.value)}
                        />

                    </div>

                    <div className='set-infos2'>
                        <img className='preview-photo' src={ImagePrato} />
                        <input
                            className='set-value'
                            type="number"
                            placeholder='VALOR DO PRATO'
                            value={valorPrato}
                            onChange={(event) => setValorPrato(event.target.value)} />
                    </div>
                    <div onClick={adicionarPrato} className='send-info'>enviar
                    </div>
                </div>
            </div>
        </>
    )
}