import { useState } from 'react'
import { router } from 'expo-router'
import { StyleSheet, TextInput, Pressable, Image, Alert, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { UsuarioTipo } from '@/types/Usuario'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { autenticacao } from '@/services/Firebase'
import { Texto as Text } from '@/components/Texto'
import { AcessibilidadePainel } from '@/components/AcessibilidadePainel'

export default function Index() {
  const [usuario, setUsuario] = useState<UsuarioTipo>({ codigo: '', nome: '', email: '', senha: '', permissao: 'usuario' })
  const { validarUsuario, logarContexto } = useAutenticacao()
  const verificarUsuario = async () => {
    if (!usuario.email || !usuario.senha) return Alert.alert('Campos obrigatórios', 'Por favor, informe um e-mail e senha.')
    const retorno = await validarUsuario(usuario.email, usuario.senha)
    if (retorno === 'sucesso') {
      await logarContexto({ ...usuario, nome: autenticacao.currentUser?.displayName ?? '', senha: '' })
      router.replace('/(auth)/home')
    } else Alert.alert('Falha de autenticação', retorno)
  }
  return (
    <SafeAreaView style={estilos.conteiner}><View style={{ paddingHorizontal: 20, paddingTop: 10 }}><AcessibilidadePainel /></View>
      <View style={estilos.topoDecorativo}><View style={estilos.orb} /></View>
      <View style={estilos.card}>
        <Image style={estilos.logo} source={require('../../assets/images/web/digiway-web-logo.png')} />
        <Text style={estilos.titulo}>Bem-vindo ao DigiWay</Text>
        <Text style={estilos.subtitulo}>Tecnologia que inclui quem ficou para trás.</Text>
        <View style={estilos.inputWrap}><MaterialIcons name="email" size={20} color={Cores.secundariaBase} /><TextInput style={estilos.campo} placeholder="E-mail" placeholderTextColor={Cores.textoSuave} autoCapitalize="none" keyboardType="email-address" value={usuario.email} onChangeText={(valor) => setUsuario({ ...usuario, email: valor })} /></View>
        <View style={estilos.inputWrap}><MaterialIcons name="lock" size={20} color={Cores.secundariaBase} /><TextInput style={estilos.campo} placeholder="Senha" placeholderTextColor={Cores.textoSuave} secureTextEntry value={usuario.senha} onChangeText={(valor) => setUsuario({ ...usuario, senha: valor })} /></View>
        <Pressable style={estilos.botao} onPress={verificarUsuario} accessibilityRole="button" accessibilityLabel="Entrar no DigiWay" accessibilityHint="Envia e-mail e senha para entrar"><Text style={estilos.rotulo}>Entrar</Text><MaterialIcons name="arrow-forward" size={20} color={Cores.secundariaEscura} /></Pressable>
        <Pressable style={estilos.criar} onPress={() => router.push('/novoUsuario')} accessibilityRole="button" accessibilityLabel="Criar uma conta" accessibilityHint="Abre o cadastro de novo usuário"><MaterialIcons name="person-add-alt-1" size={20} color={Cores.secundariaBase} /><Text style={estilos.criarTexto}>Criar uma conta</Text></Pressable>
      </View>
      <Text style={estilos.rodape}>DigiWay · Inclusão digital</Text>
    </SafeAreaView>
  )
}
const estilos = StyleSheet.create({
  conteiner: { flex: 1, justifyContent: 'center', backgroundColor: Cores.primariaClara, paddingHorizontal: 20 },
  topoDecorativo: { position: 'absolute', top: 0, left: 0, right: 0, height: 190, backgroundColor: Cores.secundariaEscura, overflow: 'hidden' },
  orb: { width: 220, height: 220, borderRadius: 110, backgroundColor: Cores.secundariaBase, position: 'absolute', right: -60, top: -90 },
  card: { backgroundColor: Cores.terciariaFundo, borderRadius: 28, padding: 24, borderWidth: 1, borderColor: Cores.primariaBase, shadowColor: Cores.secundariaEscura, shadowOpacity: 0.12, shadowRadius: 20, elevation: 5 },
  logo: { width: 180, height: 78, alignSelf: 'center', resizeMode: 'contain', marginBottom: 8 },
  titulo: { fontFamily: Fontes.logo, fontSize: 26, lineHeight: 32, color: Cores.secundariaEscura, textAlign: 'center' },
  subtitulo: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 7, marginBottom: 20 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: Cores.primariaBase, borderRadius: 13, backgroundColor: Cores.branco, paddingHorizontal: 13, marginVertical: 5 },
  campo: { flex: 1, height: 52, color: Cores.secundariaEscura, fontFamily: Fontes.baseRegular, fontSize: 15, paddingHorizontal: 10 },
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9, height: 54, borderRadius: 27, backgroundColor: Cores.primariaEscura, marginTop: 14 },
  rotulo: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 16 },
  criar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, padding: 12, marginTop: 8 },
  criarTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaBase, fontSize: 14 },
  rodape: { textAlign: 'center', color: Cores.secundariaBase, fontFamily: Fontes.baseRegular, fontSize: 12, marginTop: 20 },
})