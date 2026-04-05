# Express TypeScript Boilerplate

A minimal and production-ready Express.js boilerplate with TypeScript.

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Running the Application](#-running-the-application)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js 5
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Validation**: Zod
- **Logger**: Pino
- **Security**: Helmet, CORS

## 📦 Prerequisites

Pastikan Anda telah menginstall:

- **Node.js** (v18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**
- **PostgreSQL** (v14 atau lebih tinggi)

## 🚀 Installation

1. **Clone repository**

```bash
git clone https://github.com/arioprima/express-typescript-boilerplate
cd express-typescript-boilerplate
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
```

Edit file `.env` dengan konfigurasi Anda (lihat bagian [Environment Variables](#-environment-variables))

## 🔐 Environment Variables

Buat file `.env` di root directory dan isi dengan variabel berikut:

```env
# SERVER
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here

# DATABASE
DATABASE_URL="postgresql://username:password@localhost:5432/express-typescript-boilerplate?schema=public"
```

### Penjelasan Environment Variables:

| Variable       | Description                                            | Default       |
| -------------- | ------------------------------------------------------ | ------------- |
| `PORT`         | Port server berjalan                                   | `3000`        |
| `NODE_ENV`     | Environment mode (`development`, `production`, `test`) | `development` |
| `JWT_SECRET`   | Secret key untuk JWT authentication                    | -             |
| `DATABASE_URL` | PostgreSQL connection string                           | -             |

## 🗄 Database Setup

### 1. Buat Database PostgreSQL

```bash
# Login ke PostgreSQL
psql -U postgres

# Buat database baru
CREATE DATABASE db_shiftku;

# Buat user (opsional)
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE db_shiftku TO your_user;
```

### 2. Generate Prisma Client

```bash
npx prisma generate
```

### 3. Run Migrations

```bash
npx prisma migrate dev
```

### 4. Seed Database (Opsional)

Untuk mengisi database dengan data awal:

```bash
npx prisma db seed
```

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000` dengan hot-reload enabled.

### Production Mode

1. Build aplikasi:

```bash
npm run build
```

2. Start server:

```bash
npm start
```

## 📜 Available Scripts

| Command            | Description                                   |
| ------------------ | --------------------------------------------- |
| `npm run dev`      | Jalankan development server dengan hot-reload |
| `npm run build`    | Build aplikasi untuk production               |
| `npm start`        | Jalankan production server                    |
| `npm run lint`     | Check linting errors                          |
| `npm run lint:fix` | Fix linting errors otomatis                   |

### Prisma Commands

| Command                     | Description                                      |
| --------------------------- | ------------------------------------------------ |
| `npx prisma generate`       | Generate Prisma Client                           |
| `npx prisma migrate dev`    | Create dan apply migration di development        |
| `npx prisma migrate deploy` | Apply migrations di production                   |
| `npx prisma db seed`        | Seed database dengan data awal                   |
| `npx prisma studio`         | Buka Prisma Studio untuk manage database via GUI |
| `npx prisma validate`       | Validate schema Prisma                           |

## 📁 Project Structure

```
shiftku-backend/
├── prisma/                     # Prisma configuration
│   ├── schema/                 # Prisma schemas (modular)
│   │   ├── auth/               # Authentication models
│   │   ├── operations/         # Operations models
│   │   ├── system/             # System models
│   │   └── tenancy/            # Tenancy models
│   ├── migrations/             # Database migrations
│   ├── seeds/                  # Seed files
│   └── seed.ts                 # Main seed file
├── src/
│   ├── config/                 # App configuration
│   ├── generated/              # Generated Prisma Client
│   ├── middlewares/            # Express middlewares
│   ├── modules/                # Feature modules
│   │   ├── auth/               # Authentication module
│   │   └── user/               # User module
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   └── index.ts                # Main entry point
├── .env.example                # Example environment variables
├── eslint.config.mjs           # ESLint configuration
├── package.json                # Dependencies & scripts
├── prisma.config.ts            # Prisma configuration
└── tsconfig.json               # TypeScript configuration
```

## 🤝 Contributing

Contributions are welcome! Silakan buat issue atau pull request.

## 📝 License

ISC

## 🔗 Links

- **Repository**: [shiftku-backend](https://github.com/AnakSehatCode/shiftku-backend)
- **Issues**: [Report Issues](https://github.com/AnakSehatCode/shiftku-backend/issues)

---
