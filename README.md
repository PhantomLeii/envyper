# Envyper

A modern environment secrets managing web application built with React, TanStack Router, and the Hero UI component library.

## Overview

Envyper is a web application that utilizes cutting-edge technologies and best practices for building scalable React applications while also depending on a Django REST Framework backend. The project leverages TanStack Router for type-safe routing, Hero UI components for a polished interface, and Vite for lightning-fast development.

## Contents

1. [Technology Stack](#technology-stack)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Lisence](#license)
5. [Acknowledgements](#acknowledgments)

## Technology Stack

- React 18
- TanStack Router
- Hero UI Component Library
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- ESLint
- Django REST Framework
- Turborepo

## Key Features

- Modern React application architecture
- Type-safe routing with TanStack Router
- Polished UI components from Hero UI library
- Fast development with Vite
- Full TypeScript support
- Tailwind CSS for styling
- Django backend

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm package manager
- Python >= 3.10
- A PostgreSQL database.

> If you want to quickly spin up a Postgres database just to run the demo, you can use [Neon Serverless Postgres](https://neon.tech)

### Local Development Setup

1. Clone the repository

```bash
git clone https://github.com/PhantomLeii/envyper.git
cd envyper
```

2. Prepare a virtual enviroment

```bash
# Windows
python -m venv .venv

# MacOS & Linux
python3 -m venv .venv
```

3. Activate the virtual environment

```bash
# Windows
.\.venv\Scripts\activate.bat

# MacOS & Linux
source .venv/bin/activate
```

5.  Install dependencies

> We install turbo globally as it is recommended in the [Turborepo documentation](https://turbo.build/repo/docs/getting-started/installation) to install it in both the repository & globally to take advantage of fast workflows. You can simply run `pnpm install`, turbo will be installed as a dev dependency but will need to be prefixed with pnpx every time you need to use it.

```bash
pnpm install turbo@2.3 --global

pnpm install
```

5. Prepare environment variables

> Variables for the frontend will follow the guidline in this [.env](./apps/web/.env.example)<br />
> For the backend, follow those in this [.env](./apps/server/core/.env.example)

```bash
# Windows
copy apps\server\core\.env.example apps\server\core\.env

copy apps\web\.env.example apps\web\.env

# MacOS & Linux
cp apps/server/core/.env.example apps/server/core/.env

cp apps/web/.env.example apps/server/.env
```

Populate all the environment variables with the relevant data

6. Run database migrations

```bash
pnpm --filter="@envyper/server" migrate
```

7. Create a superuser for the admin panel

```bash
# Windows
python apps\server\manage.py createsuperuser

# MacOs & Linux
python3 apps/server/manage.py createsuperuser
```

8.  Start the development server

```bash
pnpm dev
```

---

- Backend: `http://localhost:8000`
- Backend Admin Panel: `http://localhost:8000/admin`
- Web: `http://localhost:8001`

## Contributing

Have a look at the [CONTRIBUTING Guidline](./CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LISENCE.md) file for details.

## Acknowledgments

- HeroUI for the component library
- TanStack team for the excellent router
- Vite team for the blazing fast development experience
- Django & Django REST Framework teams for the baked in security features for the web frameworks
- Vercel for the exceptionally fast & easy to use Turborepo build tool
