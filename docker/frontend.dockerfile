FROM node:18
RUN mkdir -p /opt/support-chat && chown -R node:node /opt/support-chat
WORKDIR /opt/support-chat
USER node
COPY --chown=node:node ./ ./
COPY --chown=node:node package.json tsconfig.json yarn.lock ./
RUN yarn install --frozen-lockfile
ENTRYPOINT  ["yarn"]
CMD [ "support-chat-frontend" ]
