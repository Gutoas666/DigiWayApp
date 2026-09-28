import { useState } from 'react'
import { Modal, Pressable, StyleSheet, Switch, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { useAcessibilidade } from '@/context/AcessibilidadeContexto'
import { Texto as Text } from '@/components/Texto'

export function AcessibilidadePainel() {
  const [aberto, setAberto] = useState(false)
  const { nivelTexto, altoContraste, reduzirMovimento, alternarTextoMaior, alternarAltoContraste, alternarReducaoMovimento } = useAcessibilidade()
  const textoNivel = nivelTexto === 'normal' ? 'Normal' : nivelTexto === 'grande' ? 'Grande' : 'Muito grande'

  return <>
    <Pressable
      style={estilos.botao}
      onPress={() => setAberto(true)}
      accessibilityRole="button"
      accessibilityLabel="Abrir opções de acessibilidade"
      accessibilityHint="Abre as opções de tamanho do texto, contraste e movimento"
    >
      <MaterialIcons name="accessibility-new" size={21} color={Cores.secundariaBase} />
      <Text style={estilos.botaoTexto}>Acessibilidade</Text>
    </Pressable>

    <Modal visible={aberto} transparent animationType={reduzirMovimento ? 'none' : 'slide'} onRequestClose={() => setAberto(false)}>
      <View style={estilos.overlay}>
        <View style={[estilos.modal, altoContraste && estilos.modalContraste]}>
          <View style={estilos.topo}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.rotulo}>INCLUSÃO DIGITAL</Text>
              <Text style={estilos.titulo}>Acessibilidade</Text>
            </View>
            <Pressable style={estilos.fechar} onPress={() => setAberto(false)} accessibilityRole="button" accessibilityLabel="Fechar acessibilidade">
              <MaterialIcons name="close" size={22} color={Cores.secundariaEscura} />
            </Pressable>
          </View>

          <Text style={estilos.explicacao}>Personalize a experiência do DigiWay. As preferências ficam salvas neste aparelho.</Text>

          <Opcao icone="format-size" titulo="Tamanho do texto" descricao={`Atual: ${textoNivel}. O app respeita o escalonamento de fonte do aparelho.`} onPress={alternarTextoMaior} acessibilidade={`Tamanho do texto: ${textoNivel}`} />
          <Opcao icone="contrast" titulo="Alto contraste" descricao="Aumenta o contraste de elementos de apoio e áreas de acessibilidade." onPress={alternarAltoContraste} acessibilidade={`Alto contraste ${altoContraste ? 'ativado' : 'desativado'}`} ligado={altoContraste} />
          <Opcao icone="motion-photos-off" titulo="Reduzir movimento" descricao="Evita animações de abertura do painel para uma experiência mais confortável." onPress={alternarReducaoMovimento} acessibilidade={`Reduzir movimento ${reduzirMovimento ? 'ativado' : 'desativado'}`} ligado={reduzirMovimento} />

          <View style={estilos.dica} accessible accessibilityLabel="Dica de acessibilidade: use o TalkBack no Android ou VoiceOver no iPhone para ouvir os rótulos dos controles. O DigiWay possui descrições nos principais botões.">
            <MaterialIcons name="record-voice-over" size={22} color={Cores.secundariaBase} />
            <Text style={estilos.dicaTexto}>Leitor de tela: o DigiWay usa rótulos e funções de acessibilidade para facilitar a navegação com TalkBack e VoiceOver.</Text>
          </View>
        </View>
      </View>
    </Modal>
  </>
}

function Opcao({ icone, titulo, descricao, onPress, ligado, acessibilidade }: { icone: any, titulo: string, descricao: string, onPress: () => void, ligado?: boolean, acessibilidade: string }) {
  return <Pressable style={estilos.opcao} onPress={onPress} accessibilityRole="button" accessibilityLabel={acessibilidade} accessibilityHint={`Ativa ou altera ${titulo}`}>
    <View style={estilos.icone}><MaterialIcons name={icone} size={22} color={Cores.secundariaBase} /></View>
    <View style={{ flex: 1 }}><Text style={estilos.opcaoTitulo}>{titulo}</Text><Text style={estilos.opcaoDescricao}>{descricao}</Text></View>
    {typeof ligado === 'boolean' ? <Switch value={ligado} onValueChange={onPress} accessibilityRole="switch" accessibilityLabel={acessibilidade} /> : <MaterialIcons name="touch-app" size={20} color={Cores.textoSuave} />}
  </Pressable>
}

const estilos = StyleSheet.create({
  botao: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: Cores.primariaBase, backgroundColor: Cores.primariaClara },
  botaoTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 13 },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(26,15,46,0.62)' },
  modal: { backgroundColor: Cores.terciariaFundo, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 22, paddingBottom: 32 },
  modalContraste: { borderWidth: 2, borderColor: Cores.secundariaEscura },
  topo: { flexDirection: 'row', alignItems: 'center' },
  rotulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, fontSize: 10, letterSpacing: 1.4 },
  titulo: { fontFamily: Fontes.logo, color: Cores.secundariaEscura, fontSize: 26, marginTop: 4 },
  fechar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Cores.branco, alignItems: 'center', justifyContent: 'center' },
  explicacao: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 13, lineHeight: 20, marginVertical: 16 },
  opcao: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: Cores.branco, borderWidth: 1, borderColor: Cores.primariaBase, borderRadius: 16, padding: 13, marginBottom: 9, minHeight: 68 },
  icone: { width: 42, height: 42, borderRadius: 12, backgroundColor: Cores.primariaClara, alignItems: 'center', justifyContent: 'center' },
  opcaoTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 14 },
  opcaoDescricao: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 11, lineHeight: 17, marginTop: 2 },
  dica: { flexDirection: 'row', gap: 10, marginTop: 6, padding: 13, borderRadius: 14, backgroundColor: Cores.primariaClara },
  dicaTexto: { flex: 1, fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 11, lineHeight: 17 },
})