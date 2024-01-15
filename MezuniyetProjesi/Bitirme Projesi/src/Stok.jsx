import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const Stok = () => {
  const [stokList, setStokList] = useState([]);
  const [departmanList, setDepartmanList] = useState([]);
  const [kategoriList, setKategoriList] = useState([]);
  const [markaList, setMarkaList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStok, setSelectedStok] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartman, setSelectedDepartman] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedMarka, setSelectedMarka] = useState("");
  const [showNewStokModal, setShowNewStokModal] = useState(false);
  const [newStok, setNewStok] = useState({
    ad: "",
    ozellik: "",
    fiyat: "",
    dp_id: "",
    kategori_id: "",
    marka_id: "",
  });

  useEffect(() => {
    axios
      .get("https://localhost:7223/api/Stok/List")
      .then((response) => setStokList(response.data))
      .catch((error) => console.error("Error fetching Stok list:", error));

    axios
      .get("https://localhost:7223/api/Departman/List")
      .then((response) => setDepartmanList(response.data))
      .catch((error) => console.error("Error fetching Departman list:", error));

    axios
      .get("https://localhost:7223/api/Kategori/List")
      .then((response) => setKategoriList(response.data))
      .catch((error) => console.error("Error fetching Kategori list:", error));

    axios
      .get("https://localhost:7223/api/Marka/List")
      .then((response) => setMarkaList(response.data))
      .catch((error) => console.error("Error fetching Marka list:", error));
  }, []);

  const handleEdit = (stok) => {
    // Düzenleme için seçili stok bilgilerini al ve modal'ı aç
    setSelectedStok(stok);
    setShowEditModal(true);
  };

  const handleDelete = (stokId) => {
    axios
      .delete(`https://localhost:7223/api/Stok/Delete?id=${stokId}`)
      .then((response) => {
        if (response.status === 200) {
          // Başarılı DELETE işlemi
          setStokList((prevStokList) =>
            prevStokList.filter((stok) => stok.id !== stokId)
          );
        } else {
          console.error(
            `Error deleting Stok with ID ${stokId}: Unexpected status code ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.error(`Error deleting Stok with ID ${stokId}:`, error);
      });
  };

  const handleSaveEdit = () => {
    axios({
      method: "put",
      url: `https://localhost:7223/api/Stok/Update`,
      data: {
        id: selectedStok.id,
        ad: selectedStok.ad,
        ozellik: selectedStok.ozellik,
        fiyat: selectedStok.fiyat,
        kategori_id: selectedStok.kategori_id,
        marka_id: selectedStok.marka_id,
        dp_id: selectedStok.dp_id, // Burada dp_id'yi güncelliyoruz
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      // Düzenleme işlemi tamamlandıktan sonra stok listesini güncelle
      axios
        .get("https://localhost:7223/api/Stok/List")
        .then((response) => setStokList(response.data))
        .catch((error) => console.error("Error fetching Stok list:", error));

      setShowEditModal(false);
    })
    .catch((error) => {
      console.error("Error updating Stok:", error);
    });
  };

  const handleAddNewStok = () => {
    axios
      .post("https://localhost:7223/api/Stok/Insert", newStok)
      .then((response) => {
        setStokList((prevStokList) => [...prevStokList, response.data]);
        setShowNewStokModal(false);
        setNewStok({
          ad: "",
          ozellik: "",
          fiyat: "",
          dp_id: "",
          kategori_id: "",
          marka_id: "",
        });
      })
      .catch((error) => {
        console.error("Error adding new Stok:", error);
      });
  };
  const handleSearch = () => {
    const departmanFilter = selectedDepartman === '' ? null : selectedDepartman;
  const kategoriFilter = selectedKategori === '' ? null : selectedKategori;
  const markaFilter = selectedMarka === '' ? null : selectedMarka;

  // API'ye kelime arama ve filtreleme isteğini gönder
  axios.post(`https://localhost:7223/api/Stok/Arama`, {
    kelime: searchTerm,
    dp_id: departmanFilter,
    kategori_id: kategoriFilter,
    marka_id: markaFilter,
  })
    .then(response => setStokList(response.data))
    .catch(error => console.error('Error searching Stok:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Stok</h2>
      {/* Arama ve Filtreleme Formu */}
      <Form className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <Form.Group controlId="formSearch">
              <Form.Label>Kelime Arama:</Form.Label>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-2">
            <Form.Group controlId="formDepartman">
              <Form.Label>Departman:</Form.Label>
              <Form.Control
                as="select"
                value={selectedDepartman}
                onChange={(e) => setSelectedDepartman(e.target.value)}
              >
                <option value="">Tümü</option>
                {departmanList.map((departman) => (
                  <option key={departman.id} value={departman.id}>
                    {departman.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-2">
            <Form.Group controlId="formKategori">
              <Form.Label>Kategori:</Form.Label>
              <Form.Control
                as="select"
                value={selectedKategori}
                onChange={(e) => setSelectedKategori(e.target.value)}
              >
                <option value="">Tümü</option>
                {kategoriList.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-2">
            <Form.Group controlId="formMarka">
              <Form.Label>Marka:</Form.Label>
              <Form.Control
                as="select"
                value={selectedMarka}
                onChange={(e) => setSelectedMarka(e.target.value)}
              >
                <option value="">Tümü</option>
                {markaList.map((marka) => (
                  <option key={marka.id} value={marka.id}>
                    {marka.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-md-2 align-self-end">
            <Button variant="primary" onClick={handleSearch}>
              Ara
            </Button>
          </div>
        </div>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Özellik</th>
            <th>Fiyat</th>
            <th>Departman</th>
            <th>Kategori</th>
            <th>Marka</th>
            <th>Düzenle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {stokList.map((stok) => (
            <tr key={stok.id}>
              <td>{stok.ad}</td>
              <td>{stok.ozellik}</td>
              <td>{stok.fiyat}</td>
              <td>
                {departmanList.find((dep) => dep.id === stok.dp_id)?.ad ||
                  "N/A"}
              </td>
              <td>
                {kategoriList.find((kat) => kat.id === stok.kategori_id)?.ad ||
                  "N/A"}
              </td>
              <td>
                {markaList.find((mar) => mar.id === stok.marka_id)?.ad || "Boş"}
              </td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(stok)}>
                  Düzenle
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(stok.id)}>
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={() => setShowNewStokModal(true)}>
        Yeni Ekle
      </Button>

      {/* Yeni Ekle Modal */}
      <Modal show={showNewStokModal} onHide={() => setShowNewStokModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAd">
              <Form.Label>Ad</Form.Label>
              <Form.Control
                type="text"
                value={newStok.ad}
                onChange={(e) => setNewStok({ ...newStok, ad: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formOzellik">
              <Form.Label>Özellik</Form.Label>
              <Form.Control
                type="text"
                value={newStok.ozellik}
                onChange={(e) =>
                  setNewStok({ ...newStok, ozellik: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFiyat">
              <Form.Label>Fiyat</Form.Label>
              <Form.Control
                type="number"
                value={newStok.fiyat}
                onChange={(e) =>
                  setNewStok({ ...newStok, fiyat: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDepartman">
              <Form.Label>Departman</Form.Label>
              <Form.Control
                as="select"
                value={newStok.dp_id}
                onChange={(e) =>
                  setNewStok({ ...newStok, dp_id: e.target.value })
                }
              >
                <option value="">Departman Seçin</option>
                {departmanList.map((departman) => (
                  <option key={departman.id} value={departman.id}>
                    {departman.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formKategori">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={newStok.kategori_id}
                onChange={(e) =>
                  setNewStok({ ...newStok, kategori_id: e.target.value })
                }
              >
                <option value="">Kategori Seçin</option>
                {kategoriList.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMarka">
              <Form.Label>Marka</Form.Label>
              <Form.Control
                as="select"
                value={newStok.marka_id}
                onChange={(e) =>
                  setNewStok({ ...newStok, marka_id: e.target.value })
                }
              >
                <option value="">Marka Seçin</option>
                {markaList.map((marka) => (
                  <option key={marka.id} value={marka.id}>
                    {marka.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowNewStokModal(false)}
          >
            Kapat
          </Button>
          <Button variant="primary" onClick={handleAddNewStok}>
            Ekle
          </Button>
        </Modal.Footer>
      </Modal>
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
                value={selectedStok ? selectedStok.ad : ""}
                onChange={(e) =>
                  setSelectedStok({ ...selectedStok, ad: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formOzellik">
              <Form.Label>Özellik</Form.Label>
              <Form.Control
                type="text"
                value={selectedStok ? selectedStok.ozellik : ""}
                onChange={(e) =>
                  setSelectedStok({ ...selectedStok, ozellik: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFiyat">
              <Form.Label>Fiyat</Form.Label>
              <Form.Control
                type="number"
                value={selectedStok ? selectedStok.fiyat : ""}
                onChange={(e) =>
                  setSelectedStok({ ...selectedStok, fiyat: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDepartman">
              <Form.Label>Departman</Form.Label>
              <Form.Control
                as="select"
                value={selectedStok ? selectedStok.dp_id : ""}
                onChange={(e) =>
                  setSelectedStok({ ...selectedStok, dp_id: e.target.value })
                }
              >
                <option value="">Departman Seçin</option>
                {departmanList.map((departman) => (
                  <option key={departman.id} value={departman.id}>
                    {departman.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formKategori">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={selectedStok ? selectedStok.kategori_id : ""}
                onChange={(e) =>
                  setSelectedStok({
                    ...selectedStok,
                    kategori_id: e.target.value,
                  })
                }
              >
                <option value="">Kategori Seçin</option>
                {kategoriList.map((kategori) => (
                  <option key={kategori.id} value={kategori.id}>
                    {kategori.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formMarka">
              <Form.Label>Marka</Form.Label>
              <Form.Control
                as="select"
                value={selectedStok ? selectedStok.marka_id : ""}
                onChange={(e) =>
                  setSelectedStok({ ...selectedStok, marka_id: e.target.value })
                }
              >
                <option value="">Marka Seçin</option>
                {markaList.map((marka) => (
                  <option key={marka.id} value={marka.id}>
                    {marka.ad}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Stok;
