import { StyleSheet, View, Pressable, Image } from 'react-native'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Fontes } from '@/constants/Fontes'
import { Cores } from '@/constants/Cores'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { AcessibilidadePainel } from '@/components/AcessibilidadePainel'
import { Texto as Text } from '@/components/Texto'

interface CabecalhoProps { titulo: string | undefined }

export function Cabecalho({ titulo }: CabecalhoProps) {
  const { deslogar, deslogarContexto } = useAutenticacao()
  const sair = async () => { await deslogar(); await deslogarContexto(); router.replace('/') }
  return (
    <View style={estilos.conteiner}>
      <Image source={require('../../assets/images/web/digiway-web-logo.png')} style={estilos.logo} resizeMode="contain" />
      <Text style={estilos.texto}>{titulo}</Text>
      <AcessibilidadePainel /><Pressable style={estilos.logout} onPress={sair} accessibilityRole="button" accessibilityLabel="Sair da conta">
        <MaterialIcons name="logout" size={22} color={Cores.primariaClara} />
      </Pressable>
    </View>
  )
}

const estilos = StyleSheet.create({
  conteiner: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 68, paddingHorizontal: 16, backgroundColor: Cores.secundariaEscura },
  logo: { width: 86, height: 42 },
  texto: { flex: 1, color: Cores.primariaClara, fontSize: Fontes.medio2, fontFamily: Fontes.logoSemiBold, textAlign: 'center' },
  logout: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(168,202,255,0.16)' },
})