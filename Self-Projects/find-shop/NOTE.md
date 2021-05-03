# Steps

## TS project template (WSP001)

- init project

```Bash
yarn init -y
```

- add packages for typescript project

```Bash
yarn add typescript ts-node @types/node
```

- create files for typescript project

```Bash
touch tsconfig.json index.js main.ts
```

- `tsconfig.json`

```JSON
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": [
        "node_modules",
        "build",
        "scripts",
        "index.js"
    ]
}
```

- `index.js`

```Javascript
require('ts-node/register');
require('./main');
```

## Jest Installation (BAD001)

- Installation

```Bash
yarn add --dev jest
yarn add --dev typescript ts-jest @types/jest
yarn ts-jest config:init
```

- create `main.test.ts`

```Typescript
test("adds 1 + 1 to equal 2", () => {
  expect(1 + 1).toBe(2);
});
```

## Knex Installation (BAD004)

```Bash
yarn add knex @types/knex pg @types/pg
yarn knex init -x ts
yarn add dotenv @types/dotenv
```

- `.env`

```Text
DB_NAME=demo0417
DB_USERNAME=jason
DB_PASSWORD=jason
```

- `.env.sample`

```Text
DB_NAME=demo0417
DB_USERNAME=
DB_PASSWORD=
```

- MYSQL\*

```Text
CREATE USER 'jason'@'%' IDENTIFIED BY 'jason';
GRANT ALL PRIVILEGES ON demo0417.* TO 'jason'@'%';
FLUSH PRIVILEGES;
```

## Migrations

## Seed
