# ONG Esperança - Plataforma Web

## Descrição

Plataforma web completa e profissional para ONGs gerenciarem suas atividades, divulgar projetos, captar recursos e engajar voluntários. Desenvolvida como projeto acadêmico aplicando conceitos de HTML5, CSS3 e JavaScript.

## Funcionalidades

### Páginas Principais
- **Página Inicial (index.html)**: Apresentação da ONG, missão, visão, valores e informações de contato
- **Projetos (projetos.html)**: Catálogo de projetos sociais, oportunidades de voluntariado e sistema de doações
- **Cadastro (cadastro.html)**: Formulário completo para cadastro de voluntários

### Características Técnicas
- ✅ Estrutura HTML5 semântica
- ✅ Design responsivo (mobile-first)
- ✅ Validação de formulários com JavaScript
- ✅ Máscaras de input para CPF, telefone e CEP
- ✅ Acessibilidade (WCAG 2.1)
- ✅ Otimização de performance
- ✅ SEO otimizado

## Estrutura do Projeto

```
front-end-esperanca/
├── index.html              # Página inicial
├── projetos.html           # Página de projetos
├── cadastro.html           # Página de cadastro
│   ├── css/
│   │   └── style.css       # Estilos principais
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/             # Imagens otimizadas
└── README.md               # Este arquivo
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica, formulários avançados, elementos multimídia
- **CSS3**: Flexbox, Grid, variáveis CSS, animações, responsividade
- **JavaScript**: Validações, máscaras, interatividade, acessibilidade
- **Fonts**: Google Fonts (Inter)

## Como Usar

1. Clone ou baixe o repositório
2. Abra o arquivo `index.html` em um navegador web
3. Navegue pelas páginas usando o menu de navegação
4. Teste o formulário de cadastro com validações
5. Explore o sistema de doações na página de projetos

## Validações Implementadas

### Formulário de Cadastro
- **Nome Completo**: Mínimo 2 caracteres
- **E-mail**: Formato válido
- **CPF**: Validação de dígitos verificadores
- **Telefone**: Formato (XX) XXXXX-XXXX
- **Data de Nascimento**: Idade entre 16 e 100 anos
- **CEP**: Formato XXXXX-XXX
- **Motivação**: Mínimo 20 caracteres
- **Áreas de Interesse**: Pelo menos uma selecionada
- **Termos**: Obrigatório aceitar

### Máscaras de Input
- CPF: 000.000.000-00
- Telefone: (00) 00000-0000
- CEP: 00000-000

## Responsividade

O site é totalmente responsivo com breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Acessibilidade

- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado de cores
- Textos alternativos em imagens
- Estrutura semântica adequada

## Performance

- Imagens otimizadas
- CSS minificado
- JavaScript otimizado
- Carregamento assíncrono de recursos
- Lazy loading implementado
