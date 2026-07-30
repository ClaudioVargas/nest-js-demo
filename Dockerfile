# --- ETAPA 1: Construcción (Build) ---
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies)
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto NestJS
RUN npm run build

# Eliminar dependencias de desarrollo para dejar solo las de producción
RUN npm prune --production


# --- ETAPA 2: Ejecución (Production) ---
FROM node:20-alpine AS runner

# Definir variable de entorno para producción
ENV NODE_ENV=production

WORKDIR /usr/src/app

# Copiar el código compilado y las dependencias de producción desde la etapa builder
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Exponer el puerto por defecto de NestJS
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
