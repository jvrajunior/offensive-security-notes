# Local File Inclusion (LFI)

A vulnerabilidade de LFI ocorre quando a aplicação utiliza o valor de um parametro para inclui-la na página sem a devida validação. É possível controlar o parâmetro e utilizar a vulnerabilidade de FPD para visualizar arquivos do servidor.

`http://www.alvo.com.br/info.php?p=/../../../../etc/passwd`