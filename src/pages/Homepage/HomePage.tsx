import React, { useState } from "react";
import "./HomePage.css";
import TopFixedBar from "../../components/TopFixedBar/TopFixedBar";
import InfoBar from "../../components/InfoBar/InfoBar";
import LoginScreen from "../../components/modal-login/LoginScreen";

export default function HomePage() {

  const handleScrollToAboutme = () => {
    const aboutmeSection = document.getElementById('about-me')

    if (aboutmeSection) {
      aboutmeSection.scrollIntoView({ behavior: "smooth" })
    }
  }
  const [visibleModalLogin, setVisibleModalLogin] = useState(false)

  return (
    <div className="father-HomePage">
      <TopFixedBar showLoginFunction={() => setVisibleModalLogin(!visibleModalLogin)} />
      <div className="showroom">
        <img className="background-Photo" alt="Background-Photo" src={require("../../Assets/background-photo.png")} />
        <div className="lateral-bar" >
          <ul className="alternates-buttons" >
            <li className="button1"></li>
            <li className="button2"></li>
            <li className="button3"></li>
            <li className="button4"></li>
          </ul>
        </div>
        <div onClick={handleScrollToAboutme} className="background-down-button" >
          <img className="down-button" alt="Down-Button" src={require("../../Assets/down-button.svg").default}></img>
        </div>
      </div>
      <div id="about-me" className="about-me">
        <div className="about-me-box" >
          <h1>Bem-vindo ao nosso restaurante italiano, onde a tradição encontra a tecnologia! Nasceu de um projeto de amigos apaixonados por Programação Orientada a Objetos (POO) e pelo amor à culinária italiana. Inspirados pela riqueza das tipicas comidas italianas, nosso cardápio é um convite à Itália, com foco em massas de dar água na boca.</h1>
          <h1>Os favoritos de nossa casa são o delicioso macarrão a molho branco e os crepes irresistíveis. São pratos que conquistaram o paladar de nossos clientes e se tornaram verdadeiras estrelas em nosso menu.</h1>
          <h1>Nosso ambiente é um refúgio de calma e tranquilidade. Com músicas que nos transportam diretamente para as ruas da Itália, criamos uma atmosfera que faz você se sentir como se estivesse na cidade. Cada detalhe da decoração foi cuidadosamente escolhido para criar uma experiência autêntica e memorável.</h1>
          <h1>Venha nos visitar e faça uma viagem gastronômica à Itália em pleno coração da cidade. No nosso restaurante, a paixão pela POO e pela culinária italiana se unem para proporcionar uma experiência única. Esperamos recebê-lo em nosso cantinho italiano em breve!</h1>
        </div>
      </div>
      <InfoBar />
      {visibleModalLogin && <LoginScreen closeFunction={() => setVisibleModalLogin(!visibleModalLogin)} />}
    </div>
  );
};
