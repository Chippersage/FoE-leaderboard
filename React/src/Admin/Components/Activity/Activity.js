import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../Styles/Activity.css';
import Sidebar from '../../../Admin/Components/Sidebar/Sidebar';
import Header from '../../../Admin/Components/Header/Header';

const Activity = () => {
  const [activityURL, setActivityURL] = useState('');
  const [activities, setActivities] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://iiiqai.com/activity_url/get_URL_API.php');
        const data = await response.json();

        if (data.status === 1 && data.response === 'success') {
          setActivities(data.data);
        } else {
          console.error('Error fetching activities:', data.message);
        }
      } catch (error) {
        console.error('Network error while fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Add new activity (mock implementation for UI)
  const handleAddActivity = () => {
    if (activityURL) {
      const newActivity = { id: activities.length + 1, url: activityURL };
      setActivities([...activities, newActivity]);
      setActivityURL('');
      setShowModal(false);
    }
  };

  // Start editing an activity
  const handleEditActivity = (activity) => {
    setIsEditing(true);
    setEditDocId(activity.id);
    setActivityURL(activity.url);
    setShowModal(true);
  };

  // Update activity using API
  const handleUpdateActivity = () => {
    if (editDocId && activityURL) {
      const apiUrl = 'https://iiiqai.com/activity_url/update_URL_API.php';

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editDocId,
          url: activityURL,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response === 'success' && data.status === 1) {
            const updatedActivities = activities.map((activity) =>
              activity.id === editDocId ? { ...activity, url: activityURL } : activity
            );

            setActivities(updatedActivities);
            setIsEditing(false);
            setEditDocId(null);
            setActivityURL('');
            setShowModal(false);
          } else {
            console.error('Error updating activity:', data.message);
          }
        })
        .catch((error) => {
          console.error('Network error while updating activity:', error);
        });
    }
  };

  // Delete activity (API-based)
  const handleDeleteActivity = (docId) => {
    // Show confirmation alert before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    
    if (confirmDelete) {
      const apiUrl = 'https://iiiqai.com/activity_url/delete_URL_API.php';
  
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: docId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.response === 'success' && data.status === 1) {
            // Remove the deleted activity from the UI
            setActivities((prevActivities) =>
              prevActivities.filter((activity) => activity.id !== docId)
            );
          } else {
            console.error('Error deleting activity:', data.message);
          }
        })
        .catch((error) => {
          console.error('Network error:', error);
        });
    } else {
      // User clicked 'Cancel', so do nothing
      console.log("Deletion canceled by the user.");
    }
  };
  
  const handleOpenModal = () => {
    setIsEditing(false);
    setActivityURL('');
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="activity-container">
        <div className="activity-content">
          <h2 className="text-center" style={{marginTop: "100px"}}>Activity Manager</h2>

          {/* <Button
            variant="primary"
            className="activity-search-input mb-5"
            onClick={handleOpenModal}
          >
            Add Activity
          </Button> */}

          <Table striped bordered hover className="activity_table_main">
            <thead>
              <tr>
                <th>S.No</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id}>
                  <td>{index + 1}</td>
                  <td>{activity.url}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEditActivity(activity)}
                    >
                      <PencilSquare />
                    </Button>{' '}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? 'Edit Activity' : 'Add Activity'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formActivityURL">
                <Form.Label>Activity URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter activity URL"
                  value={activityURL}
                  onChange={(e) => setActivityURL(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={isEditing ? handleUpdateActivity : handleAddActivity}
              >
                {isEditing ? 'Update Activity' : 'Add Activity'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Activity;
