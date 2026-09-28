import { StyleSheet, ScrollView, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cabecalho } from '@/components/Cabecalho'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { Texto as Text } from '@/components/Texto'

const EQUIPE = [
  ['Gustavo T', 'Dev & Documentação', require('../../../assets/images/web/gustavo.jpg')],
  ['Victor Felipe', 'Design & UX', require('../../../assets/images/web/victor-felipe.jpg')],
  ['Leonardo Prates', 'Back-end & Banco de Dados', require('../../../assets/images/web/leonardo.jpg')],
  ['Leandro Amorim', 'Pesquisa & Conteúdo', require('../../../assets/images/web/leandro.jpeg')],
] as const
const FUNCIONALIDADES = [
  ['person-add-alt-1', 'Criação de conta com e-mail e senha'], ['lock', 'Login seguro e proteção das telas privadas'], ['menu-book', 'Cursos com passo a passo para usar a tecnologia'], ['person', 'Perfil do usuário'], ['logout', 'Encerramento da sessão (logout)'],
] as const
export default function Sobre() {
  return <SafeAreaView style={estilos.container}><Cabecalho titulo="Sobre" /><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.tela}>
    <Image style={estilos.logo} source={require('../../../assets/images/web/digiway-web-logo.png')} resizeMode="contain" />
    <Text style={estilos.titulo}>Tecnologia que inclui quem ficou para trás</Text>
    <Text style={estilos.paragrafo}>O DigiWay nasceu com uma missão simples: tornar o mundo digital acessível para todos, independente da idade ou do nível de experiência com tecnologia.</Text>
    <View style={estilos.bloco}><Text style={estilos.rotulo}>OBJETIVO</Text><Text style={estilos.secaoTitulo}>Inclusão digital com linguagem humana</Text><Text style={estilos.paragrafo}>O projeto ajuda pessoas com pouca familiaridade com tecnologia a usar recursos digitais com mais confiança e autonomia.</Text></View>
    <View style={estilos.bloco}><Text style={estilos.rotulo}>FUNCIONALIDADES</Text>{FUNCIONALIDADES.map(([icone, texto]) => <View key={texto} style={estilos.linha}><View style={estilos.icone}><MaterialIcons name={icone as any} size={21} color={Cores.secundariaBase} /></View><Text style={estilos.itemTexto}>{texto}</Text></View>)}</View>
    <View style={estilos.bloco}><Text style={estilos.rotulo}>A EQUIPE</Text><Text style={estilos.secaoTitulo}>Quem está por trás do DigiWay</Text>{EQUIPE.map(([nome, cargo, foto]) => <View key={nome} style={estilos.membro}><Image source={foto} style={estilos.foto} /><View style={{ flex: 1 }}><Text style={estilos.nome}>{nome}</Text><Text style={estilos.cargo}>{cargo}</Text></View></View>)}</View>
    <View style={estilos.rodape}><MaterialIcons name="school" size={22} color={Cores.primariaEscura} /><Text style={estilos.rodapeTexto}>Etec de Hortolândia · Desenvolvimento de Sistemas · Turma 3DSB</Text></View>
  </ScrollView></SafeAreaView>
}
const estilos = StyleSheet.create({ container: { flex: 1, backgroundColor: Cores.terciariaFundo }, tela: { padding: 22, paddingBottom: 40 }, logo: { width: 230, height: 90, alignSelf: 'center', marginBottom: 12 }, titulo: { fontFamily: Fontes.logo, fontSize: 28, lineHeight: 34, color: Cores.secundariaEscura, textAlign: 'center' }, paragrafo: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 15, lineHeight: 24, marginTop: 10 }, bloco: { marginTop: 26 }, rotulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, fontSize: 11, letterSpacing: 1.5, marginBottom: 7 }, secaoTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 21, lineHeight: 27 }, linha: { flexDirection: 'row', alignItems: 'center', gap: 11, marginVertical: 6 }, icone: { width: 42, height: 42, borderRadius: 12, backgroundColor: Cores.primariaBase, alignItems: 'center', justifyContent: 'center' }, itemTexto: { flex: 1, fontFamily: Fontes.baseRegular, color: Cores.secundariaEscura, fontSize: 14, lineHeight: 20 }, membro: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, marginTop: 8, borderRadius: 15, borderWidth: 1, borderColor: Cores.primariaBase, backgroundColor: Cores.primariaClara }, foto: { width: 54, height: 54, borderRadius: 27 }, nome: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 15 }, cargo: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 12, marginTop: 3 }, rodape: { alignItems: 'center', gap: 8, marginTop: 30, padding: 18, borderRadius: 18, backgroundColor: Cores.secundariaEscura }, rodapeTexto: { textAlign: 'center', color: Cores.primariaClara, fontFamily: Fontes.baseRegular, fontSize: 12, lineHeight: 18 } })