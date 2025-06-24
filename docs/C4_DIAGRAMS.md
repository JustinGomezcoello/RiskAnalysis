
# Diagramas C4 - Sistema de Gestión de Riesgos Cibernéticos

## Nivel 1: Diagrama de Contexto

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTEXTO DEL SISTEMA                         │
│                                                                 │
│  [Analista de Seguridad]  ←→  [Sistema de Gestión de Riesgos]  │
│                               ↕                                 │
│  [Administrador TI]       ←→  │ • Gestión de activos            │
│                               │ • Análisis de vulnerabilidades │
│  [Auditor Externo]        ←→  │ • Cálculo de riesgos           │
│                               │ • Tratamiento de riesgos       │
│  [CISO]                   ←→  │ • Reportería y monitoreo       │
│                               ↕                                 │
│                         [APIs Externas]                        │
│                         • Shodan API                           │
│                         • NVD Database                         │
│                         • Censys API                           │
└─────────────────────────────────────────────────────────────────┘
```

## Nivel 2: Diagrama de Contenedores

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CONTENEDORES DEL SISTEMA                      │
│                                                                      │
│  [Frontend React]                                                    │
│  • Dashboard principal                                               │
│  • Gestión de activos                                               │
│  • Visualización de riesgos                                         │
│            ↓ HTTPS/REST                                             │
│                                                                      │
│  [API Gateway - Kong]                                               │
│  • Enrutamiento                                                     │
│  • Autenticación                                                    │
│  • Rate limiting                                                    │
│            ↓                                                        │
│  ┌─────────────────┬─────────────────┬─────────────────┐           │
│  │ Sistema 1       │ Sistema 2       │ Sistema 3       │           │
│  │ [Monolito]      │ [Event-Driven]  │ [Space-Based]   │           │
│  │                 │                 │                 │           │
│  │ Django + REST   │ FastAPI         │ Go + gRPC       │           │
│  │ ↓               │ ↓               │ ↓               │           │
│  │ [PostgreSQL]    │ [RabbitMQ]      │ [MongoDB]       │           │
│  │                 │ [Redis Streams] │ [Redis Cache]   │           │
│  └─────────────────┴─────────────────┴─────────────────┘           │
│                                                                      │
│  [Monitoreo]                                                        │
│  • Prometheus                                                       │
│  • Grafana                                                         │
│  • Loki                                                            │
└──────────────────────────────────────────────────────────────────────┘
```

## Nivel 3: Diagrama de Componentes - Sistema Monolito

```
┌─────────────────────────────────────────────────────────────────┐
│                   SISTEMA 1 - MONOLITO (Django)                 │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │ Presentation    │  │ Business Logic  │  │ Data Access    │   │
│  │ Layer          │  │ Layer          │  │ Layer          │   │
│  │                │  │                │  │                │   │
│  │ • REST APIs    │→ │ • Asset Mgmt   │→ │ • Models       │   │
│  │ • Admin Panel  │  │ • User Auth    │  │ • Repositories │   │
│  │ • Reports      │  │ • Report Gen   │  │ • Migrations   │   │
│  │ • Validation   │  │ • Business     │  │ • Queries      │   │
│  │               │  │   Rules        │  │                │   │
│  └─────────────────┘  └─────────────────┘  └────────────────┘   │
│                                               ↓                 │
│                                        [PostgreSQL]             │
│                                        • Users                  │
│                                        • Assets                 │
│                                        • Classifications        │
│                                        • Reports                │
└─────────────────────────────────────────────────────────────────┘
```

## Nivel 3: Diagrama de Componentes - Sistema Event-Driven

```
┌─────────────────────────────────────────────────────────────────┐
│              SISTEMA 2 - EVENT-DRIVEN (FastAPI)                 │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │ API Layer      │  │ Event Handlers  │  │ External APIs  │   │
│  │                │  │                │  │                │   │
│  │ • Scan Request │→ │ • Vulnerability │→ │ • Shodan       │   │
│  │ • Status Check │  │   Scanner       │  │ • NVD          │   │
│  │ • Webhooks     │  │ • Result        │  │ • Censys       │   │
│  │               │  │   Processor     │  │ • Nmap Exec    │   │
│  └─────────────────┘  └─────────────────┘  └────────────────┘   │
│           ↓                     ↓                              │
│  ┌─────────────────┐  ┌─────────────────┐                     │
│  │ Message Queue   │  │ Event Store     │                     │
│  │                │  │                │                     │
│  │ • RabbitMQ     │  │ • Redis Streams │                     │
│  │ • Job Queue    │  │ • Event Log     │                     │
│  │ • Dead Letter  │  │ • Audit Trail   │                     │
│  └─────────────────┘  └─────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

## Nivel 3: Diagrama de Componentes - Sistema Space-Based

```
┌─────────────────────────────────────────────────────────────────┐
│              SISTEMA 3 - SPACE-BASED (Go)                       │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │ gRPC Services  │  │ Processing      │  │ Storage        │   │
│  │                │  │ Units          │  │ Manager        │   │
│  │ • Risk Calc    │→ │ • Risk Engine  │→ │ • Data Grid    │   │
│  │ • Treatment    │  │ • Probability  │  │ • Partitioning │   │
│  │ • Analytics    │  │ • Impact Calc  │  │ • Replication  │   │
│  │ • Real-time    │  │ • Residual     │  │                │   │
│  └─────────────────┘  └─────────────────┘  └────────────────┘   │
│           ↓                     ↓                ↓            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐   │
│  │ In-Memory      │  │ Cache Layer     │  │ Persistent     │   │
│  │ Grid           │  │                │  │ Storage        │   │
│  │                │  │ • Redis Cluster │  │                │   │
│  │ • Shared State │  │ • Hot Data      │  │ • MongoDB      │   │
│  │ • Coordination │  │ • Session Store │  │ • Risk History │   │
│  └─────────────────┘  └─────────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```
