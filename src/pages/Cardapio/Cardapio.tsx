import './Cardapio.css';

import TopFixedBar from "../../components/TopFixedBar/TopFixedBar";
import InfoBar from '../../components/InfoBar/InfoBar';
import { useEffect, useState } from 'react';
import Pratos from '../../components/Pratos/Pratos';
import LoginScreen from '../../components/modal-login/LoginScreen'
import { Oval } from 'react-loader-spinner'
import { redirect } from 'react-router-dom';
import { ConsultaPratosResponseData } from '../../dtos/Pratos';
import ModalAddPrato from '../../components/ModalAddPrato/Addprato';
import { useAuth } from '../../contexts/AuthContexts';
import { useEdicaoMode } from '../../contexts/EdicaoContexts';





export default function Cardapio() {
  const { token } = useAuth()
  const { setMode, emEdicao } = useEdicaoMode()

  const [loading, setLoading] = useState(false)
  const [pratos, setPratos] = useState<ConsultaPratosResponseData[]>([]);

  const [searchText, setSearchText] = useState('');
  const [filteredPratos, setFilteredPratos] = useState<ConsultaPratosResponseData[]>(pratos);

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

  useEffect(() => {
    const pratosFiltrados = pratos.filter((prato) => {
      if (prato.nome) {

        // Filtrar pratos com base no nome e/ou descrição
        return (
          prato.nome.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    });

    setFilteredPratos(pratosFiltrados);
  }, [searchText, pratos]);

  return (
    <>
      {visibleModalAddprato && (
        <ModalAddPrato closeFunction={() => setVisibleModalAddPrato(!visibleModalAddprato)} />
      )}

      <TopFixedBar showLoginFunction={() => setVisibleModalLogin(!visibleModalLogin)} />

      <div className='father-Cardapio'>
        <div className='cardapio-father'>
          <div className='buttons'>
            {token && (
              <>
                <div onClick={() => setMode()} className='edit-button' >
                  <img className='edit-icon' src={require('../../Assets/Edit-Button.svg').default} />
                  Editar
                </div>


                <div onClick={() => setVisibleModalAddPrato(!visibleModalAddprato)} className='add-button'>
                  <img className='add-icon' src={require('../../Assets/Add-Button.svg').default} />
                  Adicionar
                </div>
              </>
            )}
            <div className='Search-bar'>
              pesquisa prato
              <input
                onChange={(event) => setSearchText(event.target.value)}
                className='pesquisa-prato' type="text"
              />
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
                  {filteredPratos?.map((item) => {
                    return (
                      <Pratos
                        id={item.id as number}
                        foto={item.photo}
                        nome={item.nome}
                        descricao={item.descricao}
                        valor={item.preco}
                      />
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