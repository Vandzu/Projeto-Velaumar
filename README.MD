Nome da equipe: Velaumar Ecotech
Nome dos integrantes: Francisco Gabriel, Maria Gabriela, Vanderson Lima, Thays Lunes, João Victor Martins

Descrição do projeto:
O site a ser desenvolvido para a ONG Velaumar visa incorporar a sua visibilidade no meio digital, de uma forma que os Administradores da página terão controle para gerenciar as ações sociais, eventos, notícias, doações e documentos produzidos pela ong. Além de trazer para o usuário um ambiente que contenha a personalidade da instituição, sensibilizando-o a poder contribuir de alguma maneira para que mais pessoas sejam alcançadas por suas ações.


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

![image](https://user-images.githubusercontent.com/65266125/230937329-f4684584-0bce-42cf-9feb-38d20fa1529c.png)
![image](https://user-images.githubusercontent.com/65266125/230937949-94754766-a62c-48fe-98e2-af5cefab0f21.png)
![image](https://user-images.githubusercontent.com/65266125/230938151-06a32b25-cce4-4a4c-9b49-0c5ee6eca4fb.png)
![image](https://user-images.githubusercontent.com/65266125/230938385-50e5f225-3934-48fe-a107-0a07d6aa282a.png)
![image](https://user-images.githubusercontent.com/65266125/230938533-9035848b-cd6d-4e02-bd5a-fbd949120a90.png)

Página Inicial

![image](https://user-images.githubusercontent.com/65266125/230938728-eeb4b4dd-4550-438a-b97e-eb6df3bd65f9.png)
Tela de listagem das ações sociais

![image](https://user-images.githubusercontent.com/65266125/230938803-a779bf44-c0c8-47f8-8fbd-27b13cd6c6b0.png)
Tela de confirmação de particiação na ação social

![image](https://user-images.githubusercontent.com/65266125/230938980-48603047-f246-4a56-b688-c9cc8c70a0a2.png)
Tela ao clicar no botão de confirmar participação

![image](https://user-images.githubusercontent.com/65266125/230939425-dc0c0751-b494-403f-88ff-a10a2ecf57ba.png)
Tela de listagem de doações

![image](https://user-images.githubusercontent.com/65266125/230939549-3d50c651-2877-4fb3-91fe-3533280dbff0.png)
Tela ao clicar em avançar com item da doação

![image](https://user-images.githubusercontent.com/65266125/230939726-10ec327b-3566-4b61-9fe1-08672a60277c.png)
Tela ao clicar em confirmar doação

![image](https://user-images.githubusercontent.com/65266125/230939851-174084f9-9ad8-43f1-a9a9-95280acff651.png)
Tela de repositório de documentos e arquivos

![image](https://user-images.githubusercontent.com/65266125/230939977-f3d302bd-0526-4ba7-8ae5-a88782b84ab7.png)
Tela ao clicar em abrir o arquivo/documento

![image](https://user-images.githubusercontent.com/65266125/230940113-58ae93e3-27c8-432a-b3f1-010e087224ba.png)
Tela de listagem de notícias

![image](https://user-images.githubusercontent.com/65266125/230940266-2ad1cdd5-aac8-4b6c-b014-c48c7646ee22.png)
Tela de notícia selecionada

![image](https://user-images.githubusercontent.com/65266125/230940419-b7d82d48-6250-427a-9f4b-088d7b3704de.png)
Tela de agenda

![image](https://user-images.githubusercontent.com/65266125/230940624-747bb69a-495f-4dc2-adf0-6a142615b68e.png)
![image](https://user-images.githubusercontent.com/65266125/230940764-87b9e868-7cc1-4304-a48b-cf63bd3b3afd.png)
Tela de sobre

![image](https://user-images.githubusercontent.com/65266125/230940876-f204ee5a-9277-4bc1-9d8f-5842409c2ff7.png)
![image](https://user-images.githubusercontent.com/65266125/230940944-7681e11d-5550-403e-a3c4-6345f33e759e.png)
Tela de login admin

![image](https://user-images.githubusercontent.com/65266125/230941103-60ab7abc-0727-4d1a-8cc5-29aba66009b7.png)
Tela de administração do repositório

![image](https://user-images.githubusercontent.com/65266125/230941251-1e95bdc5-ab26-4c1c-b140-2242e4e6f199.png)
![image](https://user-images.githubusercontent.com/65266125/230941336-93243539-d575-4708-9067-eb3dc08346cf.png)
![image](https://user-images.githubusercontent.com/65266125/230941385-ded6e934-d719-4d6a-97e7-e9ba443c2cf6.png)
Tela de administração de ações sociais

![image](https://user-images.githubusercontent.com/65266125/230941600-aa6e7b0d-cfbb-4e60-be4b-3b85adcd1f5e.png)
![image](https://user-images.githubusercontent.com/65266125/230941803-8b718d80-49e4-48e0-b20a-2f9b363a6fc3.png)
![image](https://user-images.githubusercontent.com/65266125/230941873-87c2db94-632d-4e43-b533-6c76856ad25f.png)
Tela de administração das notícias

![image](https://user-images.githubusercontent.com/65266125/230941967-eaa86d90-a6fc-4dbf-bcf7-989e777b2b7d.png)
![image](https://user-images.githubusercontent.com/65266125/230941997-529f8678-b0ef-485e-9d0f-6c63517a03f8.png)
Tela de administração das doações
