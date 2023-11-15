FROM postgres:15.3

RUN apt-get clean && apt-get update && \
    apt-get install -y postgresql-contrib && \
    apt-get install postgresql-15-postgis-3 -y && \
    apt-get install postgis -y

RUN echo Linux Open Source Software Technologies

ADD *.sql /docker-entrypoint-initdb.d/
