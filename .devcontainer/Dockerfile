# syntax=docker/dockerfile:experimental

ARG NODE_VERSION=20.5.1

# ----------------------------------------
FROM node:${NODE_VERSION} as dev

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo "$SNIPPET" >> "/root/.bashrc"

RUN apt update && apt install -y git awscli groff

ENV HOME /home/node
WORKDIR $HOME/app

# ----------------------------------------
FROM node:${NODE_VERSION} as builder

ENV HOME /home/node
WORKDIR $HOME/app

# COPY package.json tsconfig.json tsconfig.base.json tsconfig.build.json $HOME/app/
COPY src $HOME/app/src/

# RUN yarn build

# RUN chown -R node:node $HOME/app/build

# ----------------------------------------
FROM node:${NODE_VERSION}-slim as prod

ARG SENTRY_RELEASE

ENV HOME /home/node
ENV NODE_ENV production

WORKDIR $HOME/app

# COPY package.json yarn.lock $HOME/app/

RUN chown -R node:node $HOME

# COPY --from=prod_packages $HOME/app/node_modules $HOME/app/node_modules
# COPY --from=builder $HOME/app/build $HOME/app/build

# RUN chown node:node $HOME/app/node_modules
# RUN chown node:node $HOME/app/build

ENV SENTRY_RELEASE ${SENTRY_RELEASE}

USER node
