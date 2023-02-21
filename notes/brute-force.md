# Brute Force

## Wordlists  

### Wordlist com base no site  
É possível gerar uma wordlist personalizada com base em palavras encontradas em um site específico. Utilize da seguinte forma:  

`cewl $RHOST -m 7 -w $SAIDA`

A flag **-m** indica qual o mínimo de caracteres e o **-w** é o arquivo de saída pra essa busca.

### Mutação em wordlist  
A mutação em wordlist é a técnica de gerar diversas variações das palavras já existentes na wordlist.
É possível utilizar o John The Ripper para realizar essa técnica de forma automatizada.  

`john --wordlist=$LISTA --rules --stdout > $SAIDA`  

É possível personalizar as regras da mutação utilizando RegEx. Para isso acesse o arquivo de configuração **/etc/john/john.conf**, procure pela sessão **Wordlist mode rules** e inclua o comando personalizado nessa sessão, por exemplo, **\$[@]\$[0-9]\$[0-9]**. A saída deve ser algo como **Exemplo@67**.

### Wordlist personalizadas  
Para gerar uma personalização mais específica, utilize a ferramenta **crunch** conforme exemplo:  

`crunch 10 10 -t exemplo^%% -o $SAIDA`

A saída no comando acima seria algo como **exemplo@52**. Os caracteres chaves para realizar as mutações são:
|||
|:--:|:--|
|**%**|Dígitos|
|**^**|Caracteres Especiais|
|**@**|Caracteres Minúsculos|
|**,**|Caracteres Maiúsculos|

### Key Space  
É um ataque que esgota todas as possibilidades de senha, muito útil quando o padrão utilizado é identificado. Por exemplo, para gerar todas as senhas possíveis de uma senha númerica de 6 dígitos:

`crunch 6 6 -f charset.lst numeric -o $SAIDA`

Existem diversas parametros prontos para serem utilizados pelo charset.lst, verifique todas disponíveis no arquivo
**usr/share/crunch/charset.lst**.  

## Ataques

### Hydra

O Hydra é uma ferramenta para realização de Brute Force em diversos protocolos. A utilização básica do Hydra é:

`hydra -v -l $USER -p $PASS $RHOST $PROTOCOL"`

Para utilizar uma lista de usuários ou senhas utilize a flag em letra maiúscula. Para uma lista de hosts, utilize a flag **-M** e indique o arquivo.

### Reverse Brute Force  
É a técnica de tentar descobrir o usuário com uma senha válida, isso porque muitas vezes a aplicação possui rate limit no campo de senha, mas não no usuário.

###  Low Hangin Fruit  
É buscar por falhas mais simples, como a reutilização de senha em outros serviços. Uma técnica é utilizar credenciais encontradas durante as buscas em outros hosts, por exemplo:  

`hydra -v -l root -p root 192.168.0.0/24 ssh`

## Dicas do Hydra  
Flags importantes para utilização:

**-s**: Define qual a porta do host
**-t**: Aumentar o número de tarefas simultâneas (Padrão: 16)
**-W**: Define o tempo entre as requisições