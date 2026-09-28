import { Pressable, StyleSheet, GestureResponderEvent, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { Texto as Text } from '@/components/Texto'

type Icone = keyof typeof MaterialIcons.glyphMap

interface BotaoGrandeProps {
  rotulo: string
  onPress: (evento: GestureResponderEvent) => void
  variante?: 'primario' | 'secundario'
  icone?: Icone
}

export function BotaoGrande({ rotulo, onPress, variante = 'primario', icone }: BotaoGrandeProps) {
  const primario = variante === 'primario'
  return (
    <Pressable
      style={({ pressed }) => [estilos.botao, primario ? estilos.primario : estilos.secundario, pressed && estilos.pressionado]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={rotulo}
    >
      <Text style={[estilos.rotulo, primario ? estilos.rotuloPrimario : estilos.rotuloSecundario]}>{rotulo}</Text>
      {icone && (
        <View style={estilos.iconeWrap}>
          <MaterialIcons name={icone} size={20} color={primario ? Cores.secundariaEscura : Cores.secundariaBase} />
        </View>
      )}
    </Pressable>
  )
}

const estilos = StyleSheet.create({
  botao: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: 54, width: '100%', borderRadius: 28, marginVertical: 8, paddingHorizontal: 20 },
  primario: { backgroundColor: Cores.primariaEscura },
  secundario: { backgroundColor: Cores.branco, borderWidth: 1, borderColor: Cores.primariaEscura },
  pressionado: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  rotulo: { fontFamily: Fontes.baseMedio, fontSize: Fontes.medio1 },
  rotuloPrimario: { color: Cores.secundariaEscura },
  rotuloSecundario: { color: Cores.secundariaBase },
  iconeWrap: { marginLeft: 9 },
})