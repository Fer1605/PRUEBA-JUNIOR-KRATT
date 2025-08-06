import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProviderForm from '../components/ProviderForm';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
  const [providers, setProviders] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProvider, setEditingProvider] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [showSearchMessage, setShowSearchMessage] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  const navigate = useNavigate();
  const formRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchProviders();
  }, []);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm]);

  const fetchProviders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/providers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProviders(response.data);
    } catch (err) {
      console.error('Error al obtener proveedores:', err);
    }
  };

  const showMessage = (msg) => {
    setSearchMessage(msg);
    setShowSearchMessage(true);
    setTimeout(() => setShowSearchMessage(false), 5000);
  };

  const handleSearch = async () => {
    setShowSearchMessage(false);

    if (!searchName.trim() && !searchType.trim()) {
      fetchProviders();
      showMessage('🔎 Búsqueda realizada con éxito');
      return;
    }

    const invalidChars = /[^a-zA-Z\sáéíóúÁÉÍÓÚñÑ]/;
    if (invalidChars.test(searchName) || invalidChars.test(searchType)) {
      showMessage('❌ Caracteres inválidos en la búsqueda. Solo letras permitidas.');
      return;
    }

    try {
      const params = new URLSearchParams();
      if (searchName.trim()) params.append('name', searchName.trim());
      if (searchType.trim()) params.append('type', searchType.trim());

      const response = await axios.get(
        `http://localhost:4000/api/providers/search?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      let results = response.data;

      if (searchName.trim()) {
        const nameLower = searchName.trim().toLowerCase();
        results = results.sort((a, b) => {
          const aMatch = a.company_name.toLowerCase().includes(nameLower);
          const bMatch = b.company_name.toLowerCase().includes(nameLower);
          return bMatch - aMatch;
        });
      }

      if (searchType.trim()) {
        const typeLower = searchType.trim().toLowerCase();
        results = results.sort((a, b) => {
          const aMatch = a.supplier_type.toLowerCase().includes(typeLower);
          const bMatch = b.supplier_type.toLowerCase().includes(typeLower);
          return bMatch - aMatch;
        });
      }

      setProviders(results);

      if (results.length === 0) {
        showMessage('❌ No se encontraron resultados');
      } else {
        showMessage('🔎 Búsqueda realizada con éxito');
      }

      setSearchName('');
      setSearchType('');
    } catch (err) {
      console.error('Error al buscar proveedores:', err);
    }
  };

  const handleDelete = async () => {
    if (!providerToDelete) return;
    try {
      await axios.delete(`http://localhost:4000/api/providers/${providerToDelete}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProviders();
      setProviderToDelete(null);
      setShowConfirmModal(false);
    } catch (err) {
      console.error('Error al eliminar proveedor:', err);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Panel de Proveedores</h2>

        {showSearchMessage && (
          <div className="search-message">{searchMessage}</div>
        )}

        <form className="dashboard-search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Buscar por tipo"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Buscar
          </button>
        </form>

        <button className="button" onClick={() => {
          setEditingProvider(null);
          setShowForm(true);
        }}>
          Nuevo proveedor
        </button>

        {showForm && (
          <div ref={formRef}>
            <ProviderForm
              providerToEdit={editingProvider}
              onSuccess={() => {
                setShowForm(false);
                setEditingProvider(null);
                fetchProviders();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingProvider(null);
              }}
            />
          </div>
        )}

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Contacto</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>NIT/RTU</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((prov) => (
              <tr key={prov.id}>
                <td>{prov.company_name}</td>
                <td>{prov.contact_person}</td>
                <td>{prov.email}</td>
                <td>{prov.supplier_type}</td>
                <td>{prov.nit_or_rtu}</td>
                <td>{prov.phone}</td>
                <td>{prov.city}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="button action-button"
                      onClick={() => {
                        setEditingProvider(prov);
                        setShowForm(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="button delete-button"
                      onClick={() => {
                        setProviderToDelete(prov.id);
                        setShowConfirmModal(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showConfirmModal && (
          <ConfirmModal
            message="¿Estás segura de que deseas eliminar este proveedor?"
            onConfirm={handleDelete}
            onCancel={() => {
              setShowConfirmModal(false);
              setProviderToDelete(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;