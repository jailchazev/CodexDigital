# Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu landing page de Gaming Digital en Render como un sitio estático.

## 📋 Requisitos Previos

1. Cuenta en [Render](https://render.com) (gratis)
2. Repositorio de GitHub con el código
3. Git instalado localmente

## 🚀 Pasos para Desplegar

### 1. Preparar el Repositorio

Primero, asegúrate de que tu código esté en GitHub:

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: Gaming Digital landing page"

# Agregar remote (reemplaza con tu URL de GitHub)
git remote add origin https://github.com/tu-usuario/gaming-digital.git

# Push al repositorio
git push -u origin main
```

### 2. Crear Static Site en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"Static Site"**
3. Conecta tu repositorio de GitHub
4. Selecciona el repositorio de Gaming Digital

### 3. Configurar el Static Site

Usa la siguiente configuración:

| Campo | Valor |
|-------|-------|
| **Name** | `gaming-digital` (o el nombre que prefieras) |
| **Branch** | `main` |
| **Build Command** | `bun install && bun run build` |
| **Publish Directory** | `out` |

### 4. Variables de Entorno (Opcional)

Si necesitas agregar variables de entorno:

1. En la configuración del sitio, ve a **"Environment"**
2. Agrega las variables necesarias

Para este proyecto no son necesarias variables de entorno.

### 5. Desplegar

1. Click en **"Create Static Site"**
2. Render comenzará a construir tu sitio
3. Espera a que termine el build (2-5 minutos)
4. Una vez completado, tu sitio estará disponible en: `https://gaming-digital.onrender.com`

## 🔄 Actualizaciones Automáticas

Render detecta automáticamente cambios en tu repositorio:

1. Haz cambios en tu código local
2. Commit y push a GitHub:
   ```bash
   git add .
   git commit -m "Descripción de los cambios"
   git push
   ```
3. Render automáticamente reconstruirá y desplegará tu sitio

## 🌐 Dominio Personalizado

Para usar tu propio dominio:

1. En Render Dashboard, ve a tu sitio
2. Click en **"Settings"** → **"Custom Domain"**
3. Agrega tu dominio (ej: `www.gamingdigital.com`)
4. Configura los DNS según las instrucciones de Render

### Configuración DNS

Agrega estos registros en tu proveedor de DNS:

| Tipo | Nombre | Valor |
|------|--------|-------|
| CNAME | www | `gaming-digital.onrender.com` |
| A | @ | IP proporcionada por Render |

## 🐛 Solución de Problemas

### Error: Build Failed

Si el build falla:

1. Revisa los logs en Render Dashboard
2. Verifica que el comando de build sea correcto
3. Asegúrate de que `bun.lock` esté en el repositorio

### Error: Page Not Found

Si ves 404 después del despliegue:

1. Verifica que `Publish Directory` sea `out`
2. Asegúrate de que `next.config.ts` tenga `output: 'export'`
3. Reconstruye el sitio

### Build Muy Lento

Si el build tarda mucho:

1. Considera usar un plan de pago de Render (más rápido)
2. Optimiza las dependencias
3. Usa caché de build (automático en Render)

## 📊 Monitoreo

Render proporciona:

- **Logs en tiempo real**: Ver el proceso de build
- **Métricas de tráfico**: Visitas y ancho de banda
- **Historial de deploys**: Ver versiones anteriores

## 💰 Costos

- **Plan Free**: Gratis, con limitaciones
  - 100 GB de ancho de banda/mes
  - Sitios ilimitados
  - SSL automático

- **Plan Starter**: $7/mes
  - 100 GB de ancho de banda
  - Builds más rápidos
  - Soporte prioritario

## 🔒 SSL/HTTPS

Render proporciona SSL automático y gratuito para todos los sitios, incluyendo dominios personalizados.

## 📝 Checklist de Despliegue

- [ ] Código en GitHub
- [ ] Cuenta en Render creada
- [ ] Static Site configurado
- [ ] Build exitoso
- [ ] Sitio accesible
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL activo
- [ ] Pruebas en diferentes dispositivos

## 🎯 Próximos Pasos

Después del despliegue:

1. **Prueba todas las funcionalidades**:
   - Botones de WhatsApp
   - Animaciones
   - Responsive design
   - Panel de administración (`/admin`)

2. **Optimiza el SEO**:
   - Verifica meta tags
   - Agrega Google Analytics
   - Configura Search Console

3. **Monitorea el rendimiento**:
   - Usa Lighthouse
   - Revisa Core Web Vitals
   - Optimiza imágenes si es necesario

## 📞 Soporte

Si tienes problemas:

1. Revisa la [documentación de Render](https://render.com/docs/static-sites)
2. Consulta los logs de build
3. Contacta al soporte de Render

---

¡Tu landing page de Gaming Digital está lista para el mundo! 🚀
