# Uceva Pipeline App

Primera aplicación del laboratorio de Pipelines de Arquitectura de Software (UCEVA). Está hecha con Angular, tiene tres vistas y se publica automáticamente en GitHub Pages con un workflow de GitHub Actions.

Página publicada: [https://felipe-marulanda.github.io/Uceva-Pipeline-App/](https://felipe-marulanda.github.io/Uceva-Pipeline-App/)

Integrantes: Santiago Santacruz Cuellar y Juan Felipe Castro Marulanda.

## Qué tiene la aplicación

Tres páginas navegables desde un menú: Inicio, Acerca de y Contacto. Cada una se carga con `loadComponent`, así que Angular descarga su código solo cuando se visita.

Las rutas son `/home`, `/about` y `/contact`. La ruta vacía y cualquier ruta desconocida redirigen a `/home`.

## Estrategia de enrutamiento

Esta aplicación usa Hash Location Strategy. Se configura con `provideRouter(routes, withHashLocation())` en `src/app/app.config.ts`, y por eso las direcciones llevan el carácter `#`, por ejemplo `/#/about`.

La segunda aplicación del laboratorio ([Uceva-Pipeline-App-Path](https://github.com/SantiagoCruz09/Uceva-Pipeline-App-Path)) hace lo contrario: usa Path Location Strategy, que es la que Angular trae por defecto, y sus direcciones se ven como `/about`.

## Por qué no hace falta un 404.html

GitHub Pages es un hosting estático: solo entrega archivos que existen en el sitio. Con Hash Location, todo lo que va después del `#` se queda en el navegador y nunca se envía al servidor. Por eso, aunque se abra `/#/about` directamente o se recargue la página con F5, el servidor siempre recibe la petición de `index.html` y Angular se encarga de mostrar la vista correcta.

Con Path Location sí haría falta copiar `index.html` como `404.html`, porque una ruta como `/about` no es un archivo y Pages respondería con un 404. Esa es justo la diferencia entre las dos aplicaciones del laboratorio.

## Build con base-href

La página no se sirve desde la raíz del dominio sino desde `/Uceva-Pipeline-App/`. Por eso el build en el pipeline se ejecuta con:

```
npm run build -- --base-href /Uceva-Pipeline-App/
```

Sin esa opción, el navegador buscaría los archivos JavaScript y el favicon en la raíz de `felipe-marulanda.github.io` y no los encontraría.

## Pipeline

El archivo `.github/workflows/` define el pipeline, que se ejecuta en cada push a `main`. Tiene dos jobs:

1. `build`: descarga el código, instala Node, ejecuta `npm ci`, corre las pruebas con `npm test`, construye la aplicación y sube el resultado como artefacto.
2. `deploy`: publica ese artefacto en GitHub Pages.

Si las pruebas o el build fallan, el despliegue no se ejecuta.

Para que funcione hay que activar Pages en el repositorio: Settings, Pages, Source, GitHub Actions.

## Cómo correrla en local

```
npm install
npm start
```

Queda disponible en [http://localhost:4200/](http://localhost:4200/) y se recarga sola al modificar el código. Para generar el build y correr las pruebas:

```
npm run build
npm test
```

La salida del build queda en `dist/pipeline-app/browser`. Las pruebas unitarias usan [Vitest](https://vitest.dev/).

## Tecnologías

- Angular 22 (generado con Angular CLI 22.2.4)
- TypeScript
- Vitest para pruebas unitarias
- Prettier para el formato del código
- GitHub Actions y GitHub Pages para el despliegue

## Mensajes de commit

Usamos Conventional Commits (`feat:`, `fix:`, `docs:`, `ci:`, `chore:`) para que el historial se lea fácil.