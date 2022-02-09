Nome da equipe: Velaumar Ecotech
Nome dos integrantes: Francisco Gabriel, Maria Gabriela, Vanderson Lima, Thays Lunes, João Victor Martins

Descrição do projeto:
O site a ser desenvolvido para a ONG Velaumar visa incorporar a sua visibilidade no meio digital, de uma forma que os Administradores da página terão controle para gerenciar as ações sociais, eventos, notícias, doações e documentos produzidos pela ong. Além de trazer para o usuário um ambiente que contenha a personalidade da instituição, sensibilizando-o a poder contribuir de alguma maneira para que mais pessoas sejam alcançadas por suas ações.

Obs: o arquivo executável(.exe) está localizado dentro da pasta bin. Após executar o arquivo, para acessar a aplicação basta abrir o navegador, digita 'localhost:3000' e pressionar enter.


Requisito Funcional | Descrição | Codificação
--- | --- | --- 
Cód. RF0001 | Mostrar página inicial de apresentação e localização da ONG  | Arquivo "views/index.ejs" - Linha 1 a 249
Cód. RF0002 | Preencher formulário para contato | Arquivo "views/contato.ejs" - Linha 1 a 91
Cód. RF0003 | Validar formulário para contato | Arquivo "routes/contato.js" - Linha 8 a 34
Cód. RF0004 | Enviar formulário para contato | Arquivo "routes/contato.js" - Linha 25 a 31
Cód. RF0005 | Mostrar página de docs produzidos pela ONG | Arquivo "views/docs.ejs" - Linha 1 a 138
Cód. RF0006 | Baixar documento | Arquivo "public/src/controller/DocsUserController.js" - Linha 536 a 557
Cód. RF0007 | Visualizar documento | Arquivo "public/src/controller/DocsUserController.js" - Linha 577 a 658
Cód. RF0008 | Copiar link para compartilhamento | Arquivo "public/src/controller/DocsUserController.js" - Linha 661 a 665
Cód. RF0009 | Mostrar página de voluntariado | Arquivo "views/acoes.ejs" - Linha 1 a 65
Cód. RF0010 | Validar voluntariado | Arquivo "public/src/controller/AcoesController.js" - Linha 32 a 50
Cód. RF0011 | Cancelar voluntariado | NÃO INICIADO
Cód. RF0012 | Mostrar página de doação de produtos | Arquivo "views/doacoes.ejs" - Linha 1 a 67
Cód. RF0013 | Validar realização de doação | Arquivo "public/src/controller/DoacoesController.js" - Linha 50 a 66
Cód. RF0014 | Realizar cadastro na aplicação | NÃO INICIADO
Cód. RF0015 | Mostrar página de notícias | Arquivo "views/noticias.ejs" - Linha 1 a 43
Cód. RF0016 | Comentar notícia | NÃO INICIADO
Cód. RF0017 | Mostrar ambiente de edição de documentos do repositório | Arquivo "views/adminDocs.ejs" - Linha 1 a 177
Cód. RF0018 | Inserir elemento (pdf ou link) no ambiente de edição de documentos | Arquivo "public/src/controller/ArchivesController.ejs" - Linha 300 a 545
Cód. RF0019 | Remover elemento do ambiente. | Arquivo "public/src/controller/ArchivesController.js" - Linha 150 a 166 / 129 a 132 / 93 a 127
Cód. RF0020 | Renomear elemento | Arquivo "public/src/controller/ArchivesController.js" - Linha 238 a 269
Cód. RF0021 | Inserir diretório para elementos. | Arquivo "public/src/controller/ArchivesController.js" - Linha 119 a 129
Cód. RF0022 | Mostrar ações sociais do voluntariado  | Arquivo "views/acoes.ejs" - Linha 1 a 65
Cód. RF0023 | Selecionar ação ativa  | Arquivo "public/src/controller/AdminAcoesController.js" - Linha 49 a 82
Cód. RF0024 | Cancelar da ação  | Arquivo "public/src/controller/AdminAcoesController.js" - Linha 166 a 212
Cód. RF0025 | Mostrar quem se candidatou como voluntário  | NÃO INICIADO
Cód. RF0026 | Mostrar produtos disponíveis para doação   | Arquivo "views/doacoes.ejs" - Linha 1 a 67
Cód. RF0027 | Inserir novo produto | Arquivo "public/src/controller/AdminDoacoesController.js" - Linha 201 a 252
Cód. RF0028 | Remover produto | Arquivo "public/src/controller/AdminDoacoesController.js" - Linha 178 a 199
Cód. RF0029 | Mostrar ambiente com as notícias da ONG  | Arquivo "views/adminNoticias.ejs" - Linha 1 a 150
Cód. RF0030 | Escrever nova notícia  | Arquivo "public/src/controller/AdminNoticiasController.js" - Linha 41 a 171
Cód. RF0031 | Remover notícia  | Arquivo "public/src/controller/AdminNoticiasController.js" - Linha 199 a 228
Cód. RF0032 | Remover comentário ofensivo  | NÃO INICIADO
Cód. RF0033 | Mostrar o calendário  | Arquivo "views/events.ejs" - Linha 1 a 34
Cód. RF0034 | Marcar com cor verde dias com ações sociais próximas  | NÃO INICIADO