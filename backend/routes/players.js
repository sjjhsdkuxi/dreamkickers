const express = require('express');
const router = express.Router();

// GET all players
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  
  db.all('SELECT * FROM players ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// GET a specific player by ID
router.get('/:id', (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  
  db.get('SELECT * FROM players WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.json(row);
  });
});

// POST create a new player
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { name, dob, fileNumber, contactNumber } = req.body;
  
  // Validation
  if (!name || !dob || !fileNumber || !contactNumber) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  
  db.run(
    'INSERT INTO players (name, dob, fileNumber, contactNumber) VALUES (?, ?, ?, ?)',
    [name, dob, fileNumber, contactNumber],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          res.status(409).json({ error: 'File number already exists' });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      res.status(201).json({
        id: this.lastID,
        name,
        dob,
        fileNumber,
        contactNumber,
        message: 'Player created successfully'
      });
    }
  );
});

// PUT update a player
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const { name, dob, fileNumber, contactNumber } = req.body;
  
  // Validation
  if (!name || !dob || !fileNumber || !contactNumber) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  
  db.run(
    'UPDATE players SET name = ?, dob = ?, fileNumber = ?, contactNumber = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [name, dob, fileNumber, contactNumber, id],
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          res.status(409).json({ error: 'File number already exists' });
        } else {
          res.status(500).json({ error: err.message });
        }
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.json({
        id: parseInt(id),
        name,
        dob,
        fileNumber,
        contactNumber,
        message: 'Player updated successfully'
      });
    }
  );
});

// DELETE a player
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  
  db.run('DELETE FROM players WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Player not found' });
      return;
    }
    res.json({ message: 'Player deleted successfully' });
  });
});

module.exports = router;
