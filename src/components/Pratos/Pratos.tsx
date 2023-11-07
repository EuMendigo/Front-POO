import { StringDecoder } from 'string_decoder'
import './Pratos.css'
import { useEffect, useState } from 'react';

type PratosProps = {
    foto: string
    nome: String
    descricao: string
    valor: boolean
}

type Props = {
    showFunctionButtons?: () => void
}

export default function Pratos({ foto, nome, descricao, valor }: PratosProps) {




    return (
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
                <div className='function-buttons'>
                    <div className='prato-edit'>Editar</div>
                    <div className='prato-delete'>Excluir</div>
                </div>
            </div>
        </div>
    )
}


