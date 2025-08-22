# Implementación de Internacionalización (i18n) en el Navegador

## ¿Qué se implementó?

Se ha agregado funcionalidad de traducción automática a la barra de navegación del portafolio, permitiendo cambiar entre español e inglés.

## Archivos modificados/creados:

### 1. Archivos de traducción
- `public/locales/es/traducion.json` - Traducciones en español
- `public/locales/en/traducion.json` - Traducciones en inglés

### 2. Configuración de i18next
- `src/config/i18next.config.js` - Configuración del sistema de traducción

### 3. Componente Navegador
- `src/components/menu/Navegador.tsx` - Integrado con el sistema de traducción

### 4. Archivo principal
- `src/main.tsx` - Importa la configuración de i18next

## ¿Cómo funciona?

1. **Al cargar la página**: Se inicializa i18next con español como idioma por defecto
2. **Al hacer clic en "Idiomas"**: Se abre un submenú con opciones de idioma
3. **Al seleccionar inglés**: 
   - Se ejecuta `i18n.changeLanguage('en')`
   - Se actualiza automáticamente todo el texto del navegador
   - Se cierra el menú móvil

## Traducciones implementadas:

| Español | Inglés |
|---------|--------|
| Sobre mi | About me |
| Tecnologías | Technologies |
| Experiencia | Experience |
| Proyectos | Projects |
| Idiomas | Languages |
| Menú | Menu |

## Características técnicas:

- **useTranslation hook**: Proporciona las funciones `t()` para traducir y `i18n` para cambiar idioma
- **useMemo**: Optimiza el rendimiento recalculando las opciones del menú solo cuando cambia el idioma
- **Estado local**: Mantiene el idioma seleccionado en el estado del componente
- **Cierre automático**: El menú se cierra automáticamente después de cambiar el idioma

## Uso:

1. Abre el menú móvil (botón hamburguesa)
2. Toca en "Idiomas"
3. Selecciona "English" o "Español"
4. El navegador se traducirá automáticamente

## Dependencias utilizadas:

- `i18next`: Motor de traducción
- `react-i18next`: Integración con React
- `i18next-http-backend`: Carga de archivos de traducción

## Notas importantes:

- Los archivos de traducción deben estar en `public/locales/`
- El idioma por defecto es español
- Las traducciones se cargan dinámicamente desde archivos JSON
- El sistema es escalable para agregar más idiomas en el futuro 