# Notas
Comandos basicos 
```
kubectl get nodes

kubectl get pods -A
kubectl get pods  

kubectl create namespaces
kubectl delete namespaces  
kubectl get namespaces
```

Generalmente los pods se crean atraves de un objeto llamado deployment "es decir no tenemos que crear los pods por nuestra cuenta"


Iniciamos nuestra aplicacion - Create deployment / start application
```
kubectl create deployment hello-kunjo --image=docker.io/nginx:1.23
```

Exponemos nuestra aplicacion - se hace atraves de servicios para que puedan acceder a mi app 
```
kubectl expose deployment hello-kunjo --type=ClusterIP --port=80 #Privado. Solo se accede dentro del cluster
kubectl expose deployment hello-kunjo --type=LoadBalancer --port=80 #Publico. Puede ser accedido fuera del cluster

```
forward service
```
kubectl port-forward service/hello-kunjo 7000:80 -n namespace_name  
```
delete service

```
kubectl delete service hello-kunjo
```

```
Crear un pod de forma declarativa atraves de un yml

```
kubectl apply -f my_file_path.yml
```




