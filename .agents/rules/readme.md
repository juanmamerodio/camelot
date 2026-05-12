---
trigger: always_on
---

# Rules Hub

Este directorio organiza el sistema de trabajo por especialidad.

## Cómo leerlo

Primero se aplica la capa core.
Después se resuelve strategy.
Luego se desarrolla design, frontend, video y copy.
Al final se valida production.

## Orden lógico de uso

1. core
2. strategy
3. design
4. frontend
5. video
6. copy
7. production

## Principio general

No mezclar responsabilidades.
Cada carpeta existe para una sola función.

## Qué hace cada capa

- core: identidad, criterio y límites.
- strategy: dirección, oferta, audiencia y posicionamiento.
- design: sistema visual y composición.
- frontend: implementación visual y comportamiento UI.
- video: lenguaje cinematográfico y prompts de motion.
- copy: voz, narrativa, hooks y conversión.
- production: QA, build, deploy y control final.

## Regla operativa

Si una tarea pertenece a una capa específica, se usa ese archivo.
Si faltan datos, se consulta strategy antes de construir.

## Norma final

Nada se entrega sin pasar por la capa que le corresponde.
