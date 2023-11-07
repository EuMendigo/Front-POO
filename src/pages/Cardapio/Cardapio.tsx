import './Cardapio.css';

import TopFixedBar from "../../components/TopFixedBar/TopFixedBar";
import InfoBar from '../../components/InfoBar/InfoBar';
import { useEffect, useState } from 'react';
import Pratos from '../../components/Pratos/Pratos';
import LoginScreen from '../../components/modal-login/LoginScreen'
import { Oval } from 'react-loader-spinner'
import { redirect } from 'react-router-dom';


type ConsultaPratosResponseData = {
  id?: number | null
  photo: string
  nome: string
  descricao: string
  preco: number
}



export default function Cardapio() {
  const [loading, setLoading] = useState(false)
  const [pratos, setPratos] = useState<ConsultaPratosResponseData[]>([]);

  const [nomePrato, setNomePrato] = useState("")
  const [ImagePrato, setImagePrato] = useState("")
  const [descricaoPrato, setDescricaoPrato] = useState("")
  const [valorPrato, setValorPrato] = useState("")

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
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  const redirectToPage = (link: string) => {
    window.location.href = link
  }




  async function enviarPratoParaAPI(pratodata: ConsultaPratosResponseData) {
    try {
      const response = await fetch('https://restaurante-poo-api.up.railway.app/restaurante', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      photo: ImagePrato, // URL da imagem
      nome: nomePrato, // Nome do prato
      descricao: descricaoPrato, // Descrição do prato
      preco: Number(valorPrato), // Valor do prato (convertido para número)
    };

    try {
      const resultado = await enviarPratoParaAPI(pratoData);
      redirectToPage('/cardapio')
    } catch (error) {
      // Lidar com erros, se houver
    }
  };

  useEffect(() => {
    async function loadingData() {
      setLoading(true);
      try {
        const data = await fetchData();
        setPratos(data);
      } finally {
        setLoading(false);
      }
    }

    loadingData();
  }, []);

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
            <div onClick={() => setVisibleModalAddPrato(!visibleModalAddprato)} className='add-button'>
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
                      <Pratos foto={item.photo} nome={item.nome} descricao={item.descricao} valor={item.preco} />

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