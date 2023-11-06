import './Localizacao.css';
import TopFixedBar from '../../components/TopFixedBar/TopFixedBar';
import InfoBar from '../../components/InfoBar/InfoBar';

export default function Localizacao(){
    return (
        <>
        <TopFixedBar/>
        <img className='ABNER' src={require('../../Assets/ABNER.jpg')}></img>
        <InfoBar/>
        </>
    )
}