
import { useState } from 'react'
import './Pratos.css'
import ModalAddPrato from '../ModalAddPrato/Addprato'
import { useAuth } from '../../contexts/AuthContexts'
import { useEdicaoMode } from '../../contexts/EdicaoContexts'


type PratosProps = {
    id: number
    foto: string
    nome: String
    descricao: string
    valor: number
}

type Props = {
    showFunctionButtons?: () => void
}


export default function Pratos({ id, foto, nome, descricao, valor }: PratosProps) {
    const { token } = useAuth()
    const { emEdicao } = useEdicaoMode()

    const [visibleModalAddprato, setVisibleModalAddPrato] = useState(false)

    async function deletarPrato(id: number) {
        try {
            const response = await fetch(`https://restaurante-poo-api.up.railway.app/restaurante/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir o prato: ' + response.status);
            }

            console.log('Prato excluído com sucesso.');
        } catch (error) {
            console.error('Erro ao excluir o prato:', error);
        }
    }

    return (
        <>
            {visibleModalAddprato && (
                <ModalAddPrato id={id} closeFunction={() => setVisibleModalAddPrato(!visibleModalAddprato)} />
            )}
            <div className='pratos-father'>
                <div className='prato-photo-father'>
                    <div className='prato-photo'> <img className='prato-photo-img' src={foto}></img></div>
                </div>
                <div className='description-info'>
                    <div className='informations'>
                        <div className='prato-name'> {nome}</div>
                        <div className='prato-description'>{descricao}</div>
                        <div className='prato-value'>R${valor}</div>
                    </div>
                    {emEdicao && (
                        <div className='function-buttons'>

                            <>
                                <div
                                    onClick={() => setVisibleModalAddPrato(!visibleModalAddprato)}
                                    className='prato-edit'>
                                    Editar
                                </div>

                                <div
                                    onClick={() => { deletarPrato(id).finally(() => setTimeout(() => window.location.reload(), 500)) }}
                                    className='prato-delete'>
                                    Excluir
                                </div>
                            </>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


