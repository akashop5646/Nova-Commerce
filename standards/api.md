# API Integration Standard

All Klin API services must conform to the following standards:

## Standards
- **RESTful Endpoints**: Methods must follow HTTP verb guidelines (GET, POST, PATCH, DELETE).
- **Type Compliance**: Define schemas in the API Contracts package (`@klin/api-contracts`).
- **Gateway Forwarding**: Gateway routes parameters to downstream microservices. Direct client calls to subservices are disallowed.
- **FastAPI Core**: Backend API endpoints must be generated using FastAPI.
