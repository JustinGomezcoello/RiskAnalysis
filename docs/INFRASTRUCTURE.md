
# Diagrama de Infraestructura

## Arquitectura de Producción en AWS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                   │
└─────────────────────────────┬───────────────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────────────┐
│                   AWS CLOUD │                                           │
│                              │                                           │
│  ┌─────────────────────────┼───────────────────────────────────────┐   │
│  │                  VPC    │                                       │   │
│  │                         │                                       │   │
│  │  ┌─────────────────────┼─────────────┐                         │   │
│  │  │    PUBLIC SUBNET    │             │                         │   │
│  │  │                     │             │                         │   │
│  │  │ [Application       └─┐            │                         │   │
│  │  │  Load Balancer]      │            │                         │   │
│  │  │                      │            │                         │   │
│  │  │ [NAT Gateway]        │            │                         │   │
│  │  └──────────────────────┼────────────┘                         │   │
│  │                         │                                       │   │
│  │  ┌─────────────────────┼─────────────┐                         │   │
│  │  │   PRIVATE SUBNET    │             │                         │   │
│  │  │                     │             │                         │   │
│  │  │ ┌─────────────────┐ │ ┌─────────┐ │                         │   │
│  │  │ │ EKS Cluster     │ │ │ Kong    │ │                         │   │
│  │  │ │                 │ │ │ Gateway │ │                         │   │
│  │  │ │ ┌─────────────┐ │ │ └─────────┘ │                         │   │
│  │  │ │ │ Sistema 1   │ │ │             │                         │   │
│  │  │ │ │ (Django)    │ │ │             │                         │   │
│  │  │ │ │ Pods: 3     │ │ │             │                         │   │
│  │  │ │ └─────────────┘ │ │             │                         │   │
│  │  │ │                 │ │             │                         │   │
│  │  │ │ ┌─────────────┐ │ │             │                         │   │
│  │  │ │ │ Sistema 2   │ │ │             │                         │   │
│  │  │ │ │ (FastAPI)   │ │ │             │                         │   │
│  │  │ │ │ Pods: 2     │ │ │             │                         │   │
│  │  │ │ └─────────────┘ │ │             │                         │   │
│  │  │ │                 │ │             │                         │   │
│  │  │ │ ┌─────────────┐ │ │             │                         │   │
│  │  │ │ │ Sistema 3   │ │ │             │                         │   │
│  │  │ │ │ (Go)        │ │ │             │                         │   │
│  │  │ │ │ Pods: 4     │ │ │             │                         │   │
│  │  │ │ └─────────────┘ │ │             │                         │   │
│  │  │ └─────────────────┘ │             │                         │   │
│  │  └─────────────────────┼─────────────┘                         │   │
│  │                         │                                       │   │
│  │  ┌─────────────────────┼─────────────┐                         │   │
│  │  │   DATABASE SUBNET   │             │                         │   │
│  │  │                     │             │                         │   │
│  │  │ [RDS PostgreSQL]    │             │                         │   │
│  │  │ Master + 2 Replicas │             │                         │   │
│  │  │                     │             │                         │   │
│  │  │ [ElastiCache Redis] │             │                         │   │
│  │  │ Cluster: 3 nodes    │             │                         │   │
│  │  │                     │             │                         │   │
│  │  │ [DocumentDB]        │             │                         │   │
│  │  │ MongoDB Compatible  │             │                         │   │
│  │  └─────────────────────┼─────────────┘                         │   │
│  └─────────────────────────┼───────────────────────────────────────┘   │
│                            │                                           │
│  ┌─────────────────────────┼───────────────────────────────────────┐   │
│  │      MONITORING         │                                       │   │
│  │                         │                                       │   │
│  │ [CloudWatch]           │                                       │   │
│  │ [Prometheus]           │                                       │   │
│  │ [Grafana]              │                                       │   │
│  │ [X-Ray Tracing]        │                                       │   │
│  └─────────────────────────┼───────────────────────────────────────┘   │
└─────────────────────────────┼───────────────────────────────────────────┘
                              │
┌─────────────────────────────┼───────────────────────────────────────────┐
│         CI/CD PIPELINE      │                                           │
│                             │                                           │
│ [GitHub Actions] → [ECR] → [EKS Deploy] → [Health Check]               │
└─────────────────────────────────────────────────────────────────────────┘
```

## Componentes de Infraestructura

### Red y Seguridad
- **VPC**: Red privada virtual con subnets públicas y privadas
- **ALB**: Application Load Balancer con SSL termination
- **NAT Gateway**: Acceso a internet para subnets privadas
- **Security Groups**: Firewall a nivel de instancia
- **WAF**: Web Application Firewall para protección DDoS

### Compute
- **EKS**: Kubernetes managed service
- **EC2 Instances**: t3.medium para worker nodes
- **Auto Scaling Groups**: Escalado automático basado en métricas

### Almacenamiento
- **RDS PostgreSQL**: Base de datos principal con Multi-AZ
- **ElastiCache Redis**: Cache distribuido y message broker
- **DocumentDB**: MongoDB compatible para datos no relacionales
- **S3**: Almacenamiento de archivos y backups

### Monitoreo
- **CloudWatch**: Métricas y logs de AWS
- **Prometheus**: Métricas de aplicación
- **Grafana**: Dashboards y alertas
- **X-Ray**: Distributed tracing
