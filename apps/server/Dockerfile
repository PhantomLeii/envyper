FROM python:3.10-alpine

ARG DATABASE_URL
ARG DJANGO_SECRET_KEY
ARG DJANGO_DEBUG
ARG DJANGO_ALLOWED_HOSTS
ARG CORS_ORIGIN_WHITELIST

COPY requirements.txt /app/requirements.txt

RUN set -ex \
    && apk add --no-cache --virtual .build-deps postgresql-dev build-base \
    && python -m venv /env \
    && /env/bin/pip install --upgrade pip \
    && /env/bin/pip install --no-cache-dir -r /app/requirements.txt \
    && runDeps="$(scanelf --needed --nobanner --recursive /env \
        | awk '{ gsub(/,/, "\nso:", $2); print "so:" $2 }' \
        | sort -u \
        | xargs -r apk info --installed \
        | sort -u)" \
    && apk add --virtual rundeps $runDeps \
    && apk del .build-deps

COPY . /app
WORKDIR /app

ENV VIRTUAL_ENV=/env
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

EXPOSE 8000

ENV \
  DJANGO_SETTINGS_MODULE=core.settings \
  DATABASE_URL=${DATABASE_URL} \
  DJANGO_SECRET_KEY=${DJANGO_SECRET_KEY} \
  DJANGO_DEBUG=${DJANGO_DEBUG} \
  DJANGO_ALLOWED_HOSTS=${DJANGO_ALLOWED_HOSTS} \
  CORS_ORIGIN_WHITELIST=${CORS_ORIGIN_WHITELIST}

CMD [ "gunicorn", "--bind", ":8000", "core.wsgi" ]