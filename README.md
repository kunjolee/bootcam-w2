# RUN

## DATABASE
```bash
# Run postgres
    # -p 5433:5432 \
    docker run \
    -p 5432:5432 \
    -e POSTGRES_PASSWORD=mysecretpassword \
    -e POSTGRES_USER=testdocker \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v PGDISCO:/var/lib/postgresql/data \
    -v $(pwd)/db:/docker-entrypoint-initdb.d \
    -d postgres:14.6  
```
## BACKEND
<!-- -e JWT_PRIVATE_KEY=THIS_IS_MY_PRIVATE_KEY_08@D3@5_112328FDDY3J2KFHDH???@$$ \ -->
```bash  
# Dev purposes
    docker run \
    -v $(pwd)/bank-backend:/code \
    -e APP_PORT=8001 \
    -e DB_NAME=testdocker \
    -e USER_NAME=testdocker \
    -e DB_PASSWORD=mysecretpassword \
    -e HOST=172.17.0.2 \
    -e DB_PORT=5432 \
    -w /code \
    -p 8001:8001 \
    --rm -it node:16-buster "/bin/bash"

# Build
    docker build -t backend:1.0.0 bank-backend
    docker build --no-cache -t backend:1.0.0 bank-backend

# RUN
    docker run -e HOST=172.17.0.3 -d -p 8001:8001 backend:1.0.0

```
## FRONTEND
<!-- -e JWT_PRIVATE_KEY=THIS_IS_MY_PRIVATE_KEY_08@D3@5_112328FDDY3J2KFHDH???@$$ \ -->
```bash  
# Dev purposes
    docker run \
    -v $(pwd)/bank-frontend:/code \
    -e VITE_API_URL=http://localhost:8001
    -w /code \
    -p 5173:5173 \
    --rm -it node:16-buster-slim "/bin/bash"

# Build
    docker build -t frontend:1.0.0-alpine bank-frontend
# RUN
    docker run -d -p 4173:80 frontend:1.0.0-alpine
```

