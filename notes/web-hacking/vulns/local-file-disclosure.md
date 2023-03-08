# Local File Disclosure (LFD)  
Essa falha ocorre explorando a funcionalidade de baixar algum arquivo através da aplicação. Quando a aplicação está vulnerável à LFD, é possível baixar arquivos locais do servidor manipulando o valor do parâmetro que indica qual recurso será feito download. 

`http://www.alvo.com.br/download.php?arquivo=download.php`