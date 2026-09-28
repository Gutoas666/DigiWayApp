import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type NivelTexto = 'normal' | 'grande' | 'muitoGrande'

interface AcessibilidadeContextoTipo {
  nivelTexto: NivelTexto
  altoContraste: boolean
  reduzirMovimento: boolean
  textoMaior: boolean
  alternarTextoMaior: () => void
  alternarAltoContraste: () => void
  alternarReducaoMovimento: () => void
}

const STORAGE_KEY = '@digiway_acessibilidade'
const Contexto = createContext<AcessibilidadeContextoTipo | null>(null)

export function AcessibilidadeProvider({ children }: { children: ReactNode }) {
  const [nivelTexto, setNivelTexto] = useState<NivelTexto>('normal')
  const [altoContraste, setAltoContraste] = useState(false)
  const [reduzirMovimento, setReduzirMovimento] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (!raw) return
      try {
        const salvo = JSON.parse(raw)
        setNivelTexto(salvo.nivelTexto ?? 'normal')
        setAltoContraste(Boolean(salvo.altoContraste))
        setReduzirMovimento(Boolean(salvo.reduzirMovimento))
      } catch {}
    })
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ nivelTexto, altoContraste, reduzirMovimento })).catch(() => {})
  }, [nivelTexto, altoContraste, reduzirMovimento])

  const value = useMemo(() => ({
    nivelTexto,
    altoContraste,
    reduzirMovimento,
    textoMaior: nivelTexto !== 'normal',
    alternarTextoMaior: () => setNivelTexto((atual) => atual === 'normal' ? 'grande' : atual === 'grande' ? 'muitoGrande' : 'normal'),
    alternarAltoContraste: () => setAltoContraste((atual) => !atual),
    alternarReducaoMovimento: () => setReduzirMovimento((atual) => !atual),
  }), [nivelTexto, altoContraste, reduzirMovimento])

  return <Contexto.Provider value={value}>{children}</Contexto.Provider>
}

export function useAcessibilidade() {
  const contexto = useContext(Contexto)
  if (!contexto) throw new Error('useAcessibilidade deve ser usado dentro de AcessibilidadeProvider')
  return contexto
}
