# ⚡ Setup Rápido: Cuentas Bancarias

## 🎯 ¿Qué hace esta funcionalidad?

Permite configurar múltiples cuentas bancarias en Google Sheets y seleccionar cuáles mostrar en cada cotización PDF.

## 📋 Setup en 3 Pasos

### 1️⃣ Crear hoja "CuentasBancarias" en Google Sheets

Abre tu Google Sheet y crea una nueva hoja con este nombre exacto: **CuentasBancarias**

### 2️⃣ Agregar encabezados (fila 1)

```
| Banco | Moneda | Número de Cuenta | CCI | Tipo de Cuenta |
```

### 3️⃣ Agregar tus cuentas (desde fila 2)

**Ejemplo:**
```
Banco de Crédito del Perú (BCP) | USD | 194-2345678-1-00 | 002-194-002345678100-12 | Corriente
Banco de Crédito del Perú (BCP) | PEN | 194-2345679-1-01 | 002-194-002345679101-13 | Corriente
Interbank | USD | 200-3001234567 | 003-200-003001234567-45 | Ahorros
BBVA Continental | PEN | 0011-0567-0123456789 | 011-567-000123456789-01 | Corriente
```

## ✅ ¡Listo!

Recarga la aplicación y verás:

1. **En la sección "Configuración de Envío"**: Checkboxes para seleccionar qué cuentas incluir
2. **Por defecto**: Todas las cuentas están seleccionadas
3. **En el PDF**: Las cuentas seleccionadas aparecen al final con formato profesional

## 📝 Campos Explicados

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Banco** | Nombre completo del banco | Banco de Crédito del Perú (BCP) |
| **Moneda** | Código de moneda (3 letras) | USD, PEN, EUR |
| **Número de Cuenta** | Tu número de cuenta | 194-2345678-1-00 |
| **CCI** | Código de Cuenta Interbancario | 002-194-002345678100-12 |
| **Tipo de Cuenta** | Tipo de cuenta bancaria | Corriente, Ahorros |

## 🎨 Resultado en el PDF

```
═══════════════════════════════════════════════
Datos Bancarios:

• Banco de Crédito del Perú (BCP) (USD)
  Cuenta Corriente: 194-2345678-1-00
  CCI: 002-194-002345678100-12

• Interbank (PEN)
  Cuenta Ahorros: 200-3001234567
  CCI: 003-200-003001234567-45
═══════════════════════════════════════════════
```

## 💡 Tips

- ✅ Puedes agregar todas las cuentas que necesites
- ✅ Soporta cualquier moneda (USD, PEN, EUR, GBP, etc.)
- ✅ Puedes tener múltiples cuentas del mismo banco
- ✅ Las cuentas se cargan automáticamente al iniciar la app
- ✅ Selecciona solo las cuentas relevantes para cada cliente

## ⚠️ Importante

- Los 5 campos son **obligatorios**
- El nombre de la hoja debe ser exactamente **"CuentasBancarias"** (sin espacios, mayúsculas/minúsculas importan)
- La fila 1 debe tener los encabezados
- Los datos empiezan en la fila 2

## 🔧 Troubleshooting

**No veo las cuentas en la app:**
1. Verifica que la hoja se llama "CuentasBancarias"
2. Verifica que los encabezados están en la fila 1
3. Recarga la página (F5)

**Las cuentas no aparecen en el PDF:**
1. Asegúrate de seleccionar al menos una cuenta (checkbox marcado)
2. Verifica que todos los campos tengan datos

**Error al cargar cuentas:**
1. Revisa la consola del navegador (F12)
2. Verifica permisos de Google Sheets
3. Asegúrate de que el Service Account tiene acceso al Sheet

---

📖 **Documentación completa**: Ver [CONFIGURAR-COTIZACIONES.md](./CONFIGURAR-COTIZACIONES.md)
