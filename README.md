
# Axel Fecha — Software Developer

Primera iteración visual del portfolio. React, TypeScript estricto, Vite, React Router, CSS y Lucide. No se ha desplegado.

## Ejecutar

Node.js 22.12+ o 24 recomendado.

```sh
npm ci
npm run dev
```

Abrir la URL que imprime Vite (normalmente http://localhost:5173).

```sh
npm run build
npm run preview
npm run lint
node scripts/verify.mjs
```

## Completar contenido

Skills: `skillGroups` define el toolkit principal y `additionalSkills` define el apartado “También trabajo con”, ambos en `src/data/portfolio.ts`. Agregar, por ejemplo, `additionalSkills = ['Nombre de la tecnología']`. Este apartado representa experiencia práctica fuera del stack principal, no tecnologías de nivel principiante. Logos locales y su correspondencia en `src/data/skillIcons.ts`; para añadir uno, guardar el SVG en `public/icons/skills/` y agregar el nombre/ruta al mapa. Los conceptos de arquitectura y CI/CD utilizan iconos de Lucide. Los logos de lenguajes/frameworks provienen de [Devicon](https://github.com/devicons/devicon), con licencia incluida en `public/icons/skills/LICENSE.txt`; se muestran en un solo tono para mantener la coherencia light/dark, sin dependencia adicional ni CDN.

La interfaz inicia en español. El selector ES/EN en la barra superior traduce Home, proyectos y demos y persiste la elección. Traducciones en `src/data/translations.ts`; nombres de proyectos y tecnologías se conservan. Email y teléfono se editan en `src/data/portfolio.ts`; la biografía sigue siendo provisional.

Para habilitar el CV: colocar el PDF en `public/cv.pdf` y configurar `profile.cv` como `/cv.pdf`. “Abrir CV” abre una pestaña con el PDF, sin atributo de descarga; el icono secundario usa `download`. Servir el archivo desde el mismo dominio para que el navegador respete la descarga. La apertura usa el visor PDF del navegador y sus preferencias.

- `src/data/portfolio.ts`: perfil, links, CV, proyectos y grupos de habilidades. Las URLs ausentes se muestran como texto sin enlaces falsos ni avisos visuales.

Flyway, Excel y Power BI usan SVG de [Simple Icons 9.21.0](https://github.com/simple-icons/simple-icons/tree/9.21.0), con licencia en `public/icons/skills/SIMPLE-ICONS-LICENSE.txt`.
- `src/types/project.ts`: modelo reutilizable. Agregar `image`, `demoGif` o `demoVideo` (MP4), `repositoryUrl` y opcionalmente `videoUrl` para el walkthrough. `demoPlaybackRate` controla la velocidad de la demo (Fixy: 1.5). Archivos locales en `public/`, referenciados como `/projects/fixy/video-fixy.mp4`. El video solo se monta al solicitar la demo; con reduced motion requiere pulsar Reproducir.
- `src/pages/Home.tsx`: presentación y fotografía placeholder. Reemplazar el placeholder por una imagen optimizada con dimensiones explícitas.
- `src/styles` no es necesario por ahora: los tokens y breakpoints compartidos están en `src/index.css`; los componentes pueden incorporar estilos propios después.
- Las maquetas de proyectos y los stacks son ilustrativos; no describen implementaciones confirmadas. Revisar todo el contenido antes de publicar.

## Dirección visual y accesibilidad

Inspiración principal: [React Bits Pro Showcase 2](https://pro.reactbits.dev/docs/blocks/showcase/showcase-2), [Warp Text](https://www.reactbits.dev/text-animations/warp-text) y [Shape Grid](https://www.reactbits.dev/c/backgrounds/shape-grid).

Se implementaron interpretaciones propias en CSS, no copias de los componentes originales ni código Pro. Showcase usa scroll nativo y controles explícitos; no hay carrusel infinito automático. Warp Text es una entrada breve por transform/opacity. Shape Grid es estático con una reacción discreta al hover, limitada al Hero. Esto evita un canvas activo constantemente y dependencias de animación.

Tema inicial del sistema, toggle persistido en localStorage y sincronización del sistema mientras no existe selección manual. Reduced motion elimina animación decorativa y scroll suave. Los GIFs se montan únicamente al abrir la demo; en reduced motion requieren pulsar Play. Stop retira el GIF y vuelve al preview: no conserva el fotograma. El dialog nativo mantiene el foco dentro del modal, cierra con Escape y devuelve el foco al botón original.

Las fuentes DM Sans y Manrope se obtienen desde Google Fonts con fallback local. Antes de producción se pueden servir localmente. Optimizar screenshots como WebP/AVIF y GIFs cortos; no agregar GIFs a las cards.

## Rutas y publicación posterior

Home contiene Projects, Skills, About y Contact. Rutas `/projects/fixy`, `/projects/loan-origination`, `/projects/banking-project-2` y `/projects/banking-project-3`; slug desconocido muestra 404.

`vercel.json` prepara el fallback de rutas SPA. Antes de desplegar: completar URLs, email, CV, fotografía y contenido; agregar canonical y `og:url` en `index.html`; reemplazar el social preview SVG por PNG/JPG con URL absoluta (las redes no suelen aceptar SVG). Build: `npm run build`; salida: `dist`.

## Verificación

Build y lint, rutas individuales, light/dark y persistencia, menú móvil, demo con Escape y retorno de foco. Layout revisado a 1440, 1280, 768, 390 y 320 px; sin overflow global. `scripts/verify.mjs` comprueba la selección inicial de tema y que una demo con GIF no lo renderiza automáticamente bajo reduced motion, junto con las reglas CSS que desactivan animaciones. Falta validar medios definitivos y social previews cuando se proporcionen.

