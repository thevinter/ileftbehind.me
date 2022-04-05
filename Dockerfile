FROM node:16-slim
ENV PORT 3123
EXPOSE 3123
WORKDIR /usr/src/app
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
