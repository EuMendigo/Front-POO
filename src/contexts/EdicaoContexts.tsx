import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type EdicaoContextsProps = {
  emEdicao: boolean
  setMode: () => void
}

type Props = {
  children: ReactNode
}

const EdicaoContext = createContext<EdicaoContextsProps>({} as EdicaoContextsProps)

export default function EdicaoModeProvider({ children }: Props) {
  const [emEdicao, setEmEdicao] = useState(false)

  useEffect(() => {
    function loadData() {
      const _emEdicao = localStorage.getItem("@cardapio:emEdicao")

      if (_emEdicao) {
        const value: boolean = Boolean(_emEdicao)
        setEmEdicao(value)
        return;
      }

      setEmEdicao(false)
    }

    loadData()
  }, [])

  const setMode = () => {
    setEmEdicao(!emEdicao)
    localStorage.setItem("@cardapio:emEdicao", String(!emEdicao))
  }

  return (
    <EdicaoContext.Provider value={{ emEdicao, setMode }} >
      {children}
    </EdicaoContext.Provider>
  )
}

export function useEdicaoMode() {
  const context = useContext(EdicaoContext)

  if (!context) {
    throw new Error("Contexto de edicao não definido")
  }

  return context
}