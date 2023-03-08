# Escalação de Privilégio Windows

## Ferramentas

### Enumeração  
- **WinPEAS**
- **WindowsPivCheck**

### Pesquisa por vulnerabilidades
**Windows Exploit Suggester (WES-NG)**
Gere um arquivo systeminfo com os dados do alvo:
`systeminfo > systeminfo.txt`  
Coloque o systeminfo na raiz do script e busque por vulnerabilidades com exploits disponíveis:  
`python3 wes.py -e systeminfo.txt`

## Comandos básicos para enumeração    
Busca por arquivos em todos os diretórios  
`where /R c:\ $FILE`  

Busca por strings em todos os diretórios  
`findstr /s "$STRING" *.txt`  

Filtrar saídas concatenando comandos
`findstr /C:"$STRING"`  

Detalhe de todos usuários
`net user`  

Detalhes do usuário  
`net user $USER`  

Nome do host  
`hostname`  

Informações do sistema  
`systeminfo`  

Visualizar processos em execução  
`tasklist`  

Visualizar o serviço associado ao processo  
`tasklist /SVC`  

Visualizar hosts que a máquina se comunica internamente  
`arp -a`  

Tabela de roteamento  
`route print`  

Visualizar portas abertas  
`netstat -ano`  

Ver informações de um serviço específico
`sc query $SERVICE`

Visualizar status do Firewall  
`netsh advfirewall show currentprofile`