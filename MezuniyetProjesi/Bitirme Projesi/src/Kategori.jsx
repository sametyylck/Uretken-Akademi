// Marka.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const Kategori = () => {
  const [markaList, setMarkaList] = useState([]);
  const [selectedMarka, setSelectedMarka] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewMarkaModal, setShowNewMarkaModal] = useState(false);
  const [newMarka, setNewMarka] = useState({
    ad: '',
  });

  useEffect(() => {
    // API'den Kategori listesini al
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7223/api/Kategori/List');
        setMarkaList(response.data);
      } catch (error) {
        console.error('Error fetching Kategori list:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (marka) => {
    // Düzenleme için seçili Kategori bilgilerini al ve modal'ı aç
    setSelectedMarka(marka);
    setShowEditModal(true);
  };

  const handleDelete = (markaId) => {
    // Silme için markaId'yi API'ye gönder
    axios.delete(`https://localhost:7223/api/Kategori/Delete?id=${markaId}`)
    .then(response => {
      // İşlem başarılıysa burada response nesnesini inceleyebilirsiniz
      setMarkaList((prevMarkaList) => prevMarkaList.filter((marka) => marka.id !== markaId));
      console.log(response); // Tüm response nesnesi
    })
    .catch(error => {
      // İşlem başarısızsa burada response nesnesini inceleyebilirsiniz
      alert(error.response.data); // Tüm error nesnesi
    });
  };

  const handleSaveEdit = () => {
    // Düzenleme işlemi için API'ye güncellenmiş bilgileri gönder
    axios.put(`https://localhost:7223/api/Kategori/Update`, selectedMarka)
      .then(() => {
        // Düzenleme işlemi başarılıysa Marka listesini güncelle ve modal'ı kapat
        setMarkaList((prevMarkaList) => prevMarkaList.map((marka) => (marka.id === selectedMarka.id ? selectedMarka : marka)));
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Error updating Kategori:', error);
      });
  };

  const handleAddNewMarka = () => {
    // Yeni marka ekleme işlemi için API'ye yeni marka bilgilerini gönder
    axios.post('https://localhost:7223/api/Kategori/Insert', { ad: newMarka.ad })
      .then((response) => {
        // Ekleme işlemi başarılıysa Marka listesini güncelle, modal'ı kapat ve yeni marka bilgilerini sıfırla
        setMarkaList((prevMarkaList) => [...prevMarkaList, response.data]);
        setShowNewMarkaModal(false);
        setNewMarka({
          ad: '',
        });
      })
      .catch((error) => {
        console.error('Error adding new Kategori:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Kategori</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Düzenle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {markaList.map((marka) => (
            <tr key={marka.id}>
              <td>{marka.ad}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(marka)}>Düzenle</Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(marka.id)}>Sil</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => setShowNewMarkaModal(true)}>Yeni Ekle</Button>

      {/* Düzenleme Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAd">
              <Form.Label>Ad</Form.Label>
              <Form.Control
                type="text"
                value={selectedMarka ? selectedMarka.ad : ''}
                onChange={(e) => setSelectedMarka({ ...selectedMarka, ad: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Kapat</Button>
          <Button variant="primary" onClick={handleSaveEdit}>Kaydet</Button>
        </Modal.Footer>
      </Modal>

      {/* Yeni Ekle Modal */}
      <Modal show={showNewMarkaModal} onHide={() => setShowNewMarkaModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAd">
              <Form.Label>Ad</Form.Label>
              <Form.Control
                type="text"
                value={newMarka.ad}
                onChange={(e) => setNewMarka({ ...newMarka, ad: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewMarkaModal(false)}>Kapat</Button>
          <Button variant="primary" onClick={handleAddNewMarka}>Ekle</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Kategori;
