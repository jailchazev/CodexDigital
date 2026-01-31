# Gaming Digital - Landing Page

Landing page profesional, moderna y futurista para Gaming Digital, empresa de tecnología especializada en desarrollo web, aplicaciones web y móviles.

## 🚀 Características

- **Diseño Futurista**: Efectos de neón, animaciones suaves y estética tecnológica
- **100% Responsive**: Optimizado para todos los dispositivos
- **Integración WhatsApp**: Mensajes dinámicos según el servicio seleccionado
- **Panel de Administración**: Gestión de ofertas en `/admin`
- **Optimizado para Producción**: Listo para desplegar en Render como Static Site

## 🛠️ Tecnologías

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Bun (package manager)

## 📦 Instalación

```bash
# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun dev

# Construir para producción
bun run build

# Verificar tipos
bun typecheck

# Verificar código
bun lint
```

## 🎨 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout raíz
│   ├── globals.css       # Estilos globales
│   └── admin/
│       └── page.tsx      # Panel de administración
└── components/
    ├── Hero.tsx          # Sección hero con animación de partículas
    ├── Problems.tsx      # Problemas que resolvemos
    ├── Services.tsx      # Servicios y paquetes
    ├── Offers.tsx        # Ofertas especiales
    ├── WhyChooseUs.tsx   # Por qué elegirnos
    ├── Process.tsx       # Proceso de trabajo
    ├── Testimonials.tsx  # Testimonios de clientes
    ├── Footer.tsx        # Footer con redes sociales
    └── WhatsAppButton.tsx # Botón flotante de WhatsApp
```

## 🎯 Secciones de la Landing

1. **Hero Section**: Presentación con animación de partículas conectadas
2. **Problemas**: Muestra los problemas comunes de los negocios
3. **Servicios**: 3 servicios principales con 3 paquetes cada uno
   - Desarrollo de Páginas Web
   - Aplicaciones Web a Medida
   - Apps Móviles Android/iOS
4. **Ofertas Digitales**: Soluciones específicas por industria
5. **Por Qué Elegirnos**: Ventajas competitivas
6. **Proceso de Trabajo**: 4 pasos del proceso
7. **Testimonios**: Casos de éxito de clientes
8. **Footer**: Información de contacto y redes sociales

## 📱 Integración WhatsApp

Todos los botones "Lo quiero" redirigen a WhatsApp con mensajes personalizados:

- **Servicios**: Incluye nombre del servicio y paquete seleccionado
- **Ofertas**: Incluye nombre de la oferta específica
- **Número**: +51 932 531 871

Ejemplo de mensaje:
```
Hola, quiero el servicio Aplicación Web – Plan Profesional de Gaming Digital.
```

## 🔐 Panel de Administración

Accede en: `/admin`

**Contraseña por defecto**: `gaming2024`

### Funcionalidades:
- Ver todos los servicios configurados
- Activar/desactivar ofertas
- Eliminar ofertas
- Las ofertas inactivas no se muestran en el sitio

### Datos Persistentes:
Los datos se guardan en `localStorage` del navegador:
- `gamingDigitalServices`: Servicios
- `gamingDigitalOffers`: Ofertas
- `adminAuth`: Estado de autenticación

## 🌐 Despliegue en Render

### Opción 1: Static Site (Recomendado)

1. Conecta tu repositorio de GitHub a Render
2. Crea un nuevo **Static Site**
3. Configuración:
   - **Build Command**: `bun install && bun run build`
   - **Publish Directory**: `out`
4. Agrega variable de entorno:
   - `NODE_VERSION`: `20`

### Opción 2: Web Service

1. Crea un nuevo **Web Service**
2. Configuración:
   - **Build Command**: `bun install && bun run build`
   - **Start Command**: `bun start`
3. Variables de entorno:
   - `NODE_VERSION`: `20`

### Exportación Estática

Para generar un sitio estático, actualiza `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

Luego ejecuta:
```bash
bun run build
```

Esto generará la carpeta `out/` lista para desplegar.

## 🎨 Personalización

### Cambiar Colores
Edita `src/app/globals.css` para modificar los colores del tema:
- Cyan: `#00ffff`
- Blue: `#0080ff`
- Purple: `#a855f7`

### Agregar Servicios
Edita `src/components/Services.tsx` y modifica el array `defaultServices`.

### Agregar Ofertas
Edita `src/components/Offers.tsx` y modifica el array `defaultOffers`.

### Cambiar Número de WhatsApp
Busca y reemplaza `51932531871` en todos los archivos.

## 📊 Optimizaciones

- **Lazy Loading**: Componentes se cargan bajo demanda
- **Animaciones CSS**: Uso de CSS puro para mejor rendimiento
- **Canvas Optimizado**: Animación de partículas con requestAnimationFrame
- **Intersection Observer**: Animaciones solo cuando son visibles
- **Tailwind CSS**: Purga automática de estilos no usados

## 🐛 Solución de Problemas

### Error de TypeScript
```bash
bun typecheck
```

### Error de ESLint
```bash
bun lint
```

### Limpiar caché
```bash
rm -rf .next node_modules
bun install
```

## 📝 Licencia

© 2024 Gaming Digital. Todos los derechos reservados.

## 📞 Contacto

- **WhatsApp**: +51 932 531 871
- **Email**: contacto@gamingdigital.com
- **Ubicación**: Lima, Perú

---

Desarrollado con ❤️ por Gaming Digital
