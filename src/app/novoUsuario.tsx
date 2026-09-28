import { useState } from 'react'
import { router } from 'expo-router'
import { StyleSheet, View, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { UsuarioTipo } from '@/types/Usuario'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { Texto as Text } from '@/components/Texto'
import { AcessibilidadePainel } from '@/components/AcessibilidadePainel'

export default function NovoUsuario() {
  const [usuario, setUsuario] = useState<UsuarioTipo>({ codigo: '', nome: '', email: '', senha: '', permissao: 'usuario' })
  const { criarAutenticacaoUsuario } = useAutenticacao()
  const salvar = async () => {
    if (!usuario.nome || !usuario.email || !usuario.senha) return Alert.alert('Erro no cadastro', 'Por favor, preencha nome, e-mail e senha.')
    const retorno = await criarAutenticacaoUsuario(usuario.email, usuario.senha, usuario.nome)
    if (retorno === 'sucesso') Alert.alert('Novo usuário', `Seja bem-vindo ${usuario.nome}!`, [{ text: 'OK', onPress: () => router.replace('/') }])
    else Alert.alert('Novo usuário', retorno)
  }
  return <SafeAreaView style={estilos.container}><View style={{ paddingHorizontal: 20, paddingTop: 10 }}><AcessibilidadePainel /></View><ScrollView contentContainerStyle={estilos.tela}><View style={estilos.icone}><MaterialIcons name="person-add-alt-1" size={34} color={Cores.secundariaBase} /></View><Text style={estilos.titulo}>Criar uma conta</Text><Text style={estilos.subtitulo}>Faça parte do DigiWay e aprenda no seu ritmo.</Text>
    {([['person', 'Nome', 'default'], ['email', 'E-mail', 'email-address'], ['lock', 'Senha', 'default']] as const).map(([icone, placeholder, tipo]) => <View style={estilos.inputWrap} key={placeholder}><MaterialIcons name={icone as any} size={20} color={Cores.secundariaBase} /><TextInput style={estilos.campo} placeholder={placeholder} placeholderTextColor={Cores.textoSuave} secureTextEntry={placeholder === 'Senha'} keyboardType={tipo === 'email-address' ? 'email-address' : 'default'} autoCapitalize={placeholder === 'E-mail' ? 'none' : 'words'} value={placeholder === 'Nome' ? usuario.nome : placeholder === 'E-mail' ? usuario.email : usuario.senha} onChangeText={(valor) => setUsuario({ ...usuario, ...(placeholder === 'Nome' ? { nome: valor } : placeholder === 'E-mail' ? { email: valor } : { senha: valor }) })} /></View>)}
    <Pressable style={estilos.botao} onPress={salvar} accessibilityRole="button" accessibilityLabel="Cadastrar conta" accessibilityHint="Cria sua conta no DigiWay"><Text style={estilos.botaoTexto}>Cadastrar</Text><MaterialIcons name="check" size={20} color={Cores.secundariaEscura} /></Pressable><Pressable style={estilos.cancelar} onPress={() => router.back()} accessibilityRole="button" accessibilityLabel="Voltar para o login"><MaterialIcons name="arrow-back" size={18} color={Cores.secundariaBase} /><Text style={estilos.cancelarTexto}>Voltar para o login</Text></Pressable>
  </ScrollView></SafeAreaView>
}
const estilos = StyleSheet.create({ container: { flex: 1, backgroundColor: Cores.primariaClara }, tela: { flexGrow: 1, justifyContent: 'center', padding: 22 }, icone: { width: 68, height: 68, borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.primariaBase, marginBottom: 14 }, titulo: { fontFamily: Fontes.logo, fontSize: 30, color: Cores.secundariaEscura, textAlign: 'center' }, subtitulo: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 7, marginBottom: 22 }, inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.branco, borderWidth: 1, borderColor: Cores.primariaBase, borderRadius: 13, paddingHorizontal: 13, marginVertical: 5 }, campo: { flex: 1, height: 52, paddingHorizontal: 10, fontFamily: Fontes.baseRegular, color: Cores.secundariaEscura, fontSize: 15 }, botao: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, height: 54, borderRadius: 27, backgroundColor: Cores.primariaEscura, marginTop: 14 }, botaoTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 16 }, cancelar: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, padding: 13 }, cancelarTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaBase, fontSize: 14 } })