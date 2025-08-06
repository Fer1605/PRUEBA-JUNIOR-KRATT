import { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderForm = ({ providerToEdit, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    company_name: '',
    contact_person: '',
    email: '',
    supplier_type: '',
    nit_or_rtu: '',
    phone: '',
    city: ''
  });

  const [nitError, setNitError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (providerToEdit) {
      setFormData(providerToEdit);
    }
  }, [providerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && /[^0-9+]/.test(value)) return;
    if (name === 'nit_or_rtu' && /[^a-zA-Z0-9\-]/.test(value)) return;

    setFormData({ ...formData, [name]: value });
    if (name === 'nit_or_rtu') setNitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      return; // la validación HTML de tipo email ya maneja esto
    }

    if (!/\d/.test(formData.nit_or_rtu)) {
      setNitError('El campo NIT o RTU debe contener al menos un número.');
      return;
    }

    try {
      if (providerToEdit) {
        await axios.put(`http://localhost:4000/api/providers/${formData.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        const dataToSend = { ...formData };
        delete dataToSend.id;
        await axios.post('http://localhost:4000/api/providers', dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      onSuccess();
    } catch (err) {
      console.error('Error al guardar proveedor:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="provider-form">
      <h3>{providerToEdit ? 'Editar proveedor' : 'Agregar proveedor'}</h3>

      <div className="provider-form-fields horizontal-layout">
        {providerToEdit && (
          <div className="field-group">
            <label htmlFor="id">ID</label>
            <input
              className="input read-only"
              name="id"
              id="id"
              value={formData.id}
              readOnly
            />
          </div>
        )}

        <div className="field-group">
          <label htmlFor="company_name">Nombre de empresa</label>
          <input
            className="input"
            name="company_name"
            id="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="contact_person">Persona de contacto</label>
          <input
            className="input"
            name="contact_person"
            id="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="supplier_type">Tipo de proveedor</label>
          <input
            className="input"
            name="supplier_type"
            id="supplier_type"
            value={formData.supplier_type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="nit_or_rtu">NIT o RTU</label>
          <input
            className="input"
            name="nit_or_rtu"
            id="nit_or_rtu"
            value={formData.nit_or_rtu}
            onChange={handleChange}
            required
          />
          {nitError && <p className="error">{nitError}</p>}
        </div>

        <div className="field-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            className="input"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field-group">
          <label htmlFor="city">Ciudad</label>
          <input
            className="input"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="provider-form-buttons">
        <button type="submit" className="button">
          {providerToEdit ? 'Actualizar proveedor' : 'Agregar proveedor'}
        </button>
        {onCancel && (
          <button type="button" className="button delete-button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProviderForm;