FROM postgres:15.3

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib

RUN echo Linux Open Source Software Technologies

ADD *.sql /docker-entrypoint-initdb.d/
