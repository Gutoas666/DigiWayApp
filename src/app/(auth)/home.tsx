import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cabecalho } from '@/components/Cabecalho'
import { BotaoGrande } from '@/components/BotaoGrande'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useAutenticacao } from '@/hooks/useAutenticacao'
import { Texto as Text } from '@/components/Texto'

const PASSOS = [
  { icone: 'search', titulo: 'Identifique sua dúvida', texto: 'Encontre facilmente o tema que precisa aprender, organizado em categorias visuais e intuitivas.' },
  { icone: 'menu-book', titulo: 'Aprenda no seu ritmo', texto: 'Tutoriais em linguagem simples, com imagens e passo a passo adaptados para iniciantes.' },
  { icone: 'verified-user', titulo: 'Pratique com segurança', texto: 'Exercícios práticos para fixar o aprendizado sem medo de errar ou perder dados.' },
  { icone: 'language', titulo: 'Explore o digital', texto: 'Com confiança adquirida, o usuário passa a usar serviços, apps e internet de forma independente.' },
] as const

const VALORES = [
  { icone: 'accessibility-new', titulo: 'Acessibilidade acima de tudo', texto: 'Todo elemento do DigiWay é pensado para ser compreendido por qualquer pessoa.' },
  { icone: 'favorite-border', titulo: 'Empatia no design', texto: 'Desenvolvemos olhando para o usuário, não para a tecnologia.' },
  { icone: 'trending-up', titulo: 'Aprendizado progressivo', texto: 'Respeitamos o ritmo de cada pessoa e evoluímos junto com sua confiança.' },
  { icone: 'volunteer-activism', titulo: 'Impacto social real', texto: 'Queremos que pessoas reais se sintam incluídas no mundo digital.' },
  { icone: 'lock-open', titulo: 'Gratuidade e abertura', texto: 'Acesso a informação de qualidade não deve depender de condição financeira.' },
  { icone: 'chat-bubble-outline', titulo: 'Linguagem humana', texto: 'Zero jargão técnico. Falamos como pessoas, porque nossos usuários são pessoas.' },
] as const

const EQUIPE = [
  { foto: require('../../../assets/images/web/gustavo.jpg'), nome: 'Gustavo T', cargo: 'Dev & Documentação', texto: 'Desenvolvimento e documentação técnica do projeto.' },
  { foto: require('../../../assets/images/web/victor-felipe.jpg'), nome: 'Victor Felipe', cargo: 'Design & UX', texto: 'Experiência do usuário e identidade visual.' },
  { foto: require('../../../assets/images/web/leonardo.jpg'), nome: 'Leonardo Prates', cargo: 'Back-end & Banco de Dados', texto: 'Lógica de negócio e estrutura de dados.' },
  { foto: require('../../../assets/images/web/leandro.jpeg'), nome: 'Leandro Amorim', cargo: 'Pesquisa & Conteúdo', texto: 'Pesquisa e conteúdo educacional.' },
]

export default function Home() {
  const { usuarioContexto } = useAutenticacao()
  return (
    <SafeAreaView style={estilos.conteiner}>
      <Cabecalho titulo={usuarioContexto?.nome || usuarioContexto?.email?.split('@')[0] || 'DigiWay'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.scroll}>
        <View style={estilos.hero}>
          <View style={estilos.pill}><MaterialIcons name="circle" size={7} color={Cores.secundariaBase} /><Text style={estilos.pillTexto}>SOBRE O PROJETO</Text></View>
          <Text style={estilos.heroTitulo}>Tecnologia que <Text style={estilos.heroDestaque}>inclui</Text> quem ficou para trás</Text>
          <Text style={estilos.heroTexto}>O DigiWay nasceu com uma missão simples: tornar o mundo digital acessível para todos, independente da idade ou do nível de experiência com tecnologia.</Text>
          <View style={estilos.badges}>
            {['App mobile', 'Inclusão digital', 'TCC — Etec de Hortolândia', 'Acessibilidade'].map((b) => <View key={b} style={estilos.badge}><Text style={estilos.badgeTexto}>{b}</Text></View>)}
          </View>
        </View>

        <View style={estilos.missao}>
          <Text style={estilos.rotuloSecao}>Nossa missão</Text>
          <Text style={estilos.tituloSecaoDark}>Por que o DigiWay existe</Text>
          <Text style={estilos.descricaoDark}>Milhões de brasileiros enfrentam barreiras no acesso à tecnologia — não por falta de interesse, mas por falta de orientação clara e linguagem acessível. O DigiWay existe para mudar esse cenário.</Text>
          <View style={estilos.statsGrid}>
            {[
              ['46%', 'brasileiros acima de 60 anos nunca usaram a internet regularmente', 'elderly'],
              ['1 de 4', 'pessoas em baixa renda não sabe usar serviços digitais básicos', 'people'],
              ['100%', 'gratuito e pensado para ser simples desde o primeiro acesso', 'volunteer-activism'],
              ['4', 'estudantes desenvolvendo uma solução de inclusão social', 'groups'],
            ].map(([numero, texto, icone]) => (
              <View key={numero + texto} style={estilos.stat}>
                <MaterialIcons name={icone as any} size={25} color={Cores.primariaEscura} />
                <Text style={estilos.numero}>{numero}</Text>
                <Text style={estilos.statTexto}>{texto}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={estilos.secao}>
          <Text style={estilos.rotuloSecaoPurple}>Como funciona</Text>
          <Text style={estilos.tituloSecao}>Simples do início ao fim</Text>
          <Text style={estilos.descricao}>O DigiWay guia o usuário passo a passo, com linguagem clara e sem termos técnicos.</Text>
          <View style={estilos.passos}>
            {PASSOS.map((item) => <View key={item.titulo} style={estilos.cardPasso}>
              <View style={estilos.iconeCard}><MaterialIcons name={item.icone as any} size={25} color={Cores.secundariaBase} /></View>
              <Text style={estilos.cardTitulo}>{item.titulo}</Text>
              <Text style={estilos.cardTexto}>{item.texto}</Text>
            </View>)}
          </View>
        </View>

        <View style={estilos.equipe}>
          <Text style={estilos.rotuloSecaoPurple}>A equipe</Text>
          <Text style={estilos.tituloSecao}>Quem está por trás do DigiWay</Text>
          <Text style={estilos.descricao}>Quatro estudantes do curso técnico da Etec de Hortolândia, unidos pela vontade de usar tecnologia como ferramenta de transformação social.</Text>
          <View style={estilos.equipeGrid}>
            {EQUIPE.map((m) => <View key={m.nome} style={estilos.membro}>
              <Image source={m.foto} style={estilos.avatar} />
              <Text style={estilos.membroNome}>{m.nome}</Text>
              <Text style={estilos.membroCargo}>{m.cargo}</Text>
              <Text style={estilos.membroTexto}>{m.texto}</Text>
            </View>)}
          </View>
        </View>

        <View style={estilos.secao}>
          <Text style={estilos.rotuloSecaoPurple}>Nossos valores</Text>
          <Text style={estilos.tituloSecao}>O que nos guia</Text>
          <View style={estilos.valores}>
            {VALORES.map((v) => <View key={v.titulo} style={estilos.valor}>
              <View style={estilos.valorIcon}><MaterialIcons name={v.icone as any} size={21} color={Cores.secundariaBase} /></View>
              <View style={{ flex: 1 }}><Text style={estilos.valorTitulo}>{v.titulo}</Text><Text style={estilos.valorTexto}>{v.texto}</Text></View>
            </View>)}
          </View>
        </View>

        <View style={estilos.cta}>
          <MaterialIcons name="school" size={34} color={Cores.primariaClara} />
          <Text style={estilos.ctaTitulo}>Pronto para começar?</Text>
          <Text style={estilos.ctaTexto}>Escolha um curso e dê o próximo passo para usar a tecnologia com mais autonomia.</Text>
          <BotaoGrande rotulo="Ver cursos" icone="arrow-forward" onPress={() => router.push('/(auth)/cursos')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  conteiner: { flex: 1, backgroundColor: Cores.terciariaFundo },
  scroll: { paddingBottom: 28 },
  hero: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 32, alignItems: 'center', backgroundColor: Cores.primariaClara },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: Cores.primariaEscura, backgroundColor: 'rgba(168,202,255,0.22)', marginBottom: 18 },
  pillTexto: { fontFamily: Fontes.logoSemiBold, fontSize: 11, letterSpacing: 1, color: Cores.secundariaBase },
  heroTitulo: { fontFamily: Fontes.logo, fontSize: 34, lineHeight: 40, textAlign: 'center', color: Cores.secundariaEscura },
  heroDestaque: { color: Cores.secundariaBase },
  heroTexto: { marginTop: 16, textAlign: 'center', color: Cores.secundariaBase, fontFamily: Fontes.baseRegular, fontSize: Fontes.medio1, lineHeight: 25 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 20 },
  badge: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: Cores.terciariaFundo, borderWidth: 1, borderColor: Cores.primariaBase },
  badgeTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 11 },
  missao: { backgroundColor: Cores.secundariaEscura, padding: 22 },
  rotuloSecao: { fontFamily: Fontes.logoSemiBold, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: Cores.primariaEscura, marginBottom: 7 },
  rotuloSecaoPurple: { fontFamily: Fontes.logoSemiBold, fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', color: Cores.secundariaBase, marginBottom: 7 },
  tituloSecaoDark: { fontFamily: Fontes.logo, fontSize: 27, lineHeight: 33, color: Cores.primariaClara, marginBottom: 10 },
  tituloSecao: { fontFamily: Fontes.logo, fontSize: 27, lineHeight: 33, color: Cores.secundariaEscura, marginBottom: 10 },
  descricaoDark: { color: 'rgba(240,244,255,0.78)', fontFamily: Fontes.baseRegular, fontSize: Fontes.medio1, lineHeight: 25 },
  descricao: { color: Cores.secundariaBase, fontFamily: Fontes.baseRegular, fontSize: Fontes.medio1, lineHeight: 25 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, marginTop: 24 },
  stat: { width: '46%', borderTopWidth: 2, borderTopColor: Cores.primariaEscura, paddingTop: 12 },
  numero: { fontFamily: Fontes.logo, color: Cores.primariaEscura, fontSize: 30, marginTop: 5 },
  statTexto: { fontFamily: Fontes.baseRegular, color: 'rgba(240,244,255,0.7)', fontSize: 12, lineHeight: 18, marginTop: 4 },
  secao: { padding: 22, backgroundColor: Cores.terciariaFundo },
  passos: { gap: 12, marginTop: 20 },
  cardPasso: { padding: 18, borderRadius: 16, borderWidth: 1, borderColor: Cores.primariaBase, backgroundColor: Cores.terciariaFundo },
  iconeCard: { width: 50, height: 50, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.primariaBase, marginBottom: 13 },
  cardTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 16, marginBottom: 6 },
  cardTexto: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 13, lineHeight: 20 },
  equipe: { padding: 22, backgroundColor: Cores.primariaClara },
  equipeGrid: { gap: 12, marginTop: 20 },
  membro: { alignItems: 'center', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: Cores.primariaBase, backgroundColor: Cores.terciariaFundo },
  avatar: { width: 76, height: 76, borderRadius: 38, marginBottom: 12 },
  membroNome: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 16 },
  membroCargo: { fontFamily: Fontes.baseMedio, color: Cores.secundariaBase, fontSize: 11, textTransform: 'uppercase', marginTop: 4, textAlign: 'center' },
  membroTexto: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 13, lineHeight: 19, textAlign: 'center', marginTop: 7 },
  valores: { gap: 10, marginTop: 20 },
  valor: { flexDirection: 'row', gap: 12, padding: 15, borderRadius: 14, borderWidth: 1, borderColor: Cores.primariaBase, backgroundColor: Cores.primariaClara },
  valorIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.primariaEscura },
  valorTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 14, marginBottom: 3 },
  valorTexto: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 12, lineHeight: 18 },
  cta: { padding: 30, alignItems: 'center', backgroundColor: Cores.secundariaEscura },
  ctaTitulo: { fontFamily: Fontes.logo, color: Cores.primariaClara, fontSize: 28, textAlign: 'center', marginTop: 12 },
  ctaTexto: { fontFamily: Fontes.baseRegular, color: 'rgba(240,244,255,0.75)', fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 8, marginBottom: 16 },
})