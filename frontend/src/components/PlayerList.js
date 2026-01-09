import React from 'react';
import './PlayerList.css';

const PlayerList = ({ players, onEdit, onDelete }) => {
  if (players.length === 0) {
    return (
      <div className="empty-state">
        <p>No players found. Add your first player to get started!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="player-list">
      <h2>Players ({players.length})</h2>
      <div className="players-grid">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-header">
              <h3>{player.name}</h3>
              <div className="player-actions">
                <button
                  className="btn-edit"
                  onClick={() => onEdit(player)}
                  title="Edit player"
                >
                  ✏️
                </button>
                <button
                  className="btn-delete"
                  onClick={() => onDelete(player.id)}
                  title="Delete player"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="player-details">
              <div className="detail-item">
                <span className="label">Date of Birth:</span>
                <span className="value">{formatDate(player.dob)}</span>
              </div>
              <div className="detail-item">
                <span className="label">File Number:</span>
                <span className="value">{player.fileNumber}</span>
              </div>
              <div className="detail-item">
                <span className="label">Contact:</span>
                <span className="value">{player.contactNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
