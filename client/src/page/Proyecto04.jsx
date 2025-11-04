import '../assets/css/Proyecto04.css'
import Numero from '../components/Proyecto04/numeros'
import Validar from '../components/Proyecto04/validar'
import Saludo from '../components/Proyecto04/saludo'
import Botones from '../components/Proyecto04/botones'

function Proyecto04() {
    let numeroMax=100;
    let numeroMin=1;
    let random=Numero(numeroMin,numeroMax);

    return (
        <div class="P04">
            <Saludo/>
            <Validar random = {random}/>
            <Botones/>
        </div>
    )
}

export default Proyecto04