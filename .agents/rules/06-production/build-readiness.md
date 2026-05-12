---
trigger: always_on
---

# Build Readiness

## Purpose

Verificar que el proyecto esté listo para compilar y desplegar.

## Preconditions

- dependencias instaladas
- estructura limpia
- assets correctos
- configuración válida
- variables necesarias definidas
- rutas comprobadas

## Build Rule

No hacer deploy si el build no pasa limpio.

## What to Check

- errores de compilación
- warnings críticos
- importaciones rotas
- referencias faltantes
- archivos mal ubicados
- configuración inconsistente

## Final Rule

Si el build está dudoso, no se publica.
