## API Rest form server Sales

# DIRS
- controlles [x]
- interfaces [x]
- entities []?
- routes [x]
- usecase [] `class test`?

# FILES
- server [x]
- .env.js [x]

# Typescript
- tsc --init `inicia um projeto typeScript`
- tsc `gera uma nova build`
- tsc -w `gera byild autom`

# dependencies
- express ok
- nodemon ok 
- ts-node ?
- pg ok
- cors ok
# devDependencies
- typescript
- @types/typescript
- @types/express

# start ?
`"start": "nodemon ./usr/server.ts"`

# Integrção com o heroku
- install ubuntu/debian apt-get
`curl https://cli-assets.heroku.com/install-ubuntu.sh | sh` ok
- heroku -v
- heroku help
# login e integração
- `heroku login ` ok
- `heroku git:remote -a app-sales`
- `git add .`
- `git commit -am "make it better"`
- `git push heroku master`
- logs da aplicação: `heroku logs -t`