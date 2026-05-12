---
trigger: always_on
---

# Firebase Deploy

## Purpose

Definir cómo se despliega el proyecto con criterio y seguridad.

## Deployment Logic

Usar Firebase como destino de despliegue cuando el proyecto sea static o SPA, y App Hosting cuando se trate de una app full-stack que requiera ese flujo. La CLI de Firebase es el punto de entrada para inicializar Hosting y hacer deploy desde el proyecto local. :contentReference[oaicite:1]{index=1}

## Required Steps

1. confirmar que el build esté listo
2. inicializar el hosting si corresponde
3. validar la carpeta pública o de salida
4. revisar el archivo de configuración
5. desplegar
6. verificar el resultado en producción

## Configuration Rule

La carpeta pública o de salida debe estar claramente definida en la configuración del hosting. Firebase permite especificar qué carpeta se sube al Hosting mediante la configuración del proyecto. :contentReference[oaicite:2]{index=2}

## Safety Rule

No desplegar cambios sin haber pasado QA.

## Final Rule

Deploy solo después de validación completa.
