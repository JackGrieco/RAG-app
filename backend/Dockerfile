FROM node:20-alpine
#Imposta la directory dove verranno copiati tutti i file nel container
WORKDIR /app
#Copia i file package.json e package-lock.json nel container
COPY package*.json ./
#Installa le dipendenze
RUN npm install
#Copia il resto dei file nel container
COPY . .
#Espone la porta 3000
CMD ["npm", "run", "dev"]