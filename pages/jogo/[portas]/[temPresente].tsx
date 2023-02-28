import styles from "../../../styles/Jogo.module.css"
import Porta from "@/components/Porta";
import { atualizarPortas, criarPortas } from "@/functions/portas";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; 
import PortaModel from "@/model/porta";

export default function Jogo() {

  const router = useRouter()
  const [portas, setPortas] = useState<PortaModel[]>([] as never[]);
  const [valido, setValido] = useState(false)
  
  useEffect(() => {
    const portasStr = router.query?.portas ?? undefined;
    const portasNum = portasStr ? +portasStr : 0;
    const temPresenteStr = router.query?.temPresente ?? '0';
    const temPresenteNum = +temPresenteStr;    
    setPortas(criarPortas(portasNum, temPresenteNum));
  }, [router?.query]);

  useEffect(() => {
    const portasStr = router.query?.portas ?? undefined;
    const portasNum = portasStr ? +portasStr : 0;
    const temPresenteStr = router.query?.temPresente ?? '0';
    const temPresenteNum = +temPresenteStr;   
    const qtdePortasValidas = portasNum !== undefined && portasNum >= 3 && portasNum <= 15;
    const temPresenteValido = temPresenteNum !== undefined && temPresenteNum >= 1 && temPresenteNum <= portasNum;
    setValido(qtdePortasValidas && temPresenteValido);
  }, [portas]);

  function renderizarPortas() {
    return portas.map(porta => {
      return <Porta key={porta.numero} value={porta} 
        onChange={novaPorta => setPortas(atualizarPortas(portas, novaPorta))} />
    })
  }

  return (
    <div className={styles.jogo}>
      <div className={styles.portas}>
        {valido ? renderizarPortas() : <h2>Valores Inválidos</h2>}
      </div>
      <div className={styles.botoes}>
        <Link href="/">
          <button>Reiniciar Jogo</button>
        </Link>
      </div>
    </div>
  )
}
