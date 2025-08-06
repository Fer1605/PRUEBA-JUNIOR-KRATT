const pool = require('../config/db');

// Crear proveedor
const createProvider = async (req, res) => {
  const {
    company_name,
    contact_person,
    email,
    supplier_type,
    nit_or_rtu,
    phone,
    city
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO providers (company_name, contact_person, email, supplier_type, nit_or_rtu, phone, city)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [company_name, contact_person, email, supplier_type, nit_or_rtu, phone, city]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear proveedor:', err);
    res.status(500).json({ message: 'Error al registrar proveedor' });
  }
};

// Obtener todos los proveedores
const getAllProviders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM providers ORDER BY created_at DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};

// Buscar proveedores por nombre o tipo
const searchProviders = async (req, res) => {
  const { name, type } = req.query;

  try {
    const result = await pool.query(
      `SELECT * FROM providers
       WHERE company_name ILIKE $1 OR supplier_type ILIKE $2`,
      [`%${name || ''}%`, `%${type || ''}%`]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar proveedores' });
  }
};

// Editar proveedor
const updateProvider = async (req, res) => {
  const { id } = req.params;
  const {
    company_name,
    contact_person,
    email,
    supplier_type,
    nit_or_rtu,
    phone,
    city
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE providers
       SET company_name = $1, contact_person = $2, email = $3,
           supplier_type = $4, nit_or_rtu = $5, phone = $6, city = $7
       WHERE id = $8
       RETURNING *`,
      [company_name, contact_person, email, supplier_type, nit_or_rtu, phone, city, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar proveedor' });
  }
};

// Eliminar proveedor
const deleteProvider = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM providers WHERE id = $1', [id]);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
};

module.exports = {
  createProvider,
  getAllProviders,
  searchProviders,
  updateProvider,
  deleteProvider
};
