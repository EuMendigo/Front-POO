import './InfoBar.css';

export default function infobar(){

  const redirectToPage = (link: string) => {
    window.location.href = link
}
    return(
        <ul className="options-infobar">
        <li onClick={() => redirectToPage('/')}>QUEM SOMOS</li>
        <li>CONTATO</li>
        <li>TRABALHE CONOSCO</li>
        <div className="Icons-InfoBar">
          <img className="instagram-icon" src={require('../../Assets/Instagram-Icon.svg').default}></img>
          <img className="Twitter-icon" src={require('../../Assets/Twitter-Icon.svg').default}></img>
          <img className="Facebook-icon" src={require('../../Assets/Facebook-Icon.svg').default}></img>
          <img className="Youtube-icon" src={require('../../Assets/Youtube-Icon.svg').default}></img>
          <img className="Linkedin-icon" src={require('../../Assets/Linkedin-Icon.svg').default}></img>
        </div>
      </ul>
    )
}