
# Arquitectura del Sistema de Gestión de Riesgos Cibernéticos

## Visión General de la Arquitectura

El sistema implementa una arquitectura distribuida con 3 sistemas independientes, cada uno siguiendo un patrón arquitectónico diferente para demostrar la aplicación de múltiples estilos arquitectónicos en un contexto empresarial.

## Sistemas y Patrones Arquitectónicos

### Sistema 1: Monolito en Capas (Layered Architecture)
**Framework**: Django + PostgreSQL
**Justificación**: 
- Centralización de la lógica de negocio para gestión de activos
- Manejo transaccional consistente de datos críticos
- Simplicidad en el despliegue y mantenimiento inicial
- Control total sobre la seguridad y auditoría

**Responsabilidades**:
- Gestión de usuarios y autenticación
- CRUD de activos de información
- Clasificación CIA (Confidencialidad, Integridad, Disponibilidad)
- Generación de reportes PDF
- Panel de administración

### Sistema 2: Arquitectura Orientada a Eventos (Event-Driven)
**Framework**: FastAPI + Redis Streams + RabbitMQ
**Justificación**:
- Procesamiento asíncrono de escaneos de vulnerabilidades
- Escalabilidad horizontal para múltiples análisis concurrentes
- Desacoplamiento entre la solicitud y el procesamiento
- Tolerancia a fallos mediante colas persistentes

**Responsabilidades**:
- Orquestación de escaneos de vulnerabilidades
- Integración con APIs externas (Shodan, NVD, Censys)
- Procesamiento de resultados de Nmap
- Notificaciones en tiempo real

### Sistema 3: Arquitectura Basada en Espacios (Space-Based)
**Framework**: Go + MongoDB + Redis Cache
**Justificación**:
- Baja latencia para cálculos de riesgo en tiempo real
- Distribución de carga mediante particionamiento de datos
- Cache distribuido para consultas frecuentes
- Escalabilidad elástica según demanda

**Responsabilidades**:
- Motor de cálculo de riesgos (Probabilidad × Impacto)
- Evaluación de tratamientos de riesgo
- Cálculo de riesgo residual
- Analytics en tiempo real

## Análisis Arquitectónico

### 1. Disponibilidad
- **Objetivo**: 99.9% uptime
- **Estrategias**:
  - Load balancer con health checks
  - Failover automático entre instancias
  - Respaldo de base de datos con replicación
  - Circuit breakers en comunicación entre servicios

### 2. Concurrencia
- **Manejo**: 
  - Sistema 1: Pool de conexiones Django (hasta 100 conexiones concurrentes)
  - Sistema 2: Workers asíncronos FastAPI + Cola Redis (hasta 1000 jobs concurrentes)
  - Sistema 3: Goroutines Go (hasta 10,000 conexiones concurrentes)

### 3. Latencia
- **Objetivos**:
  - API Gateway: < 50ms
  - Sistema Monolito: < 200ms
  - Sistema Eventos: < 500ms (procesamiento), < 50ms (status)
  - Sistema Espacios: < 100ms

### 4. Costo y Proyección
- **Recursos Base**:
  - 3 instancias t3.medium (Sistema 1)
  - 2 instancias t3.large (Sistema 2)
  - 4 instancias t3.small (Sistema 3)
  - RDS PostgreSQL db.t3.medium
  - ElastiCache Redis cluster
  - Costo estimado: $800/mes

### 5. Performance y Escalabilidad
- **Horizontal**: Auto-scaling groups basados en CPU/memoria
- **Vertical**: Upgrade automático de instancias según métricas
- **Base de Datos**: Read replicas y sharding por organización

## Características Opcionales

### Caché
- **Redis Cluster**: Cache distribuido L1 (aplicación) y L2 (datos)
- **TTL Strategies**: 
  - Resultados de escaneo: 24 horas
  - Cálculos de riesgo: 1 hora
  - Metadatos de activos: 4 horas

### Balanceo
- **Application Load Balancer**: Distribución basada en round-robin
- **Database Load Balancer**: Read/Write splitting automático

### Indexación
- **PostgreSQL**: Índices B-tree en campos de búsqueda frecuente
- **MongoDB**: Índices compuestos para consultas de riesgo
- **ElasticSearch**: Indexación full-text para reportes y logs

### Redundancia
- **Multi-AZ Deployment**: 3 zonas de disponibilidad
- **Cross-Region Backup**: Respaldo diario en región secundaria
- **Database Failover**: Automático con RTO < 2 minutos

## Integración y Middleware

### API Gateway: Kong OSS
- Rate limiting: 1000 req/min por usuario
- Autenticación JWT centralizada
- Logging y métricas centralizadas
- Transformación de requests/responses

### Gestor de Colas: RabbitMQ + Redis Streams
- **RabbitMQ**: Comunicación entre sistemas críticos
- **Redis Streams**: Eventos de alta frecuencia y logs
- **Dead Letter Queues**: Manejo de fallos y reintento

## Monitoreo y Observabilidad

### Stack de Monitoreo
- **Prometheus**: Métricas de aplicación y sistema
- **Grafana**: Dashboards y alertas visuales
- **Loki**: Agregación de logs centralizados
- **Jaeger**: Distributed tracing entre servicios

### Métricas Clave
- Tiempo de respuesta por endpoint
- Tasa de error por sistema
- Utilización de recursos (CPU, memoria, red)
- Throughput de colas y eventos
- Disponibilidad de servicios externos

## CI/CD Pipeline

### GitHub Actions Workflow
1. **Test Stage**: Unit tests, integration tests, security scans
2. **Build Stage**: Docker build, image scanning, artifact creation
3. **Deploy Stage**: Rolling deployment con health checks
4. **Monitor Stage**: Validación post-deployment y rollback automático

### Containerización
- **Docker**: Todos los servicios containerizados
- **Docker Compose**: Desarrollo local completo
- **Kubernetes**: Orquestación en producción con Helm charts
