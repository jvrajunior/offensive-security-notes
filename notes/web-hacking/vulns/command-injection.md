# Command Injetion
O CMD Injection aproveita de aplicações que utilizam comandos de OS no servidor e não validam corretamente os dados. É possível concatenar comandos utilizando `;` ou `|` por exemplo.

`hhtp://www.alvo.com.br/index.php?p=valor;id#`

## Ferramentas

### commix

Realizar analise do parâmetro via POST
`commix --url hhtp://www.alvo.com.br --data="p=valor"`