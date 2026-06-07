# Microservices POC with Kong API Gateway, Node.js, MongoDB & React

## Overview

This project is a Proof of Concept (POC) demonstrating a microservices architecture using:

- React Frontend (Vite)
- Kong API Gateway (DB-less Mode)
- Node.js + Express Microservices
- MongoDB
- Service-to-Service Communication
- Docker Desktop (MongoDB + Kong)
- Separate MongoDB databases per service

---

## Architecture

```text
                           +----------------+
                           | React Frontend |
                           | localhost:5173 |
                           +-------+--------+
                                   |
                                   |
                                   v
                         +------------------+
                         |   Kong Gateway   |
                         | localhost:8000   |
                         +------------------+
                           |   |    |    |
            ---------------    |    |    ---------------
            |                  |    |                  |
            v                  v    v                  v

    User Service      Product Service     Order Service     Payment Service
    localhost:3001    localhost:3002      localhost:3003    localhost:3004

                                            |
                                            |
                                            v

                                  Service-to-Service Calls

                              Order Service
                                    |
                    +---------------+--------------+
                    |                              |
                    v                              v
             Product Service               Payment Service
```

---

# Project Structure

```text
microservices-poc/

├── frontend/
│
├── kong/
│   └── kong.yml
│
├── user-service/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── product-service/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── payment-service/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── order-service/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Technologies Used

| Component | Technology |
|------------|------------|
| Frontend | React + Vite |
| API Gateway | Kong DB-less |
| Backend | Node.js + Express |
| Database | MongoDB |
| ODM | Mongoose |
| HTTP Client | Axios |
| Container Runtime | Docker Desktop |

---

# MongoDB Setup

## Pull MongoDB Image

```bash
docker pull mongo:8
```

---

## Run MongoDB

```bash
docker run -d ^
--name mongodb ^
-p 27017:27017 ^
-e MONGO_INITDB_ROOT_USERNAME=admin ^
-e MONGO_INITDB_ROOT_PASSWORD=admin123 ^
mongo:8
```

Verify:

```bash
docker ps
```

---

## MongoDB Databases

Each service uses a separate database:

| Service | Database |
|----------|----------|
| User Service | usersdb |
| Product Service | productsdb |
| Order Service | ordersdb |
| Payment Service | paymentsdb |

---

# Kong Gateway Setup

## Pull Kong

```bash
docker pull kong:3.9
```

---

## Kong Configuration

Location:

```text
kong/
└── kong.yml
```

---

## Start Kong

Run from project root:

### PowerShell

```powershell
docker run -d `
--name kong `
-p 8000:8000 `
-p 8001:8001 `
-e KONG_DATABASE=off `
-e KONG_DECLARATIVE_CONFIG=/kong/declarative/kong.yml `
-v ${PWD}/kong/kong.yml:/kong/declarative/kong.yml `
kong:3.9
```

---

## Verify Kong

```text
http://localhost:8000/users
```

Should route to:

```text
http://localhost:3001/users
```

---

# Kong Routes

| Route | Service |
|---------|---------|
| /users | User Service |
| /products | Product Service |
| /orders | Order Service |
| /payments | Payment Service |

---

# Service-to-Service Communication

Order Service directly communicates with:

### Product Service

```text
GET /products/:id
```

### Payment Service

```text
POST /payments
```

This communication DOES NOT go through Kong.

---

# Environment Variables

---

## user-service/.env

```env
PORT=3001

MONGO_URI=mongodb://admin:admin123@localhost:27017/usersdb?authSource=admin
```

---

## product-service/.env

```env
PORT=3002

MONGO_URI=mongodb://admin:admin123@localhost:27017/productsdb?authSource=admin
```

---

## payment-service/.env

```env
PORT=3004

MONGO_URI=mongodb://admin:admin123@localhost:27017/paymentsdb?authSource=admin
```

---

## order-service/.env

```env
PORT=3003

MONGO_URI=mongodb://admin:admin123@localhost:27017/ordersdb?authSource=admin

PRODUCT_URL=http://localhost:3002
PAYMENT_URL=http://localhost:3004
```

---

# Local Execution Sequence

Follow the exact order.

---

## Step 1

Start MongoDB

```bash
docker start mongodb
```

---

## Step 2

Start Kong

```bash
docker start kong
```

---

## Step 3

Start User Service

```bash
cd user-service

npm install

npm start
```

Expected:

```text
Connected to usersdb
User Service running on port 3001
```

---

## Step 4

Start Product Service

```bash
cd product-service

npm install

npm start
```

Expected:

```text
Connected to productsdb
Product Service running on port 3002
```

---

## Step 5

Start Payment Service

```bash
cd payment-service

npm install

npm start
```

Expected:

```text
Connected to paymentsdb
Payment Service running on port 3004
```

---

## Step 6

Start Order Service

```bash
cd order-service

npm install

npm start
```

Expected:

```text
Connected to ordersdb
Order Service running on port 3003
```

---

## Step 7

Start Frontend

```bash
cd frontend

npm install

npm run dev
```

Expected:

```text
Local:
http://localhost:5173
```

---

# Application Flow

---

## Create User

Frontend

↓

Kong

↓

User Service

↓

MongoDB usersdb

---

## Create Product

Frontend

↓

Kong

↓

Product Service

↓

MongoDB productsdb

---

## Create Order

Frontend

↓

Kong

↓

Order Service

↓

Product Service (Direct Call)

↓

Payment Service (Direct Call)

↓

Order Stored in ordersdb

↓

Payment Stored in paymentsdb

---

# Health Endpoints

| Service | Endpoint |
|-----------|-----------|
| User | /health |
| Product | /health |
| Payment | /health |
| Order | /health |

Examples:

```text
http://localhost:3001/health
```

```text
http://localhost:3002/health
```

```text
http://localhost:3003/health
```

```text
http://localhost:3004/health
```

---

# API Examples

---

## Create User

```http
POST /users
```

Request

```json
{
  "name": "Rushiket",
  "email": "rushiket@gmail.com"
}
```

---

## Create Product

```http
POST /products
```

Request

```json
{
  "name": "TVS Ronin",
  "price": 180000
}
```

---

## Create Order

```http
POST /orders
```

Request

```json
{
  "userId": "USER_ID",
  "productId": "PRODUCT_ID"
}
```

---

# Demo Features

✅ React Dashboard

✅ Kong API Gateway

✅ MongoDB

✅ User Management

✅ Product Management

✅ Order Management

✅ Payment Management

✅ Service-to-Service Communication

✅ Environment Variable Configuration

✅ Separate Database Per Service

✅ Dockerized Infrastructure Components

---

# Future Enhancements

- Kubernetes Deployment
- Helm Charts
- ArgoCD GitOps
- JWT Authentication
- Redis Caching
- OpenTelemetry
- Prometheus Metrics
- Grafana Dashboards
- Jaeger Distributed Tracing
- CI/CD Pipelines
- API Rate Limiting
- Circuit Breakers
- Retry Policies

---

## Author

Rushiket Modak

DevOps / Cloud / Kubernetes / GitOps / Platform Engineering