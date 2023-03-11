# Pivoting  
É uma técnica para se conectar em uma rede interna através de uma máquina intermediária.

Para verificar se a máquina possui comunicação com redes internas utilize `ifconfig` e também verifique as rotas com o comando `route`. 

## Explorando uma rota

### meterpreter  

Conectando em uma rota interna
```
run autoroute -s $IPROUTE
```  

Deixe a sessão em `background` e use o módulo `auxiliary/server/socks4a` para iniciar um servidor proxy e conectar com a rede estabelecida na rota anterior. Faça a configuração da porta e inicie o módulo com `run`.  

Vamos fazer a edição das configurações do Proxychains com `nano /etc/proxychains` e em **ProxyList** adicione a porta aberta com o **scks4a**.  
Agora temos a comunicação com a rede interna, podemos mapear a rede interna afim de descobrir hosts com srrviços ativos.  
```
proxychains nmap -v --open -sS -Pn $IP/24
```  

Após a identificação dos serviços na rede interna, utilize o tunelamento para se comunicar com os serviços da mpaquina na rede interna.  

