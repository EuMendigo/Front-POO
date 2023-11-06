import './Cardapio.css';

import TopFixedBar from "../../components/TopFixedBar/TopFixedBar";
import InfoBar from '../../components/InfoBar/InfoBar';
import { useEffect, useState } from 'react';
import Pratos from '../../components/Pratos/Pratos';
import LoginScreen from '../../components/modal-login/LoginScreen'
import { Oval } from 'react-loader-spinner'
import axios, { AxiosError } from 'axios';
import { type } from 'os';



type ConsultaPratosResponseData = {
  id: number
  foto: string
  nome: string
  descricao: string
  preco: string
}

// const exemploConsultaPratoResposta = [
//   {
//     id: 1,
//     foto: 'https://i.imgur.com/1nVdCyW.png',
//     nome: "Pizza Portuguesa",
//     descricao: 'Pizza de portuguesa, possui queijo, presunto, calabresa, ovo, milho, ervilha e oregano',
//     preco: '45.99'
//   },
//   {
//     id: 1,
//     foto: 'https://i.imgur.com/1nVdCyW.png',
//     nome: "Pizza Portuguesa",
//     descricao: 'Pizza de portuguesa, possui queijo, presunto, calabresa, ovo, milho, ervilha e oregano',
//     preco: '45.99'
//   },
//   {
//     id: 1,
//     foto: 'https://i.imgur.com/1nVdCyW.png',
//     nome: "Pizza Portuguesa",
//     descricao: 'Pizza de portuguesa, possui queijo, presunto, calabresa, ovo, milho, ervilha e oregano',
//     preco: '45.99'
//   }
// ]



// async function adicionaPrato(prato: ConsultaPratosResponseData) {
//   setTimeout(() => exemploConsultaPratoResposta.push(prato), 2000)
// }

export default function Cardapio() {
  const [loading, setLoading] = useState(false)
  const [pratos, setPratos] = useState<ConsultaPratosResponseData[]>()

  const [nomePrato, setNomePrato] = useState("")
  const [ImagePrato, setImagePrato] = useState("")

  const [visibleModalLogin, setVisibleModalLogin] = useState(false)
  const [visibleModalAddprato, setVisibleModalAddPrato] = useState(false)
  const [visiblefunctionbuttons, setVisiblefunctionbuttons] = useState(false)

  async function fetchData() {
    try {
      const response = await fetch('https://restaurante-poo-api.up.railway.app/restaurante');
      if (!response.ok) {
        throw new Error('Erro de servidor: ' + response.status);
      }
      const data = await response.json();
      console.log(data);
      setPratos(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://restaurante-poo-api.up.railway.app/restaurante');
        if (response.ok) {
          const data = await response.json();
          setPratos(data);
        } else {
          console.error('Erro ao buscar pratos');
        }
      } catch (error) {
        console.error('Erro ao buscar pratos', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);




  // const CriarDivPrato = async () => {
  //   setLoading(true)
  //   try {
  //     await adicionaPrato({
  //       id: 1,
  //       foto: 'https://i.imgur.com/1nVdCyW.png',
  //       nome: "Pizza Portuguesa",
  //       descricao: 'Pizza de portuguesa, possui queijo, presunto, calabresa, ovo, milho, ervilha e oregano',
  //       preco: '45,99'
  //     })

  // setPratos(exemploConsultaPratoResposta)
  // await fetch("/adicionapratos", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     foto: 'https://i.imgur.com/1nVdCyW.png',
  //     nome: "Pizza Portuguesa",
  //     descricao: 'Pizza de portuguesa, possui queijo, presunto, calabresa, ovo, milho, ervilha e oregano',
  //     preco: 45.99
  //   })
  // })
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(
    () => {
      async function loadingData() {
        setLoading(true)
        try {
          const result = await fetchData
        } finally {
          setLoading(false)
        }
      }

      loadingData()
    },
    []
  )

  return (
    <>
      {visibleModalAddprato && (
        <div className='medal-add-option'>
          <div className='add-input-box'>
            <img onClick={() => setVisibleModalAddPrato(!visibleModalAddprato)} className='Close-Button' src={require('../../Assets/Close-Button.svg').default} />

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
              <textarea className='set-description' placeholder='DESCRIÇÃO' />
            </div>

            <div className='set-infos2'>
              <img className='preview-photo' src={ImagePrato} />
              <input className='set-value' type="number" placeholder='VALOR DO PRATO' />
            </div>
            <div className='send-info'>enviar
            </div>
          </div>
        </div>
      )}
      S
      <TopFixedBar showLoginFunction={() => setVisibleModalLogin(!visibleModalLogin)} />

      <div className='father-Cardapio'>
        <div className='cardapio-father'>
          <div className='buttons'>

            <div className='edit-button' >
              <img onClick={() => setVisiblefunctionbuttons(!visiblefunctionbuttons)} className='edit-icon' src={require('../../Assets/Edit-Button.svg').default} />
              Editar
            </div>
            <div className='add-button'>
              <img className='add-icon' src={require('../../Assets/Add-Button.svg').default} />
              Adicionar
            </div>
            <div className='Search-bar'>
              pesquisa prato
              <input className='pesquisa-prato' type="text" />
            </div>
          </div>

          {
            loading
              ? (
                <div className='loading-screen'>
                  <Oval
                    height={80}
                    width={80}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2} />
                </div>
              ) : (
                <div className='cardapio-showroom'>
                  {pratos?.map((item) => {
                    return (
                      <Pratos foto={item.foto} nome={item.nome} descricao={item.descricao} valor={item.preco} />

                    )
                  }
                  )}
                </div>

              )
          }

        </div>
      </div>
      <InfoBar />
      {visibleModalLogin && <LoginScreen closeFunction={() => setVisibleModalLogin(!visibleModalLogin)} />}

    </>
  );
}