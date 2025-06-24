# Cyber Risk Management System

## Project Description

Comprehensive enterprise system for automating cyber risk management methodologies, implementing a distributed architecture with 3 independent systems following different architectural patterns.

## System Architecture

### Implemented Systems

1. **Monolithic System (Django)**
   - Pattern: Layered Architecture
   - Responsibility: Asset, user, and report management
   - Database: PostgreSQL

2. **Event-Driven System (FastAPI)**
   - Pattern: Event-Driven Architecture
   - Responsibility: Asynchronous vulnerability analysis
   - Broker: RabbitMQ + Redis Streams

3. **Space-Based System (Go)**
   - Pattern: Space-Based Architecture
   - Responsibility: Real-time risk calculation
   - Storage: MongoDB + Redis Cache

## Features

- ✅ Asset valuation and classification (CIA)
- ✅ Vulnerability identification (Nmap, Shodan, NVD)
- ✅ Automatic risk calculation (Probability × Impact)
- ✅ Treatment based on ISO/IEC 27002:2022
- ✅ Residual risk calculation
- ✅ Communication and query module
- ✅ PDF report generation
- ✅ Real-time monitoring dashboard

## System Requirements

- Docker and Docker Compose
- Node.js 18+ (for frontend development)
- Python 3.11+ (for Django/FastAPI backend)
- Go 1.21+ (for Go backend)

## Installation and Deployment

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd cyber-risk-system

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# API Gateway: http://localhost:8000
# Grafana: http://localhost:3001
```

### Production with Kubernetes

```bash
# Create namespace
kubectl apply -f kubernetes/namespace.yaml

# Deploy services
kubectl apply -f kubernetes/

# Check status
kubectl get pods -n cyber-risk-system
```

## Monitoring and Observability

- **Prometheus**: Application and system metrics
- **Grafana**: Dashboards and alerts
- **Loki**: Log aggregation
- **Jaeger**: Distributed tracing

Access Grafana: http://localhost:3001 (admin/admin)

## CI/CD Pipeline

The project includes an automated pipeline with GitHub Actions:

1. **Test Stage**: Unit, integration, and security tests
2. **Build Stage**: Docker image building
3. **Deploy Stage**: Automatic deployment to Kubernetes
4. **Monitor Stage**: Post-deployment validation

## Documentation

- [System Architecture](docs/ARCHITECTURE.md)
- [C4 Diagrams](docs/C4_DIAGRAMS.md)
- [Infrastructure](docs/INFRASTRUCTURE.md)
- [UX Analysis](docs/UX_ANALYSIS.md)
- [User Manual](docs/USER_MANUAL.md)

## Ethical Responsibility Analysis (RC4)

### Professional Responsibilities

As cybersecurity engineers, we have the responsibility to:

1. **Protect Privacy**: Ensure that collected data is used solely for security purposes
2. **Transparency**: Clearly inform about scanning and monitoring activities
3. **Proportionality**: Apply security measures proportional to the actual risk
4. **Competence**: Maintain up-to-date knowledge of threats and best practices

### Impact Contexts

#### Economic
- **Cost Reduction**: Automation reduces operational costs by 60%
- **Measurable ROI**: Estimated return on investment in 18 months
- **Loss Prevention**: Prevents average costs of $4.45M per security incident

#### Social
- **Public Trust**: Strengthens trust in digital services
- **Service Continuity**: Ensures availability of critical services
- **Training**: Improves security staff competencies

#### Environmental
- **Energy Efficiency**: Optimization of computing resources
- **Hardware Reduction**: Consolidation of security tools
- **Lifecycle**: Extends system lifespan through better protection

### Identified Ethical Dilemmas

#### 1. Unauthorized Scanning
**Dilemma**: The use of scanning tools could be considered intrusive
**Resolution**: Implement clear authorization policies and scanning limits

#### 2. Privacy vs Security
**Dilemma**: Balancing necessary monitoring and user privacy
**Resolution**: Apply data minimization and anonymization principles

#### 3. Algorithmic Bias
**Dilemma**: Risk algorithms may contain biases
**Resolution**: Regular audits and diversity in development teams

## Impact Assessment

### Justified Design Decisions

1. **Monolith for Asset Management**: Ensures transactional consistency and audit simplicity
2. **Event-Driven for Scans**: Enables scalability and fault tolerance in long processes
3. **Space-Based for Calculations**: Provides low latency for real-time analysis
4. **API Gateway**: Centralizes security, logging, and access control

### Considered Trade-offs

- **Complexity vs Scalability**: Distributed architecture increases complexity but improves scalability
- **Consistency vs Availability**: CAP theorem applied according to the criticality of each component
- **Cost vs Performance**: Balance between required resources and performance

## Contribution

To contribute to the project:

1. Fork the repository
2. Create a branch for your feature
3. Implement changes with tests
4. Submit a Pull Request

