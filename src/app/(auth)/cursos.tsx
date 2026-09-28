import { useMemo, useState } from 'react'
import {
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Cabecalho } from '@/components/Cabecalho'
import { Cores } from '@/constants/Cores'
import { Fontes } from '@/constants/Fontes'
import { Texto as Text } from '@/components/Texto'

interface Aula {
  titulo: string
  conteudo: string
}

interface Atividade {
  titulo: string
  instrucao: string
}

interface Pergunta {
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

interface Curso {
  id: number
  titulo: string
  categoria: string
  nivel: string
  duracao: string
  descricao: string
  objetivo: string
  aulas: Aula[]
  atividades: Atividade[]
  videoBusca: string
  perguntas?: Pergunta[]
}

const curso = (
  id: number,
  titulo: string,
  categoria: string,
  nivel: string,
  duracao: string,
  descricao: string,
  objetivo: string,
  aulas: Aula[],
  atividades: Atividade[],
  videoBusca: string,
): Curso => ({ id, titulo, categoria, nivel, duracao, descricao, objetivo, aulas, atividades, videoBusca })

const CURSOS: Curso[] = [
  curso(1, 'Fundamentos da Informática', 'Base', 'Iniciante', '4 semanas',
    'Aprenda a reconhecer as partes do computador, usar arquivos, pastas, programas e navegador.',
    'Ao terminar, você deverá conseguir organizar arquivos, abrir programas e realizar tarefas básicas sem ajuda.',
    [
      { titulo: 'Computador por dentro e por fora', conteudo: 'Conheça processador, memória RAM, armazenamento, teclado, mouse, monitor e portas. Diferencie memória de armazenamento: RAM é usada durante a execução; SSD/HD guarda dados mesmo depois de desligar.' },
      { titulo: 'Arquivos e pastas', conteudo: 'Uma pasta organiza arquivos. Use nomes claros, crie pastas por assunto e evite guardar tudo na área de trabalho. Aprenda também a copiar, mover, renomear e excluir arquivos.' },
      { titulo: 'Programas e navegador', conteudo: 'Programas executam tarefas específicas. O navegador permite acessar páginas da internet. Aprenda a abrir novas abas, favoritos, downloads e histórico.' },
    ],
    [
      { titulo: 'Organize seus arquivos', instrucao: 'Crie uma estrutura com as pastas Estudos, Documentos, Fotos e Projetos. Mova pelo menos dois arquivos para cada pasta.' },
      { titulo: 'Desafio do navegador', instrucao: 'Abra três abas, salve uma página nos favoritos e localize um arquivo baixado. Explique onde cada item ficou.' },
    ], 'informática básica computador arquivos pastas aula'),
  curso(2, 'Navegação Segura na Web', 'Segurança', 'Iniciante', '3 semanas',
    'Aprenda a identificar golpes, sites suspeitos, phishing e práticas seguras de navegação.',
    'Reconhecer sinais de fraude e tomar decisões mais seguras antes de clicar ou fornecer dados.',
    [
      { titulo: 'Phishing e golpes', conteudo: 'Phishing tenta induzir a vítima a entregar senhas, códigos ou dados. Desconfie de urgência, ameaças, promessas exageradas e links inesperados.' },
      { titulo: 'Sites e links', conteudo: 'Antes de entrar, confira o endereço do site, o domínio e o contexto. HTTPS ajuda na proteção da conexão, mas não significa que todo site seja legítimo.' },
      { titulo: 'Senhas e autenticação', conteudo: 'Use senhas diferentes para serviços importantes e ative autenticação em dois fatores quando disponível. Nunca compartilhe códigos de autenticação.' },
    ],
    [
      { titulo: 'Caça ao golpe', instrucao: 'Analise uma mensagem fictícia de prêmio urgente. Liste pelo menos quatro sinais que fariam você desconfiar.' },
      { titulo: 'Checklist de segurança', instrucao: 'Confira no seu celular se existe bloqueio de tela, atualização pendente e autenticação em dois fatores nas contas principais.' },
    ], 'CERT.br segurança internet phishing golpes senhas'),
  curso(3, 'E-mails e Comunicação Digital', 'Produtividade', 'Iniciante', '4 semanas',
    'Aprenda a escrever e-mails claros, anexar arquivos e organizar mensagens.',
    'Enviar mensagens digitais de forma objetiva, educada e organizada.',
    [
      { titulo: 'Estrutura de um e-mail', conteudo: 'Um bom e-mail tem assunto claro, saudação, mensagem objetiva, pedido ou informação principal e encerramento. Evite assunto vazio.' },
      { titulo: 'Anexos e destinatários', conteudo: 'Confira destinatários antes de enviar e verifique se o anexo correto está realmente anexado. Use Cc e Cco com atenção.' },
      { titulo: 'Organização da caixa de entrada', conteudo: 'Use pesquisa, marcadores/pastas e arquivamento. Exclua spam e evite deixar mensagens importantes sem resposta.' },
    ],
    [
      { titulo: 'Escreva um e-mail profissional', instrucao: 'Redija um e-mail pedindo informações sobre uma vaga de estágio, usando assunto, saudação, pedido e assinatura.' },
      { titulo: 'Organize sua caixa', instrucao: 'Crie três categorias para mensagens: escola, trabalho e pessoal. Mova mensagens de teste para cada categoria.' },
    ], 'Gmail como escrever e-mail profissional aula'),
  curso(4, 'Aplicativos de Mensagem', 'Aplicativos', 'Iniciante', '3 semanas',
    'Aprenda boas práticas para usar mensageiros, grupos, chamadas e compartilhamento de arquivos.',
    'Comunicar-se com clareza sem expor dados pessoais desnecessariamente.',
    [
      { titulo: 'Mensagens e grupos', conteudo: 'Use mensagens objetivas, evite encaminhar boatos e confirme informações antes de compartilhar. Em grupos, respeite regras e horários.' },
      { titulo: 'Fotos, documentos e localização', conteudo: 'Antes de enviar arquivos, confirme o destinatário. Pense se uma foto contém endereço, documento, placa ou outras informações pessoais.' },
      { titulo: 'Privacidade e bloqueio', conteudo: 'Revise quem pode ver foto, status e informações do perfil. Saiba bloquear e denunciar contatos suspeitos.' },
    ],
    [
      { titulo: 'Mensagem clara', instrucao: 'Transforme uma mensagem confusa em um pedido com contexto, ação esperada e prazo.' },
      { titulo: 'Privacidade do mensageiro', instrucao: 'Revise as configurações de privacidade do seu aplicativo e anote duas mudanças que aumentariam sua segurança.' },
    ], 'WhatsApp segurança privacidade configurações aula'),
  curso(5, 'Introdução ao Google Workspace', 'Produtividade', 'Básico', '5 semanas',
    'Use Docs, Sheets, Drive, Forms e Meet para estudar e trabalhar de forma colaborativa.',
    'Criar, organizar e compartilhar materiais digitais com colaboração em nuvem.',
    [
      { titulo: 'Drive e organização', conteudo: 'O Drive permite armazenar e organizar arquivos na nuvem. Crie pastas por projeto e use nomes que facilitem a busca.' },
      { titulo: 'Docs e colaboração', conteudo: 'No Docs, use títulos, listas, comentários e histórico de versões. A colaboração permite editar o mesmo documento com outras pessoas.' },
      { titulo: 'Sheets e Forms', conteudo: 'Sheets organiza dados em tabelas e permite cálculos. Forms cria questionários e envia respostas para análise.' },
    ],
    [
      { titulo: 'Documento colaborativo', instrucao: 'Crie um documento com título, três tópicos e uma tabela simples. Compartilhe com um colega usando a permissão adequada.' },
      { titulo: 'Pesquisa rápida', instrucao: 'Crie um formulário com cinco perguntas sobre hábitos de estudo e organize as respostas em uma planilha.' },
    ], 'Google Workspace Docs Sheets Drive Forms tutorial português'),
  curso(6, 'Trabalhando com Fotos e Imagens', 'Criatividade', 'Básico', '4 semanas',
    'Aprenda a organizar fotos, fazer ajustes simples e cuidar dos arquivos de imagem.',
    'Gerenciar imagens com segurança e produzir materiais visuais simples.',
    [
      { titulo: 'Formatos de imagem', conteudo: 'JPEG é comum em fotografias; PNG preserva transparência e é útil para gráficos; WEBP é eficiente para web. O formato escolhido depende do uso.' },
      { titulo: 'Organização e backup', conteudo: 'Crie pastas por ano ou projeto e mantenha cópias de arquivos importantes. Evite depender de um único dispositivo.' },
      { titulo: 'Edição básica', conteudo: 'Corte, ajuste brilho/contraste e redimensione sem exagerar. Preserve a imagem original antes de editar.' },
    ],
    [
      { titulo: 'Organize sua galeria', instrucao: 'Escolha dez fotos e crie uma organização por evento ou período. Identifique quais devem ter backup.' },
      { titulo: 'Antes e depois', instrucao: 'Edite uma imagem fazendo apenas corte e ajuste de brilho. Compare com o original e descreva o que mudou.' },
    ], 'edição de fotos celular organização imagens aula'),
  curso(7, 'Uso de Redes Sociais', 'Comunicação', 'Básico', '3 semanas',
    'Entenda perfil, privacidade, publicação, desinformação e comportamento responsável nas redes.',
    'Usar redes sociais de maneira consciente, segura e responsável.',
    [
      { titulo: 'Perfil e privacidade', conteudo: 'Revise informações públicas do perfil. Evite publicar documentos, endereços, rotinas ou outros dados que possam facilitar identificação ou golpes.' },
      { titulo: 'Desinformação', conteudo: 'Antes de compartilhar, confira fonte, data, contexto e se outras fontes confiáveis confirmam a informação.' },
      { titulo: 'Convivência digital', conteudo: 'Comentários também têm impacto. Evite ataques pessoais, respeite diferenças e use ferramentas de denúncia quando necessário.' },
    ],
    [
      { titulo: 'Verifique antes de compartilhar', instrucao: 'Pegue uma notícia qualquer e faça um checklist: fonte, data, autor, evidências e confirmação em outra fonte.' },
      { titulo: 'Limpeza do perfil', instrucao: 'Revise três publicações antigas e identifique se existe informação pessoal que você não gostaria de deixar pública.' },
    ], 'educação midiática desinformação redes sociais segurança'),
  curso(8, 'Pagamentos Digitais', 'Financeiro', 'Básico', '4 semanas',
    'Aprenda conceitos de Pix, boletos, cartões e cuidados antes de confirmar uma transação.',
    'Realizar pagamentos digitais conferindo destinatário, valor e contexto.',
    [
      { titulo: 'Pix na prática', conteudo: 'Antes de confirmar um Pix, confira nome do recebedor, instituição e valor. Nunca forneça códigos de autenticação para terceiros.' },
      { titulo: 'Boletos e cobranças', conteudo: 'Confira beneficiário, valor e vencimento. Em cobranças inesperadas, procure o fornecedor por um canal oficial antes de pagar.' },
      { titulo: 'Golpes financeiros', conteudo: 'Desconfie de pedidos urgentes, falsas centrais de atendimento e ofertas que exigem pagamento imediato. Em caso de dúvida, pare a operação.' },
    ],
    [
      { titulo: 'Simule uma conferência', instrucao: 'Use uma cobrança fictícia e crie uma lista com os dados que você conferiria antes de pagar.' },
      { titulo: 'Identifique o golpe', instrucao: 'Analise um cenário de falsa central bancária e marque quais informações nunca deveriam ser compartilhadas.' },
    ], 'Banco Central Pix segurança golpes pagamentos digitais'),
  curso(9, 'Online Banking para Iniciantes', 'Financeiro', 'Básico', '4 semanas',
    'Aprenda a consultar saldo, extrato e serviços bancários digitais com atenção à segurança.',
    'Navegar pelo aplicativo bancário e conferir operações com segurança.',
    [
      { titulo: 'Saldo e extrato', conteudo: 'Saldo mostra uma visão da conta; o extrato detalha entradas e saídas. Confira datas, valores e descrições para identificar operações desconhecidas.' },
      { titulo: 'Transferências e pagamentos', conteudo: 'Revise destinatário, valor e data antes de confirmar. Use apenas aplicativos e canais oficiais do banco.' },
      { titulo: 'Segurança bancária', conteudo: 'Nunca informe senha, token ou código de autenticação a quem ligar dizendo ser do banco. Bancos não precisam que você instale aplicativos desconhecidos para “proteger” sua conta.' },
    ],
    [
      { titulo: 'Leia um extrato fictício', instrucao: 'Classifique dez lançamentos fictícios em entrada, gasto fixo, gasto variável ou transferência.' },
      { titulo: 'Checklist do banco', instrucao: 'Liste cinco cuidados que você tomaria ao acessar seu banco em um celular novo.' },
    ], 'internet banking segurança banco para iniciantes'),
  curso(10, 'Segurança para Celular', 'Segurança', 'Básico', '3 semanas',
    'Proteja aparelho, contas, aplicativos e informações pessoais.',
    'Configurar as principais camadas de segurança de um smartphone.',
    [
      { titulo: 'Bloqueio e biometria', conteudo: 'Use PIN ou senha forte e, quando disponível, biometria. O bloqueio de tela reduz o risco de acesso direto aos seus dados.' },
      { titulo: 'Atualizações e aplicativos', conteudo: 'Atualizações corrigem falhas. Instale aplicativos de fontes confiáveis e revise permissões que pareçam excessivas.' },
      { titulo: 'Perda ou roubo', conteudo: 'Ative recursos de localização e bloqueio remoto quando disponíveis. Evite armazenar senhas em locais desprotegidos.' },
    ],
    [
      { titulo: 'Auditoria do celular', instrucao: 'Verifique atualizações, bloqueio de tela, permissões e aplicativos instalados. Escolha uma melhoria para fazer hoje.' },
      { titulo: 'Plano de emergência', instrucao: 'Escreva o que faria nas primeiras três ações se seu celular fosse perdido.' },
    ], 'segurança celular Android senhas permissões atualizações'),
  curso(11, 'Organização de Arquivos', 'Produtividade', 'Básico', '3 semanas',
    'Crie uma rotina para nomear, classificar, encontrar e fazer backup de documentos.',
    'Reduzir tempo perdido procurando arquivos e diminuir risco de perda de dados.',
    [
      { titulo: 'Nomeação e pastas', conteudo: 'Use nomes consistentes como “2026-09-Trabalho-TCC”. Evite nomes genéricos como “novo documento final final”.' },
      { titulo: 'Backup', conteudo: 'Backup é uma cópia para recuperação. Arquivos importantes podem ter cópias em outro dispositivo ou serviço de nuvem.' },
      { titulo: 'Limpeza digital', conteudo: 'Exclua duplicados, versões obsoletas e downloads desnecessários, mas confirme antes de apagar algo importante.' },
    ],
    [
      { titulo: 'Crie um padrão', instrucao: 'Escolha um padrão de nomes para seus trabalhos escolares e renomeie cinco arquivos seguindo esse padrão.' },
      { titulo: 'Mapa de arquivos', instrucao: 'Desenhe ou anote uma árvore de pastas para organizar seus estudos do ano inteiro.' },
    ], 'organização de arquivos pastas backup produtividade'),
  curso(12, 'Introdução à Saúde Digital', 'Bem-estar', 'Básico', '3 semanas',
    'Aprenda boas práticas para encontrar informações de saúde e usar serviços digitais sem substituir orientação profissional.',
    'Usar recursos digitais de saúde com cuidado e reconhecer limites das informações online.',
    [
      { titulo: 'Informação de saúde', conteudo: 'Informação encontrada na internet não substitui avaliação profissional. Prefira instituições reconhecidas e confira data e autoria.' },
      { titulo: 'Agendamentos e serviços', conteudo: 'Antes de inserir dados em um portal, confira se você está no endereço oficial do serviço. Guarde comprovantes de agendamento.' },
      { titulo: 'Privacidade', conteudo: 'Dados de saúde são pessoais. Evite publicar exames, documentos e informações clínicas em redes sociais ou grupos públicos.' },
    ],
    [
      { titulo: 'Fonte confiável', instrucao: 'Compare uma página de saúde confiável com uma postagem sem autoria e liste cinco diferenças de qualidade.' },
      { titulo: 'Privacidade', instrucao: 'Crie uma lista de dados pessoais que você nunca compartilharia em um grupo público.' },
    ], 'Ministério da Saúde saúde digital informação confiável'),
  curso(13, 'Acesso a Serviços Públicos', 'Cidadania', 'Básico', '4 semanas',
    'Conheça conceitos de serviços públicos digitais e cuidados ao acessar portais oficiais.',
    'Encontrar serviços públicos online sem cair em páginas falsas ou intermediários desnecessários.',
    [
      { titulo: 'Portais oficiais', conteudo: 'Procure o serviço a partir de canais oficiais do governo. Confira o domínio e evite pagar por serviços que são gratuitos quando o portal oficial informa que não há cobrança.' },
      { titulo: 'Conta e identidade digital', conteudo: 'Contas governamentais podem dar acesso a serviços sensíveis. Proteja senha e autenticação e não compartilhe códigos.' },
      { titulo: 'Documentos digitais', conteudo: 'Use somente aplicativos e portais oficiais para documentos. Mantenha dados pessoais protegidos e confira permissões.' },
    ],
    [
      { titulo: 'Encontre o caminho oficial', instrucao: 'Escolha um serviço público e anote como você encontraria o portal oficial sem clicar em anúncio ou mensagem recebida.' },
      { titulo: 'Checklist do portal', instrucao: 'Liste domínio, conexão, identificação do órgão e canal de atendimento como itens para verificar antes de inserir dados.' },
    ], 'gov.br serviços digitais tutorial conta gov br'),
  curso(14, 'Uso de Videoconferência', 'Comunicação', 'Básico', '3 semanas',
    'Aprenda a entrar em reuniões, usar microfone, câmera, chat e compartilhamento de tela.',
    'Participar de reuniões online com autonomia e boa etiqueta digital.',
    [
      { titulo: 'Entrando na reunião', conteudo: 'Confira o link, teste áudio e câmera e entre alguns minutos antes. Use fones quando houver eco ou ruído.' },
      { titulo: 'Microfone, câmera e chat', conteudo: 'Mantenha o microfone fechado quando não estiver falando. Use o chat para perguntas curtas e respeite a condução da reunião.' },
      { titulo: 'Compartilhamento de tela', conteudo: 'Feche janelas com dados pessoais antes de compartilhar. Compartilhe somente a janela necessária quando a ferramenta permitir.' },
    ],
    [
      { titulo: 'Teste de reunião', instrucao: 'Faça uma reunião de teste com alguém. Pratique ligar/desligar microfone, câmera, chat e compartilhamento.' },
      { titulo: 'Etiqueta digital', instrucao: 'Escreva cinco regras para uma reunião online profissional ou escolar.' },
    ], 'Google Meet tutorial básico português videoconferência'),
  curso(15, 'Como Ler Conteúdo Online', 'Leitura', 'Básico', '3 semanas',
    'Desenvolva estratégias para compreender textos, localizar informações e verificar fontes.',
    'Ler páginas digitais com atenção e reduzir o risco de interpretar informações fora de contexto.',
    [
      { titulo: 'Leitura em camadas', conteudo: 'Comece pelo título e subtítulos, identifique o objetivo e depois leia detalhes. Em textos longos, use busca por palavras-chave.' },
      { titulo: 'Fonte e contexto', conteudo: 'Pergunte quem publicou, quando, por quê e quais evidências são apresentadas. Uma frase verdadeira pode ser usada fora de contexto.' },
      { titulo: 'Resumo', conteudo: 'Depois de ler, escreva a ideia principal em uma frase e três pontos que sustentem essa ideia.' },
    ],
    [
      { titulo: 'Resumo de 3 linhas', instrucao: 'Leia uma notícia e escreva um resumo de até três linhas sem copiar frases inteiras.' },
      { titulo: 'Perguntas de fonte', instrucao: 'Para o mesmo texto, responda: quem publicou, quando, qual objetivo e quais evidências aparecem?' },
    ], 'leitura crítica internet checagem de fatos educação midiática'),
  curso(16, 'Educação Financeira Digital', 'Financeiro', 'Intermediário', '5 semanas',
    'Aprenda a registrar receitas e despesas, montar orçamento e avaliar compras digitais.',
    'Tomar decisões financeiras mais organizadas usando ferramentas digitais.',
    [
      { titulo: 'Receitas e despesas', conteudo: 'Registre entradas e saídas. Separe despesas fixas, variáveis e eventuais para entender para onde o dinheiro está indo.' },
      { titulo: 'Orçamento', conteudo: 'Um orçamento compara recursos disponíveis com gastos planejados. Ajuste categorias quando os gastos reais divergirem do plano.' },
      { titulo: 'Compras online', conteudo: 'Compare preço total, frete, condições e reputação. Desconfie de ofertas muito fora do padrão e confira o endereço do site.' },
    ],
    [
      { titulo: 'Orçamento mensal', instrucao: 'Monte um orçamento fictício com R$ 2.000 de renda e distribua entre necessidades, objetivos e lazer.' },
      { titulo: 'Compra consciente', instrucao: 'Compare duas ofertas fictícias considerando preço, frete, garantia e necessidade real antes de decidir.' },
    ], 'Banco Central educação financeira orçamento pessoal'),
  curso(17, 'Introdução à IA para Iniciantes', 'Tecnologia', 'Básico', '4 semanas',
    'Entenda o que são modelos de IA, como escrever pedidos claros e como verificar respostas.',
    'Usar ferramentas de IA de forma crítica, responsável e transparente.',
    [
      { titulo: 'O que é IA generativa', conteudo: 'Ferramentas generativas produzem texto, imagens, áudio ou código a partir de padrões aprendidos. Elas podem gerar respostas plausíveis e ainda assim erradas.' },
      { titulo: 'Como escrever um bom pedido', conteudo: 'Informe objetivo, contexto, formato desejado e restrições. Quanto mais claro o pedido, mais fácil avaliar a resposta.' },
      { titulo: 'Verificação e responsabilidade', conteudo: 'Confira fatos importantes em fontes confiáveis, não envie dados sensíveis e respeite regras de autoria e da escola ou trabalho.' },
    ],
    [
      { titulo: 'Melhore um prompt', instrucao: 'Pegue o pedido “me explique matemática” e transforme-o em um pedido com tema, nível, formato e exemplo.' },
      { titulo: 'Verificação', instrucao: 'Faça uma afirmação factual e escreva três fontes independentes que poderiam ser usadas para conferir a resposta de uma IA.' },
    ], 'inteligência artificial generativa para iniciantes educação'),
  curso(18, 'Uso de Assistentes Virtuais', 'Tecnologia', 'Básico', '3 semanas',
    'Aprenda a formular comandos úteis para assistentes por voz ou texto e a conferir resultados.',
    'Usar assistentes como apoio sem transferir decisões importantes para a ferramenta.',
    [
      { titulo: 'Comandos claros', conteudo: 'Diga o que deseja, contexto e formato. Exemplo: “Crie uma lista de cinco passos para estudar para uma prova de matemática”.' },
      { titulo: 'Resultados e erros', conteudo: 'Assistentes podem interpretar comandos de maneira diferente do esperado. Leia a resposta e reformule o pedido quando necessário.' },
      { titulo: 'Privacidade', conteudo: 'Evite informar senhas, documentos, códigos de autenticação e outras informações que não sejam necessárias para a tarefa.' },
    ],
    [
      { titulo: 'Comando em três versões', instrucao: 'Peça ao assistente uma receita, um resumo ou uma lista de estudos. Melhore o mesmo pedido duas vezes adicionando contexto.' },
      { titulo: 'O que não enviar?', instrucao: 'Crie uma lista com cinco tipos de dados que não devem ser compartilhados sem necessidade.' },
    ], 'assistente virtual comandos voz tutorial'),
  curso(19, 'Planejamento de Estudos Online', 'Aprendizado', 'Básico', '4 semanas',
    'Organize metas, sessões de estudo, revisão e acompanhamento de progresso usando ferramentas digitais.',
    'Transformar uma meta grande em tarefas pequenas e acompanháveis.',
    [
      { titulo: 'Meta e prioridade', conteudo: 'Defina o que precisa aprender e por quê. Separe tarefas urgentes das importantes e escolha poucas prioridades por dia.' },
      { titulo: 'Sessões de estudo', conteudo: 'Divida o conteúdo em blocos. Faça pausas curtas e use exercícios ou perguntas para recuperar o que aprendeu.' },
      { titulo: 'Revisão e progresso', conteudo: 'Registre o que foi concluído e revise conteúdos com dificuldade. Um calendário simples já pode funcionar.' },
    ],
    [
      { titulo: 'Plano de 7 dias', instrucao: 'Escolha uma matéria e monte um plano de sete dias com estudo, exercícios e revisão.' },
      { titulo: 'Autoavaliação', instrucao: 'Ao final da semana, dê uma nota de 0 a 5 para seu domínio de cada tópico e escolha o que revisar.' },
    ], 'planejamento de estudos técnicas estudo online'),
  curso(20, 'Primeiros Passos com Tablets', 'Dispositivos', 'Iniciante', '4 semanas',
    'Aprenda gestos, aplicativos, teclado, internet e configurações básicas em tablets.',
    'Usar um tablet com autonomia para tarefas de estudo, comunicação e lazer.',
    [
      { titulo: 'Gestos e tela inicial', conteudo: 'Toque, deslize, pressione e arraste são gestos básicos. Aprenda a localizar aplicativos, notificações e configurações.' },
      { titulo: 'Aplicativos e permissões', conteudo: 'Instale apenas aplicativos confiáveis e leia permissões. Remova apps que não são mais usados.' },
      { titulo: 'Internet e teclado', conteudo: 'Use o teclado virtual para pesquisar e escrever. Confira a rede Wi-Fi antes de inserir informações sensíveis.' },
    ],
    [
      { titulo: 'Mapa do tablet', instrucao: 'Encontre configurações de Wi-Fi, Bluetooth, som, brilho e armazenamento. Anote o caminho para chegar a cada uma.' },
      { titulo: 'Tarefa guiada', instrucao: 'Abra o navegador, pesquise um assunto escolar, salve a página nos favoritos e depois encontre o favorito novamente.' },
    ], 'tablet Android para iniciantes tutorial português'),
]


const PERGUNTAS: Record<number, Pergunta[]> = {
  1: [
    { pergunta: 'Qual é a função principal da memória RAM?', opcoes: ['Guardar arquivos mesmo com o computador desligado', 'Armazenar temporariamente dados usados pelos programas', 'Proteger o computador contra vírus', 'Conectar o computador à internet'], correta: 1, explicacao: 'A RAM mantém temporariamente os dados necessários enquanto os programas estão sendo executados.' },
    { pergunta: 'Qual prática ajuda a organizar arquivos?', opcoes: ['Guardar tudo na área de trabalho', 'Usar nomes claros e pastas por assunto', 'Excluir arquivos sem conferir', 'Criar uma pasta diferente para cada arquivo'], correta: 1, explicacao: 'Pastas e nomes claros facilitam encontrar documentos e manter o computador organizado.' },
  ],
  2: [
    { pergunta: 'Qual é um sinal comum de phishing?', opcoes: ['Mensagem que cria urgência e pede dados', 'Site conhecido aberto pelo aplicativo oficial', 'Arquivo criado por você', 'Atualização feita pela loja oficial'], correta: 0, explicacao: 'Golpes de phishing costumam usar urgência, ameaça ou promessa para induzir a pessoa a agir sem conferir.' },
    { pergunta: 'O que fazer com um código de autenticação recebido sem solicitação?', opcoes: ['Enviar para quem pediu', 'Publicar em um grupo', 'Não compartilhar e investigar a tentativa de acesso', 'Usar como senha'], correta: 2, explicacao: 'Códigos de autenticação são pessoais. Recebê-los sem solicitar pode indicar uma tentativa de acesso.' },
  ],
  3: [
    { pergunta: 'O que deve aparecer em um assunto de e-mail profissional?', opcoes: ['Nada', 'Um resumo claro do motivo da mensagem', 'A senha do remetente', 'Somente emojis'], correta: 1, explicacao: 'Um assunto objetivo ajuda o destinatário a entender e localizar a mensagem.' },
    { pergunta: 'Antes de enviar um anexo, qual conferência é importante?', opcoes: ['Verificar destinatário e arquivo anexado', 'Apagar o assunto', 'Desativar a internet', 'Enviar para todos os contatos'], correta: 0, explicacao: 'Conferir destinatário e anexo evita vazamento de informações e envio do arquivo errado.' },
  ],
  4: [
    { pergunta: 'Antes de compartilhar uma foto em um grupo, o que deve ser verificado?', opcoes: ['Somente o tamanho do arquivo', 'Destinatário e possíveis dados pessoais visíveis', 'A quantidade de emojis', 'O número de mensagens do grupo'], correta: 1, explicacao: 'Fotos podem revelar documentos, endereços, placas ou outras informações pessoais.' },
    { pergunta: 'Qual atitude ajuda contra desinformação em grupos?', opcoes: ['Encaminhar imediatamente', 'Conferir a informação antes de compartilhar', 'Alterar a mensagem original', 'Excluir todas as conversas'], correta: 1, explicacao: 'Verificar a fonte e o contexto antes de compartilhar reduz a propagação de informações falsas.' },
  ],
  5: [
    { pergunta: 'Para que serve o Google Drive?', opcoes: ['Somente para editar fotos', 'Armazenar e organizar arquivos na nuvem', 'Bloquear anúncios', 'Criar senhas automaticamente'], correta: 1, explicacao: 'O Drive permite armazenar, organizar e compartilhar arquivos na nuvem.' },
    { pergunta: 'Qual ferramenta é adequada para criar um questionário?', opcoes: ['Google Forms', 'Google Maps', 'Google Fotos', 'Google Agenda'], correta: 0, explicacao: 'O Google Forms foi criado para formulários, pesquisas e questionários.' },
  ],
  6: [
    { pergunta: 'Qual formato costuma preservar transparência?', opcoes: ['PNG', 'MP3', 'TXT', 'CSV'], correta: 0, explicacao: 'PNG suporta transparência e é muito usado para gráficos, ícones e imagens com fundo transparente.' },
    { pergunta: 'Qual é uma boa prática antes de editar uma foto importante?', opcoes: ['Apagar o original', 'Guardar uma cópia do original', 'Reduzir para o menor tamanho possível', 'Compartilhar publicamente'], correta: 1, explicacao: 'Manter o original permite voltar à imagem sem edição se necessário.' },
  ],
  7: [
    { pergunta: 'Qual informação deve ser conferida antes de compartilhar uma notícia?', opcoes: ['Somente o título', 'Fonte, data e contexto', 'Quantidade de curtidas', 'Cor da página'], correta: 1, explicacao: 'Fonte, data e contexto ajudam a avaliar se uma informação está sendo apresentada corretamente.' },
    { pergunta: 'O que é uma atitude responsável nas redes?', opcoes: ['Expor dados de terceiros', 'Atacar pessoas', 'Respeitar regras e denunciar conteúdo abusivo', 'Compartilhar boatos'], correta: 2, explicacao: 'Respeito, privacidade e uso das ferramentas de denúncia contribuem para uma convivência digital mais segura.' },
  ],
  8: [
    { pergunta: 'O que deve ser conferido antes de confirmar um Pix?', opcoes: ['Somente a cor do aplicativo', 'Destinatário, valor e dados da transação', 'Quantidade de contatos', 'Nome do celular'], correta: 1, explicacao: 'Conferir os dados antes de confirmar ajuda a evitar pagamentos para destinatários errados ou golpes.' },
    { pergunta: 'O que fazer ao receber uma cobrança inesperada?', opcoes: ['Pagar imediatamente', 'Confirmar a origem por um canal confiável', 'Enviar seus códigos', 'Compartilhar com todos'], correta: 1, explicacao: 'A confirmação por um canal confiável reduz o risco de cair em uma cobrança falsa.' },
  ],
  9: [
    { pergunta: 'Por que uma rotina de pausas pode ajudar nos estudos?', opcoes: ['Porque elimina a necessidade de estudar', 'Porque ajuda a organizar o esforço e a atenção', 'Porque substitui exercícios', 'Porque impede revisões'], correta: 1, explicacao: 'Pausas planejadas podem ajudar a manter atenção e tornar sessões de estudo mais sustentáveis.' },
    { pergunta: 'Qual sinal merece atenção durante o uso prolongado de telas?', opcoes: ['Desconforto visual', 'Uma bateria carregada', 'Um arquivo salvo', 'Uma pasta criada'], correta: 0, explicacao: 'Desconforto visual é um sinal para fazer uma pausa e ajustar condições de uso.' },
  ],
  10: [
    { pergunta: 'O que é armazenamento em nuvem?', opcoes: ['Guardar arquivos apenas no teclado', 'Guardar dados em servidores acessíveis pela internet', 'Excluir arquivos automaticamente', 'Usar somente um pendrive'], correta: 1, explicacao: 'Serviços em nuvem armazenam dados em servidores e permitem acesso conforme o serviço e as permissões.' },
    { pergunta: 'Por que fazer backup?', opcoes: ['Para aumentar o brilho', 'Para ter uma cópia caso o arquivo original seja perdido', 'Para trocar o idioma', 'Para bloquear o teclado'], correta: 1, explicacao: 'Backup é uma cópia de segurança que ajuda na recuperação de dados.' },
  ],
  11: [
    { pergunta: 'Qual dado é sensível para compartilhamento?', opcoes: ['Senha', 'Cor favorita', 'Nome de um jogo', 'Categoria de filme'], correta: 0, explicacao: 'Senhas e códigos de acesso devem permanecer secretos.' },
    { pergunta: 'Uma boa senha deve ser...', opcoes: ['Igual em todos os serviços', 'Fácil de adivinhar', 'Difícil de adivinhar e não reutilizada', 'Seu nome completo'], correta: 2, explicacao: 'Senhas únicas e difíceis de adivinhar reduzem o impacto de vazamentos e tentativas de acesso.' },
  ],
  12: [
    { pergunta: 'Qual é um exemplo de serviço público digital?', opcoes: ['Portal oficial de um órgão público', 'Um grupo aleatório de mensagens', 'Um anúncio sem identificação', 'Um arquivo desconhecido'], correta: 0, explicacao: 'Portais oficiais permitem acessar serviços e informações de órgãos públicos pela internet.' },
    { pergunta: 'Antes de informar dados em um serviço público, o que é importante?', opcoes: ['Conferir se está no canal oficial', 'Usar qualquer link recebido', 'Enviar a senha para outra pessoa', 'Desativar a proteção do aparelho'], correta: 0, explicacao: 'A conferência do endereço e do canal oficial ajuda a evitar páginas falsas.' },
  ],
  13: [
    { pergunta: 'Qual é uma vantagem de usar leitores digitais?', opcoes: ['Permitir recursos de leitura e ajuste de texto', 'Impedir qualquer busca', 'Apagar livros', 'Desativar acessibilidade'], correta: 0, explicacao: 'Leitores digitais podem oferecer tamanho de texto, busca e outros recursos úteis para leitura.' },
    { pergunta: 'Qual técnica ajuda a entender um texto?', opcoes: ['Ler sem objetivo', 'Identificar ideia principal e palavras-chave', 'Pular todas as partes', 'Não fazer perguntas'], correta: 1, explicacao: 'Identificar a ideia principal e palavras-chave ajuda a construir compreensão.' },
  ],
  14: [
    { pergunta: 'O que uma planilha organiza principalmente?', opcoes: ['Dados em linhas e colunas', 'Somente vídeos', 'Chamadas telefônicas', 'Senhas automaticamente'], correta: 0, explicacao: 'Planilhas organizam dados em células distribuídas por linhas e colunas.' },
    { pergunta: 'Para que serve uma fórmula em uma planilha?', opcoes: ['Calcular ou transformar dados', 'Trocar a bateria', 'Instalar aplicativos', 'Enviar mensagens'], correta: 0, explicacao: 'Fórmulas permitem realizar cálculos e operações com os dados da planilha.' },
  ],
  15: [
    { pergunta: 'O que é uma reunião por videoconferência?', opcoes: ['Uma reunião realizada por áudio e/ou vídeo pela internet', 'Um arquivo de texto', 'Um antivírus', 'Uma pasta local'], correta: 0, explicacao: 'Videoconferência permite que participantes se comuniquem remotamente por plataformas digitais.' },
    { pergunta: 'Qual prática ajuda em uma reunião online?', opcoes: ['Entrar sem testar áudio', 'Verificar câmera, microfone e conexão antes', 'Compartilhar tudo sem conferir', 'Interromper todos'], correta: 1, explicacao: 'Testar equipamentos antes reduz problemas durante a reunião.' },
  ],
  16: [
    { pergunta: 'Qual é uma prática básica de sustentabilidade digital?', opcoes: ['Trocar aparelhos sem necessidade', 'Cuidar e prolongar a vida útil dos dispositivos', 'Descartar eletrônicos no lixo comum', 'Comprar acessórios sem uso'], correta: 1, explicacao: 'Cuidar do equipamento e prolongar sua vida útil reduz consumo e descarte desnecessário.' },
    { pergunta: 'Onde eletrônicos devem ser descartados?', opcoes: ['Em qualquer lixeira', 'Em pontos de coleta apropriados', 'Na rua', 'No vaso sanitário'], correta: 1, explicacao: 'Resíduos eletrônicos devem ser encaminhados a pontos de coleta ou sistemas adequados.' },
  ],
  17: [
    { pergunta: 'Qual é uma característica de uma informação confiável?', opcoes: ['Não possui fonte', 'Pode ser verificada em fontes adequadas', 'É sempre viral', 'Tem muitos emojis'], correta: 1, explicacao: 'A possibilidade de verificar a informação e conhecer sua origem é importante para avaliar confiabilidade.' },
    { pergunta: 'O que fazer quando duas fontes apresentam informações diferentes?', opcoes: ['Escolher a mais chamativa', 'Comparar fontes, datas e evidências', 'Compartilhar as duas sem ler', 'Apagar as duas'], correta: 1, explicacao: 'Comparar fontes, contexto, data e evidências ajuda a compreender a divergência.' },
  ],
  18: [
    { pergunta: 'Como escrever um bom comando para um assistente?', opcoes: ['Sem contexto', 'Com objetivo, contexto e formato desejado', 'Somente com uma palavra', 'Com senha'], correta: 1, explicacao: 'Um comando claro informa o que você quer, fornece contexto e pode indicar o formato da resposta.' },
    { pergunta: 'Que tipo de informação deve ser evitada em comandos?', opcoes: ['Informações públicas sobre um tema', 'Senhas e códigos de autenticação', 'Um pedido de resumo', 'Uma lista de tarefas'], correta: 1, explicacao: 'Senhas e códigos de autenticação são dados privados e não devem ser compartilhados desnecessariamente.' },
  ],
  19: [
    { pergunta: 'Como transformar uma meta grande em algo executável?', opcoes: ['Ignorar a meta', 'Dividi-la em tarefas menores', 'Fazer tudo em um dia', 'Não acompanhar o progresso'], correta: 1, explicacao: 'Dividir uma meta em tarefas menores facilita o planejamento e o acompanhamento.' },
    { pergunta: 'Por que revisar conteúdos?', opcoes: ['Para acompanhar dificuldades e reforçar aprendizagem', 'Para evitar exercícios', 'Para apagar anotações', 'Para substituir o estudo'], correta: 0, explicacao: 'A revisão ajuda a identificar dificuldades e recuperar conhecimentos ao longo do tempo.' },
  ],
  20: [
    { pergunta: 'Qual gesto é básico em um tablet?', opcoes: ['Toque', 'Trocar a bateria pelo aplicativo', 'Formatar sempre', 'Desmontar a tela'], correta: 0, explicacao: 'Toque, deslize, pressionar e arrastar são gestos básicos de interação em telas sensíveis ao toque.' },
    { pergunta: 'O que deve ser verificado antes de instalar um aplicativo?', opcoes: ['Somente o ícone', 'Fonte, permissões e necessidade do aplicativo', 'Quantidade de cores', 'Nome do Wi-Fi'], correta: 1, explicacao: 'Verificar origem e permissões ajuda a instalar aplicativos com mais segurança.' },
  ],
}

const ICONES: Record<string, any> = {
  Base: 'computer', Segurança: 'shield', Produtividade: 'work-outline', Aplicativos: 'apps', Criatividade: 'photo-library', Comunicação: 'forum', Financeiro: 'payments', 'Bem-estar': 'favorite-border', Cidadania: 'account-balance', Leitura: 'menu-book', Tecnologia: 'auto-awesome', Aprendizado: 'school', Dispositivos: 'tablet',
}

export default function Cursos() {
  const [selecionado, setSelecionado] = useState<Curso | null>(null)
  const [aba, setAba] = useState<'conteudo' | 'atividades'>('conteudo')
  const [concluidas, setConcluidas] = useState<Record<number, number>>({})
  const [respostas, setRespostas] = useState<Record<string, number>>({})
  const [atividadesConcluidas, setAtividadesConcluidas] = useState<Record<string, boolean>>({})

  const progresso = useMemo(() => {
    if (!selecionado) return 0
    return Math.round(((concluidas[selecionado.id] || 0) / selecionado.aulas.length) * 100)
  }, [concluidas, selecionado])

  const abrirCurso = (item: Curso) => {
    setSelecionado({ ...item, perguntas: PERGUNTAS[item.id] ?? [] })
    setAba('conteudo')
  }

  const concluirProximaAula = () => {
    if (!selecionado) return
    const atual = concluidas[selecionado.id] || 0
    if (atual < selecionado.aulas.length) {
      setConcluidas((estado) => ({ ...estado, [selecionado.id]: atual + 1 }))
    }
  }

  const abrirVideo = async () => {
    if (!selecionado) return
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(selecionado.videoBusca)}`
    await Linking.openURL(url)
  }

  return (
    <SafeAreaView style={estilos.conteiner}>
      <Cabecalho titulo="Cursos" />
      <ScrollView contentContainerStyle={estilos.lista} showsVerticalScrollIndicator={false}>
        <View style={estilos.hero}>
          <Text style={estilos.rotulo}>APRENDIZADO DIGIWAY</Text>
          <Text style={estilos.titulo}>Aprenda fazendo</Text>
          <Text style={estilos.subtitulo}>Conteúdo prático, atividades e indicações de vídeos para transformar cada curso em uma experiência de aprendizagem.</Text>
        </View>

        {CURSOS.map((item) => {
          const feito = concluidas[item.id] || 0
          const percentual = Math.round((feito / item.aulas.length) * 100)
          return (
            <TouchableOpacity key={item.id} style={estilos.card} activeOpacity={0.84} onPress={() => abrirCurso(item)} accessibilityRole="button" accessibilityLabel={`Abrir curso ${item.titulo}`} accessibilityHint="Abre aulas, atividades, perguntas e vídeos do curso">
              <View style={estilos.icone}>
                <MaterialIcons name={ICONES[item.categoria]} size={27} color={Cores.secundariaBase} />
              </View>
              <View style={estilos.cardTexto}>
                <View style={estilos.tags}><Text style={estilos.categoria}>{item.categoria}</Text><Text style={estilos.nivel}>{item.nivel}</Text></View>
                <Text style={estilos.cardTitulo}>{item.titulo}</Text>
                <Text style={estilos.cardDescricao}>{item.descricao}</Text>
                <View style={estilos.progressoLinha}><View style={[estilos.progressoFill, { width: `${percentual}%` }]} /></View>
                <View style={estilos.rodape}>
                  <MaterialIcons name="play-lesson" size={14} color={Cores.secundariaBase} />
                  <Text style={estilos.cardMeta}>{feito}/{item.aulas.length} aulas</Text>
                  <MaterialIcons name="schedule" size={14} color={Cores.secundariaBase} />
                  <Text style={estilos.cardMeta}>{item.duracao}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={26} color={Cores.secundariaBase} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>

      <Modal transparent visible={!!selecionado} animationType="slide" onRequestClose={() => setSelecionado(null)}>
        <View style={estilos.overlay}>
          <View style={estilos.modal}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={estilos.modalConteudo}>
              <View style={estilos.modalTopo}>
                <View style={estilos.modalIcon}><MaterialIcons name={selecionado ? ICONES[selecionado.categoria] : 'school'} size={32} color={Cores.secundariaBase} /></View>
                <Pressable style={estilos.fechar} onPress={() => setSelecionado(null)} accessibilityRole="button" accessibilityLabel="Fechar curso"><MaterialIcons name="close" size={24} color={Cores.secundariaEscura} /></Pressable>
              </View>
              <Text style={estilos.modalCategoria}>{selecionado?.categoria} · {selecionado?.nivel}</Text>
              <Text style={estilos.modalTitulo}>{selecionado?.titulo}</Text>
              <Text style={estilos.modalTexto}>{selecionado?.objetivo}</Text>

              <View style={estilos.progressoBox}>
                <View style={estilos.progressoInfo}><Text style={estilos.progressoTitulo}>Seu progresso</Text><Text style={estilos.progressoPercentual}>{progresso}%</Text></View>
                <View style={estilos.progressoLinhaGrande}><View style={[estilos.progressoFill, { width: `${progresso}%` }]} /></View>
              </View>

              <View style={estilos.abas}>
                <Pressable onPress={() => setAba('conteudo')} style={[estilos.aba, aba === 'conteudo' && estilos.abaAtiva]} accessibilityRole="tab" accessibilityState={{ selected: aba === 'conteudo' }} accessibilityLabel="Aulas"><Text style={[estilos.abaTexto, aba === 'conteudo' && estilos.abaTextoAtivo]}>Aulas</Text></Pressable>
                <Pressable onPress={() => setAba('atividades')} style={[estilos.aba, aba === 'atividades' && estilos.abaAtiva]} accessibilityRole="tab" accessibilityState={{ selected: aba === 'atividades' }} accessibilityLabel="Atividades e perguntas"><Text style={[estilos.abaTexto, aba === 'atividades' && estilos.abaTextoAtivo]}>Atividades</Text></Pressable>
              </View>

              {aba === 'conteudo' && selecionado && (
                <View>
                  {selecionado.aulas.map((aula, index) => {
                    const concluida = index < (concluidas[selecionado.id] || 0)
                    return (
                      <View key={aula.titulo} style={estilos.aulaCard}>
                        <View style={[estilos.numeroAula, concluida && estilos.numeroAulaConcluida]}>
                          <Text style={estilos.numeroAulaTexto}>{concluida ? '✓' : index + 1}</Text>
                        </View>
                        <View style={estilos.aulaTexto}><Text style={estilos.aulaTitulo}>{aula.titulo}</Text><Text style={estilos.aulaConteudo}>{aula.conteudo}</Text></View>
                      </View>
                    )
                  })}
                  <Pressable style={estilos.botaoPrincipal} onPress={concluirProximaAula} accessibilityRole="button" accessibilityLabel="Marcar próxima aula como concluída">
                    <MaterialIcons name="check-circle-outline" size={21} color={Cores.secundariaEscura} />
                    <Text style={estilos.botaoPrincipalTexto}>{progresso === 100 ? 'Curso concluído' : 'Marcar próxima aula como concluída'}</Text>
                  </Pressable>
                </View>
              )}

              {aba === 'atividades' && selecionado && (
                <View>
                  {selecionado.atividades.map((atividade, index) => (
                    <Pressable key={atividade.titulo} style={[estilos.atividadeCard, atividadesConcluidas[`${selecionado.id}-${index}`] && estilos.atividadeConcluida]} onPress={() => setAtividadesConcluidas((estado) => ({ ...estado, [`${selecionado.id}-${index}`]: !estado[`${selecionado.id}-${index}`] }))} accessibilityRole="checkbox" accessibilityState={{ checked: Boolean(atividadesConcluidas[`${selecionado.id}-${index}`]) }} accessibilityLabel={`${atividade.titulo}. ${atividadesConcluidas[`${selecionado.id}-${index}`] ? 'Concluída' : 'Não concluída'}`}>
                      <View style={[estilos.atividadeIcon, atividadesConcluidas[`${selecionado.id}-${index}`] && estilos.atividadeIconConcluida]}><MaterialIcons name={atividadesConcluidas[`${selecionado.id}-${index}`] ? 'check' : 'assignment'} size={22} color={Cores.secundariaBase} /></View>
                      <View style={estilos.aulaTexto}><Text style={estilos.aulaTitulo}>{index + 1}. {atividade.titulo}</Text><Text style={estilos.aulaConteudo}>{atividade.instrucao}</Text><Text style={estilos.marcarAtividade}>{atividadesConcluidas[`${selecionado.id}-${index}`] ? 'Atividade concluída' : 'Toque para marcar como concluída'}</Text></View>
                    </Pressable>
                  ))}
                  <Text style={estilos.dica}>Dica: faça as atividades fora do aplicativo e use o espaço para praticar. O objetivo é transformar o conteúdo em uma habilidade real.</Text>
                </View>
              )}

              {aba === 'atividades' && selecionado && (
                <View style={estilos.quizBox}>
                  <View style={estilos.quizCabecalho}>
                    <MaterialIcons name="quiz" size={24} color={Cores.secundariaBase} />
                    <View style={{ flex: 1 }}><Text style={estilos.quizTitulo}>Teste seus conhecimentos</Text><Text style={estilos.quizSubtitulo}>Responda e confira a explicação de cada questão. {Object.entries(respostas).filter(([chave]) => chave.startsWith(`${selecionado.id}-`)).filter(([chave, valor]) => valor === selecionado.perguntas?.[Number(chave.split('-')[1])]?.correta).length}/{selecionado.perguntas?.length ?? 0} corretas.</Text></View>
                  </View>
                  {(selecionado.perguntas ?? []).map((q, qIndex) => {
                    const chave = `${selecionado.id}-${qIndex}`
                    const resposta = respostas[chave]
                    const respondeu = typeof resposta === 'number'
                    return <View key={chave} style={estilos.questao}>
                      <Text style={estilos.questaoNumero}>QUESTÃO {qIndex + 1}</Text>
                      <Text style={estilos.questaoTexto}>{q.pergunta}</Text>
                      {q.opcoes.map((opcao, opcaoIndex) => {
                        const selecionada = resposta === opcaoIndex
                        const correta = respondeu && q.correta === opcaoIndex
                        const errada = respondeu && selecionada && !correta
                        return <Pressable key={opcao} style={[estilos.opcaoQuiz, selecionada && estilos.opcaoSelecionada, correta && estilos.opcaoCorreta, errada && estilos.opcaoErrada]} onPress={() => setRespostas((estado) => ({ ...estado, [chave]: opcaoIndex }))} accessibilityRole="radio" accessibilityState={{ selected: selecionada }} accessibilityLabel={`Alternativa ${opcaoIndex + 1}: ${opcao}`}>
                          <View style={[estilos.radio, selecionada && estilos.radioSelecionado]}>{selecionada && <View style={estilos.radioPonto} />}</View>
                          <Text style={estilos.opcaoTexto}>{opcao}</Text>
                        </Pressable>
                      })}
                      {respondeu && <View style={[estilos.feedback, resposta === q.correta ? estilos.feedbackCerto : estilos.feedbackErro]}>
                        <MaterialIcons name={resposta === q.correta ? 'check-circle' : 'info'} size={20} color={resposta === q.correta ? '#16734A' : '#9A4A00'} />
                        <View style={{ flex: 1 }}><Text style={estilos.feedbackTitulo}>{resposta === q.correta ? 'Resposta correta!' : 'Quase lá!'}</Text><Text style={estilos.feedbackTexto}>{q.explicacao}</Text></View>
                      </View>}
                    </View>
                  })}
                </View>
              )}

              <Pressable style={estilos.videoBotao} onPress={abrirVideo} accessibilityRole="link" accessibilityLabel={`Abrir vídeos recomendados para ${selecionado?.titulo ?? 'este curso'}`}>
                <MaterialIcons name="play-circle-filled" size={24} color={Cores.branco} />
                <View style={{ flex: 1 }}><Text style={estilos.videoTitulo}>Vídeos recomendados</Text><Text style={estilos.videoTexto}>Abrir no YouTube uma seleção de vídeos sobre este tema</Text></View>
                <MaterialIcons name="open-in-new" size={19} color={Cores.branco} />
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  conteiner: { flex: 1, backgroundColor: Cores.terciariaFundo },
  lista: { padding: 16, paddingBottom: 35 },
  hero: { paddingHorizontal: 6, paddingTop: 8, paddingBottom: 20 },
  rotulo: { fontFamily: Fontes.logoSemiBold, fontSize: 11, letterSpacing: 1.5, color: Cores.secundariaBase, marginBottom: 7 },
  titulo: { fontFamily: Fontes.logo, fontSize: 28, lineHeight: 34, color: Cores.secundariaEscura },
  subtitulo: { fontFamily: Fontes.baseRegular, fontSize: 14, lineHeight: 21, color: Cores.secundariaBase, marginTop: 9 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Cores.branco, borderRadius: 18, padding: 14, marginBottom: 11, borderWidth: 1, borderColor: Cores.primariaBase },
  icone: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: Cores.primariaBase, marginRight: 12 },
  cardTexto: { flex: 1, marginRight: 7 },
  tags: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  categoria: { color: Cores.secundariaBase, backgroundColor: Cores.primariaClara, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8, fontFamily: Fontes.baseMedio, fontSize: 10 },
  nivel: { color: Cores.secundariaBase, backgroundColor: Cores.primariaBase, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 8, fontFamily: Fontes.baseMedio, fontSize: 10 },
  cardTitulo: { fontFamily: Fontes.logoSemiBold, fontSize: 15, color: Cores.secundariaEscura, marginBottom: 4 },
  cardDescricao: { fontFamily: Fontes.baseRegular, fontSize: 12, lineHeight: 18, color: Cores.textoSuave },
  progressoLinha: { height: 5, borderRadius: 4, backgroundColor: Cores.primariaClara, overflow: 'hidden', marginTop: 9 },
  progressoFill: { height: '100%', borderRadius: 4, backgroundColor: Cores.secundariaClara },
  rodape: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  cardMeta: { fontFamily: Fontes.baseMedio, fontSize: 11, color: Cores.secundariaBase, marginRight: 5 },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(26,15,46,0.55)' },
  modal: { maxHeight: '92%', backgroundColor: Cores.terciariaFundo, borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  modalConteudo: { padding: 24, paddingBottom: 38 },
  modalTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  modalIcon: { width: 60, height: 60, borderRadius: 16, backgroundColor: Cores.primariaBase, alignItems: 'center', justifyContent: 'center' },
  fechar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Cores.branco, alignItems: 'center', justifyContent: 'center' },
  modalCategoria: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, fontSize: 12, textTransform: 'uppercase', marginTop: 15 },
  modalTitulo: { fontFamily: Fontes.logo, color: Cores.secundariaEscura, fontSize: 25, lineHeight: 31, marginTop: 5 },
  modalTexto: { fontFamily: Fontes.baseRegular, color: Cores.secundariaBase, fontSize: 15, lineHeight: 23, marginTop: 10 },
  progressoBox: { backgroundColor: Cores.branco, borderRadius: 16, padding: 14, marginTop: 18, borderWidth: 1, borderColor: Cores.primariaBase },
  progressoInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 9 },
  progressoTitulo: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 13 },
  progressoPercentual: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, fontSize: 13 },
  progressoLinhaGrande: { height: 8, borderRadius: 6, backgroundColor: Cores.primariaClara, overflow: 'hidden' },
  abas: { flexDirection: 'row', backgroundColor: Cores.primariaClara, borderRadius: 14, padding: 4, marginTop: 18, marginBottom: 14 },
  aba: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 11 },
  abaAtiva: { backgroundColor: Cores.branco },
  abaTexto: { fontFamily: Fontes.baseMedio, color: Cores.textoSuave, fontSize: 13 },
  abaTextoAtivo: { color: Cores.secundariaEscura },
  aulaCard: { flexDirection: 'row', backgroundColor: Cores.branco, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Cores.primariaBase },
  numeroAula: { width: 34, height: 34, borderRadius: 17, backgroundColor: Cores.primariaBase, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  numeroAulaConcluida: { backgroundColor: Cores.primariaEscura },
  numeroAulaTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 13 },
  aulaTexto: { flex: 1 },
  aulaTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 14, marginBottom: 5 },
  aulaConteudo: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 13, lineHeight: 20 },
  botaoPrincipal: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, minHeight: 52, borderRadius: 26, backgroundColor: Cores.primariaEscura, paddingHorizontal: 15, marginTop: 6 },
  botaoPrincipalTexto: { fontFamily: Fontes.baseMedio, color: Cores.secundariaEscura, fontSize: 13, textAlign: 'center' },
  atividadeCard: { flexDirection: 'row', backgroundColor: Cores.branco, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Cores.primariaBase },
  atividadeIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: Cores.primariaClara, alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  quizBox: { marginTop: 10, padding: 14, borderRadius: 18, backgroundColor: Cores.primariaClara, borderWidth: 1, borderColor: Cores.primariaBase },
  quizCabecalho: { flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 14 },
  quizTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 16 },
  quizSubtitulo: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 11, lineHeight: 17, marginTop: 2 },
  questao: { backgroundColor: Cores.branco, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Cores.primariaBase },
  questaoNumero: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaBase, fontSize: 10, letterSpacing: 1.2, marginBottom: 7 },
  questaoTexto: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 14, lineHeight: 20, marginBottom: 10 },
  opcaoQuiz: { flexDirection: 'row', alignItems: 'center', gap: 9, minHeight: 48, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: Cores.primariaBase, marginTop: 7 },
  opcaoSelecionada: { borderColor: Cores.secundariaBase, backgroundColor: Cores.primariaClara },
  opcaoCorreta: { borderColor: '#2D8A62', backgroundColor: '#EAF8F1' },
  opcaoErrada: { borderColor: '#C56B26', backgroundColor: '#FFF3E7' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: Cores.textoSuave, alignItems: 'center', justifyContent: 'center' },
  radioSelecionado: { borderColor: Cores.secundariaBase },
  radioPonto: { width: 10, height: 10, borderRadius: 5, backgroundColor: Cores.secundariaBase },
  opcaoTexto: { flex: 1, fontFamily: Fontes.baseRegular, color: Cores.secundariaEscura, fontSize: 12, lineHeight: 18 },
  feedback: { flexDirection: 'row', gap: 8, padding: 10, borderRadius: 12, marginTop: 10 },
  feedbackCerto: { backgroundColor: '#EAF8F1' },
  feedbackErro: { backgroundColor: '#FFF3E7' },
  feedbackTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.secundariaEscura, fontSize: 12 },
  feedbackTexto: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 11, lineHeight: 17, marginTop: 2 },
  atividadeConcluida: { borderColor: '#2D8A62', backgroundColor: '#F2FBF6' },
  atividadeIconConcluida: { backgroundColor: '#D8F0E2' },
  marcarAtividade: { fontFamily: Fontes.baseMedio, color: Cores.secundariaBase, fontSize: 10, marginTop: 6 },
  dica: { fontFamily: Fontes.baseRegular, color: Cores.textoSuave, fontSize: 12, lineHeight: 18, marginTop: 5, marginBottom: 14 },
  videoBotao: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Cores.secundariaBase, borderRadius: 17, padding: 15, marginTop: 16 },
  videoTitulo: { fontFamily: Fontes.logoSemiBold, color: Cores.branco, fontSize: 14 },
  videoTexto: { fontFamily: Fontes.baseRegular, color: Cores.primariaClara, fontSize: 11, lineHeight: 16, marginTop: 2 },
})