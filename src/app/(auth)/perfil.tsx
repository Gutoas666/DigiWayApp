import { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cabecalho } from '@/components/Cabecalho'
import { BotaoGrande } from '@/components/BotaoGrande'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { UsuarioTipo } from '@/types/Usuario'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { Texto as Text } from '@/components/Texto'

export default function Perfil() {
  const { usuarioContexto } = useAutenticacao()
  const [usuario, setUsuario] = useState<UsuarioTipo>({ codigo: '', nome: usuarioContexto?.nome ?? '', email: usuarioContexto?.email ?? '', senha: '', permissao: 'usuario' })
  const salvar = () => Alert.alert('Perfil', `Seus dados foram atualizados com sucesso, ${usuario.nome || 'usuário'}!`)
  return <SafeAreaView style={estilos.container}><Cabecalho titulo="Perfil" /><ScrollView contentContainerStyle={estilos.tela}><View style={estilos.cabecalho}><View style={estilos.avatar}><MaterialIcons name="person" size={45} color={Cores.primariaClara} /></View><Text style={estilos.rotulo}>MEU PERFIL</Text><Text style={estilos.titulo}>Atualize suas informações</Text><Text style={estilos.subtitulo}>Mantenha seus dados organizados e prontos para usar no DigiWay.</Text></View>
    {([['person-outline', 'Nome', usuario.nome, (v: string) => setUsuario({ ...usuario, nome: v })], ['calendar-today', 'Data de nascimento', '', () => {}], ['phone', 'Telefone', '', () => {}], ['email', 'E-mail', usuario.email, (v: string) => setUsuario({ ...usuario, email: v })], ['lock', 'Senha', '', (v: string) => setUsuario({ ...usuario, senha: v })]] as const).map(([icone, placeholder, valor, onChange]) => <View style={estilos.inputWrap} key={placeholder}><MaterialIcons name={icone as any} size={20} color={Cores.secundariaBase} /><TextInput style={estilos.campo} placeholder={placeholder} placeholderTextColor={Cores.textoSuave} value={valor} secureTextEntry={placeholder === 'Senha'} keyboardType={placeholder === 'Telefone' ? 'phone-pad' : placeholder === 'E-mail' ? 'email-address' : 'default'} onChangeText={onChange} /></View>)}
    <BotaoGrande rotulo="Salvar alterações" icone="save" onPress={salvar} />
  </ScrollView></SafeAreaView>
}
const estilos = StyleSheet.create({ container: { flex: 1, backgroundColor: Cores.terciariaFundo }, tela: { padding: 20, paddingBottom: 35 }, cabecalho: { alignItems: 'center', marginBottom: 18 }, avatar: { width: 92, height: 92, borderRadius: 46, backgroundColor: Cores.secundariaBase, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }, rotulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, letterSpacing: 1.5, fontSize: 11 }, titulo: { fontFamily: Fontes.logo, color: Cores.secundariaEscura, fontSize: 27, textAlign: 'center', marginTop: 5 }, subtitulo: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 6 }, inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.branco, borderWidth: 1, borderColor: Cores.primariaBase, borderRadius: 13, paddingHorizontal: 13, marginVertical: 6 }, campo: { flex: 1, height: 54, paddingHorizontal: 10, color: Cores.secundariaEscura, fontFamily: Fontes.baseRegular, fontSize: 15 } })