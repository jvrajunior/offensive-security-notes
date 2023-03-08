# Informações Importantes

## MySQL

Iniciar um serviço de banco de dados
`service mysql start`

Logar no banco de dados
`mysql -u root`

### Comandos MySQL

Visualizar database
`select database();`

Visualizar usuário
`select user();`

Visualizar versao da BD.
`select version();`

Criar banco de dados:
`CREATE DATABASE desec;`

Usar uma database
`use desec;`

Exibir tabelas
`show tables;`

Criar tabela com 3 colunas
`create table usuarios (id int primary key auto_increment, login varchar(20) not null, senha varchar(20) not null);`

Detalhes da tabela
`describe usuarios`

Consulta de dados
`select * from usuarios where id="1";`

Inserir dados na tabela
`insert into usuario values ('1','admin','admin');`

Deletar dados
`delete from usuarios where id="1"`

### Avançados

Incluindo usuário no banco de dados através do arquivo mysql
`create user joao identified by '123';`

Descobrindo os nomes das tabelas através do information_schema
`select * from schemata;`

Listar todas os bancos e as tabelas através do information_schema
`select table_schema, tabela_name from tables;`

Listar todas as tabelas de uma base de dados
`select table_name from tables where table_schema='desec';`

Listar todas as colunas de uma base de dados
`select column_name from columns where table_schema='desec';`

Concatenar valores de várias colunas em uma só
`select concat(login,':',senha) from usuarios;`

Carregar arquivo do servidor
`select load_file('/etc/passwd');`

Função sleep
`select sleep(10);`

Conversão da tabela ASCII
`select char(65);`

Descobrir o tamanho de um dado
`select lenght("desec");`

Retornar um range de caracteres
`select substring("desec",1,1);`

Excluir uma base de dados
`drop database teste;`

Limitar resultado a 1 linha
`select * from usuarios limit 1`










