FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY /frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app/backend
COPY /backend/package*.json ./
RUN npm install --omit=dev
COPY backend/ ./
COPY --from=frontend-build /app/frontend/build ../frontend/build
RUN mkdir -p /app/database
EXPOSE 5000
CMD ["node", "index.js"]
