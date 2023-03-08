# SSH

## Gerar chave e logar no serviço

Primeiro passo é gerar o par de chaves:  
```
ssh-keygen -f $KEY_NAME
```

Na máquina alvo, crie a estrutura que irá validar as chaves de SSH. pasta do usuário, pasta do ssh e arquivo de autorização.  
```
/home/$USER/.ssh/authorized_keys
```
Dentro de authorized_keys copie a chave publica gerada no primeiro passo.
```
echo "$PUB_KEY" > /home/$USER/.ssh/authorized_keys
```

Realize a conexão via SSH utilizando a chave gerada.
```
ssh $USER@$RHOST -p $RPORT -i $PRIV_KEY
```