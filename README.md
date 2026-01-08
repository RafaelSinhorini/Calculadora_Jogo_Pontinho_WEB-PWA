
CALCULADORA PONTINHO WEB (PWA)

Aplicação web desenvolvida como Progressive Web App (PWA) para auxiliar na contagem de pontos do jogo de cartas Pontinho.
O projeto foi reestruturado para funcionar como um sistema web moderno, com suporte à instalação em dispositivos móveis e uso offline.

A aplicação pode ser acessada diretamente pelo navegador ou instalada como aplicativo em smartphones e desktops compatíveis, mantendo uma experiência próxima a um app nativo.

Tecnologias Utilizadas

React
TypeScript
Vite
Tailwind CSS
Progressive Web App (Service Worker e Web Manifest)

Funcionalidades

Contagem de pontos para partidas com 2 a 12 jogadores
Cálculo automático da regra de estouro ao ultrapassar 100 pontos
Interface responsiva e otimizada para dispositivos móveis
Funcionamento offline após a primeira carga
Possibilidade de instalação como aplicativo (PWA)
Interface limpa e intuitiva com identidade visual inspirada em mesas de jogo

Lógica do Jogo

Estouro: quando um jogador ultrapassa 100 pontos, sua pontuação retorna para a maior pontuação válida entre os demais jogadores

Finalização: o jogo é encerrado quando resta apenas um jogador com pontuação inferior a 100 pontos

Execução do Projeto em Ambiente Local

Clone este repositório

Instale as dependências do projeto:

npm install


Inicie o servidor de desenvolvimento:

npm run dev


Acesse a aplicação pelo navegador no endereço informado no terminal

Build para Produção

Para gerar a versão final do projeto:

npm run build


Os arquivos gerados estarão na pasta dist, prontos para deploy em serviços de hospedagem como Netlify, Vercel ou servidores estáticos.

Deploy

O projeto é compatível com qualquer hospedagem de sites estáticos.
Para produção, recomenda-se hospedar o conteúdo da pasta dist.

Desenvolvido por Rafa Sinhorini
