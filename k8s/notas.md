Kubernetes tiene objeto deployment, pods and services

Generalmente los pods se crean atraves de un objeto llamado deployment "es decir no tenemos que crear los pods por nuestra cuenta

Regularmente no se crean los pods manualmente porque podria llegar a complicar la escalabilidad, el tener 1000 pods y ver configurar manual cada uno

El objecto deployment nos permite definir la cantidad de pods que deseo utilizar para mi imagen


con los servicios es como expongo mis pods 

2 tipos de servicios LoadBalancer (publico), ClusterIP(privado)


