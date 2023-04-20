# ONCONCEPTOS

Desarrollo para un cliente de [Umbrella Company](https://www.umbrellacompany.mx/)
[Live Demo](https://umbrella-conconceptos.onrender.com/)

## Objetivo

Desarrollar un aplicativo web que funcione como una interfaz para consumir y calificar medios audiovisuales.

## Puntos a Considerar

- La plataforma donde se publicará el aplicativo es SharePoint
- Éstos medios se consumen desde la red interna del cliente, la cual está limitada a las políticas de seguridad del mismo.
- El contenido del aplicativo _debe ser administrable_ por el personal de Umbrella.
- Tipos de contenido:
  - Showcase/Destacados: son series/episodios particulares para ser desplegados al inicio. Tiene como atributos: imágen principal, título y descripción
  - Series: tiene como atributos: título, descripción completa y descripción corta
  - Episodios: tiene como atributos: título de serie, título de episodio, descripción, número de episodio, url del video y url de la imágen de preview.
- La expreiencia debe ser parecida a servicios de Streaming (ui/ux)
- El mecanismo de calificación debe considerar promedio (star rating) y likes

## Estrategias

### Desarrollo

La arquitectura del aplicativo web es SPA (Single Page Application) desarrollado con (Svelte)[https://svelte.dev] en conjunto con (Vite)[https://vitejs.dev], para poder compilar como un sitio estático y poder instalar de manera trivial en SharePoint cambiando el nombre de `index.html` a `index.aspx`.

### Gestión de Contenidos

> TODO: implementar una interfaz para generar el documento `.xlsx`

El orígen de los datos se da por medio de un archivo `.xlsx`, que debe llamarse `datos-onconceptos.xlsx`. Éste archivo contiene 3 hojas (sheets) con diversos encabezados:

1. series:
   - titulo
   - descripcion_completa
   - descripcion_corta
2. episodios:
   - titulo_serie
   - titulo_episodio
   - numero
   - descripcion
   - video_url
   - preview_img_url
3. showcase:
   - titulo_serie
   - descripcion
   - preview_img_url

> series->titulo **debe ser igual** a episodios->titulo_serie y showcase->titulo_serie

#### Imágenes Preview

En la ubicación donde se instale el aplicativo, debe haber una carpeta llamada `preview-img`. Dentro de ésta deben estar **todas** las imagenes que funjan como _preview_. El nombre de los archivos deben corresponder con los campos `preview_img_url` dentro de las _sheets_ del
E.g. Si una serie "Serie A" tiene un episodio con título "Episodio 1 de Serie A" cuyo archivo preview es `preview_episodio-1-serie-a.jpg`\*. En el excel, en el renglón correspondiente a "Episodio 1 de Serie A", el campo preview_img_url debe ir `preview_episodio-1-serie-a.jpg`, y el directorio de publicación debe quedar como `./preview-img/preview_episodio-1-serie-a.jpg`

\*Puede ser cualquier formato de imágen

### Sistema de Calificación

Backend: SharePoint (definido por el cliente)

Método: REST API de SharePoint para manipular Listas

> Requiere Token Oauth
