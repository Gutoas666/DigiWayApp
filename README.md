# DigiWay — Aplicação Mobile

Aplicação React Native + Expo Router do DigiWay, compartilhando autenticação Firebase com a aplicação Web. A interface Mobile reproduz a identidade visual da Web, adaptando espaçamentos, navegação e componentes para telas pequenas.

## Requisitos do TCC atendidos

- TypeScript e tipos/interfaces para entidades e props.
- Expo Router para navegação.
- StyleSheet para estilização.
- Paleta de cores centralizada em `src/constants/Cores.ts`, alinhada à Web.
- Fontes locais centralizadas em `src/constants/Fontes.ts`.
- Ícones por `@expo/vector-icons/MaterialIcons`, com a fonte MaterialIcons pré-carregada na inicialização para evitar quadrados/ícones ausentes no primeiro render. Essa camada é baseada em react-native-vector-icons e é compatível com o Expo SDK 51 utilizado pelo projeto.
- Firebase Authentication com e-mail e senha.
- Proteção do grupo autenticado.
- Logout.
- Telas Inicial, Cursos, Perfil e Sobre.

## Identidade visual

A paleta foi alinhada aos valores declarados pela Web: `#F0F4FF`, `#D6E4FF`, `#A8CAFF`, `#5C2E7C`, `#3D1B54`, `#1A0F2E`, `#E63946` e `#FAFBFF`.

Os assets da Web foram incorporados em `assets/images/web/`, incluindo logo, imagem de estudo e fotos da equipe.

## Execução

```bash
npm install
cp .env.example .env.development
# preencha as variáveis do Firebase
npx expo start
```

Para uma build Android, configure o ambiente Expo/EAS e execute o fluxo de build correspondente.

## Estrutura

- `src/app/` — rotas e telas
- `src/components/` — componentes reutilizáveis
- `src/constants/` — cores e tipografia
- `src/context/` — estado de autenticação
- `src/hooks/` — autenticação
- `src/services/` — Firebase
- `src/types/` — entidades TypeScript
- `assets/images/web/` — assets visuais reutilizados da Web

## Observação sobre fontes

O ZIP da aplicação Web declara Figtree e Aldrich no CSS, mas não contém os arquivos TTF dessas famílias. Por isso o Mobile mantém fontes locais Inter/Sora já presentes no projeto. Para uma correspondência tipográfica literal, basta adicionar os TTF oficiais da Web e atualizar `Fontes.ts`.

## Área de aprendizagem

A tela **Cursos** contém 20 trilhas com conteúdo educativo estruturado. Cada curso apresenta:
- objetivo de aprendizagem;
- três aulas com conteúdo explicativo;
- duas atividades práticas;
- acompanhamento de progresso das aulas;
- indicação de vídeos relacionados ao tema no YouTube;
- categorias e níveis de dificuldade.

Os vídeos são abertos externamente somente quando o aluno escolhe assistir.

## Recursos educativos e acessibilidade
- Cada curso possui aulas explicativas, atividades práticas, quiz com alternativas, feedback e explicação das respostas.
- Há indicação de vídeos por tema, aberta externamente quando o aluno solicitar.
- O app possui painel de acessibilidade com tamanho de texto, alto contraste e redução de movimento.
- Os principais controles possuem rótulos, funções e estados para leitores de tela (TalkBack/VoiceOver).
- As preferências de acessibilidade são persistidas localmente no aparelho.
