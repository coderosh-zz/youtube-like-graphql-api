# Youtube Like Api Clone

Video upload didn't work with node v14.2.0
Node downgraded to version 12.6.3

- Make `videos` folder in root directory
- Make .env file in root directory

  ```
  TOKEN_SECRET=secret1
  TOKEN_EXPIRE=1h
  REFRESH_SECRET=secret2
  REFRESH_EXPIRE=1d
  ```

- Create database using sql file in root directory
- Create .env file inside prisma

  ```
  DATABASE_URL="postgresql://<username>:<password>@localhost:5432/youtube?schema=public"
  ```

- Development server
  ```bash
  npm run dev
  ```

[http://localhost:4000/](http://localhost:4000/)
