# Dockerfile del backend
FROM node:20

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala el cliente de PostgreSQL y netcat-openbsd
RUN apt-get update && \
    apt-get install -y postgresql-client netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia los archivos necesarios
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

#Corriendo prisma generate
RUN npx prisma generate

# Copia el resto de la aplicación
COPY . .

# Copia el script de espera
COPY wait-for-postgres.sh ./

# Da permisos de ejecución al script
RUN chmod +x wait-for-postgres.sh

# Usa el script de espera antes de iniciar tu aplicación
CMD ["./wait-for-postgres.sh", "node", "dist/main"]
