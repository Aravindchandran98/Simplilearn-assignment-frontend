exports.up = function(db, callback) {
    db.createTable('users', {
      id: { 
        type: 'bigint', 
        unsigned: true,
        primaryKey: true, 
        autoIncrement: true,
        notNull: true
      },
      first_name: {
        type: 'string',
        length: 30,
        notNull: true
      },
      last_name: {
        type: 'string',
        length: 30,
        notNull: true
      },
      email: {
        type: 'string',
        length: 150,
        unique: true,
        notNull: true
      },
      mobile_number: {
        type: 'bigint',
        unsigned: true,
        notNull: true
      },
      password: {
        type: 'text',
        notNull: true
      },
      created_at: {
        type: 'timestamptz',
        notNull: true,
        defaultValue: 'NOW()'
      },
      updated_at: {
        type: 'timestamptz',
        notNull: false
      }
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};



