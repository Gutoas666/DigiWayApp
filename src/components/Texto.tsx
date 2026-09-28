import { Text as NativeText, TextProps, StyleSheet } from 'react-native'
import { useAcessibilidade } from '@/context/AcessibilidadeContexto'

export function Texto({ style, ...props }: TextProps) {
  const { nivelTexto, altoContraste } = useAcessibilidade()
  const fator = nivelTexto === 'grande' ? 1.16 : nivelTexto === 'muitoGrande' ? 1.32 : 1
  const estilo = StyleSheet.flatten(style) || {}
  const corAltoContraste = altoContraste ? (typeof estilo.color === 'string' && (estilo.color.toLowerCase().includes('240,244,255') || estilo.color.toLowerCase() === '#ffffff' || estilo.color.toLowerCase() === '#f0f4ff') ? '#FFFFFF' : '#000000') : undefined
  const estiloAjustado = (fator === 1 && !altoContraste) ? estilo : {
    ...estilo,
    ...(typeof estilo.fontSize === 'number' ? { fontSize: estilo.fontSize * fator } : {}),
    ...(typeof estilo.lineHeight === 'number' ? { lineHeight: estilo.lineHeight * fator } : {}),
    ...(corAltoContraste ? { color: corAltoContraste } : {}),
  }
  return <NativeText {...props} allowFontScaling style={estiloAjustado} />
}
