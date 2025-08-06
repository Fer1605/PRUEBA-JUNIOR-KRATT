# 🛠️ Panel de Gestión de Proveedores - Proyecto Kratt

Este proyecto es una aplicación Full Stack para la gestión eficiente de proveedores, desarrollada como prueba técnica. Permite registrar, buscar, editar y eliminar proveedores, almacenando los datos en una base de datos PostgreSQL. Su diseño es responsivo y amigable, con validaciones de entrada y confirmaciones de acciones críticas.

## 🔍 Funcionalidades

- Ver listado de proveedores
- Buscar proveedores por nombre y tipo
- Agregar nuevos proveedores
- Editar proveedores existentes
- Eliminar proveedores con confirmación visual
- Validaciones inteligentes en formularios (correo, NIT/RTU, etc.)

## 🧹 Tecnologías Utilizadas

- **Frontend:** React + Vite + CSS personalizado
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL (pgAdmin)
- **Autenticación:** JSON Web Token (JWT)

---

## 📦 Instalación Local

### 🔧 1. Requisitos Previos

Asegúrate de tener instalados:

- [Node.js (v18+ recomendado)](https://nodejs.org/)
- [PostgreSQL (v17)](https://www.postgresql.org/)
- [pgAdmin 4](https://www.pgadmin.org/)
- Git (opcional, pero recomendado)

---

### 🩱 2. Clonar el Repositorio
Puedes utilizar git clone o bien hacer uso de la opción clonar repositorio remoto en VSCode.
```bash
git clone https://github.com/Fer1605/PRUEBA-JUNIOR-KRATT.git
```

---

### 📁 3. Restaurar Base de Datos

1. Abre **pgAdmin** y conéctate a tu servidor PostgreSQL local.
2. Crea una nueva base de datos llamada `kratt_db`.
3. Haz clic derecho sobre `kratt_db` → **Restore**.
4. En **Filename**, selecciona el archivo `kratt_providers.sql` ubicado dentro del repositorio.
5. Pulsa en **Restore** y espera la confirmación exitosa.
6. Repite el proceso de restauración, esta vez seleccionando el archivo `kratt_admins.sql`.

> 📌 **Nota:**
> - El archivo `kratt_providers.sql` contiene una tabla `providers` precargada con proveedores de ejemplo.
> - El archivo `kratt_admins.sql` contiene la tabla `admins`, la cual es necesaria para poder iniciar sesión en la aplicación.
> - Ambos archivos están incluidos en el repositorio y deben restaurarse en la misma base de datos `kratt_db`.

---

### 🛠️ 4. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` dentro de la carpeta `backend` con la siguiente estructura:

```env
PORT=4000
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kratt_db
JWT_SECRET=kratt_secret_key
```

> 💡 Asegúrate de cambiar `DB_PASSWORD` por la contraseña real de tu PostgreSQL al igual que `DB_USER=postgres` en caso que tu usuario sea diferente.

Luego ejecuta:

```bash
npm run dev
```

---

### 🎨 5. Levantar el Frontend

```bash
cd ../frontend
npm install
npm run dev
```

El frontend estará disponible por defecto en `http://localhost:5173`

---

## ✅ Acceso y Uso

1. Abre la app en tu navegador (`http://localhost:5173`).
2. Inicia sesión.
3. Interactúa con el panel para gestionar tus proveedores.

---

## 🤝 Contribuciones

Este proyecto fue desarrollado por **Fer Santizo** como prueba técnica para **Kratt**.

---

## 📂 Estructura General

```plaintext
kratt-project/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.jsx
├── kratt_providers.sql
├── kratt_admins.sql
├── README.md
└── .gitignore
```

---

