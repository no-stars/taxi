## local
```npm run docker-local```

```npm run start:debug SERVICE```


## typeorm
```./node_modules/.bin/ts-node --project apps/gateway/tsconfig.app.json -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:generate PostInit -d apps/gateway/src/infrastructure/persistence/ormconfig.ts```


## pg
```npm run migrate SERVICE up```

```npm run migrate SERVICE down```

```npm run migrate:all up```

```npm run migrate:all down```

```npm run seed SERVICE```

```npm run seed:all```
