import React, { useState, useEffect } from 'react';
import './App.css';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import Header from './components/Header';

const API_URL = 'http://localhost:3001/api/players';

function App() {
  const [players, setPlayers] = useState([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all players
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch players');
      const data = await response.json();
      setPlayers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // Create a new player
  const handleCreate = async (playerData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create player');
      }

      await fetchPlayers();
      setShowForm(false);
      setEditingPlayer(null);
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  // Update an existing player
  const handleUpdate = async (id, playerData) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update player');
      }

      await fetchPlayers();
      setShowForm(false);
      setEditingPlayer(null);
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  // Delete a player
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this player?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete player');
      }

      await fetchPlayers();
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  // Handle edit button click
  const handleEdit = (player) => {
    setEditingPlayer(player);
    setShowForm(true);
  };

  // Handle form cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingPlayer(null);
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="actions-bar">
          <button 
            className="btn btn-primary" 
            onClick={() => {
              setEditingPlayer(null);
              setShowForm(true);
            }}
          >
            + Add New Player
          </button>
        </div>

        {showForm && (
          <PlayerForm
            player={editingPlayer}
            onSubmit={editingPlayer ? (data) => handleUpdate(editingPlayer.id, data) : handleCreate}
            onCancel={handleCancel}
          />
        )}

        {loading ? (
          <div className="loading">Loading players...</div>
        ) : (
          <PlayerList
            players={players}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
