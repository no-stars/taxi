## local
```npm run docker-local```

```npm run start:debug SERVICE```


## typeorm
```./node_modules/.bin/ts-node --project apps/gateway/tsconfig.app.json -r tsconfig-paths/register ./node_modules/.bin/typeorm migration:generate PostInit -d apps/gateway/src/infrastructure/persistent/ormconfig.ts```
