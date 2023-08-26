FROM --platform=linux/amd64 node:18.10.0-alpine as build

WORKDIR /app

# Prepare build deps ( ignore postinstall scripts for now )
COPY . .
RUN npm i pnpm -g

# Run full install with every postinstall script ( This needs project file )
RUN pnpm i --ignore-scripts
RUN npx prisma generate
RUN pnpm run build

COPY pnpm-lock.yaml ./
COPY prisma ./prisma/

FROM build as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist

EXPOSE 7500

CMD ["npm", "run", "prod"]
