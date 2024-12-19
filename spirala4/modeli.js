const { sequelize } = require('./db');
const dataTip = require('sequelize');

module.exports = (sequelize) => {
  sequelize.Student = sequelize.define('Student', {
    id: {
      type: dataTip.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ime: {
      type: dataTip.STRING,
      allowNull: false,
    },
    prezime: {
      type: dataTip.STRING,
      allowNull: false,
    },

    index: {
      type: dataTip.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Student',
    timestamps: false,

  });

  sequelize.Predmet = sequelize.define('Predmet', {
    id: {
      type: dataTip.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv: {
      type: dataTip.STRING,
      allowNull: false,
    },
    kod: {
      type: dataTip.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Predmet',
    timestamps: false,
  });

  sequelize.Cas = sequelize.define('Cas', {
    id: {
      type: dataTip.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    redniBroj: {
      type: dataTip.INTEGER,
      allowNull: false,
    },
    tip: {
      type: dataTip.STRING,
      allowNull: false,
    },
    sedmica: {
      type: dataTip.INTEGER,
      allowNull: false,
    },
    predmetId: {
      type: dataTip.INTEGER,

      references: {
        model: 'Predmet',
        key: 'id',
      },
    },
  }, {
    tableName: 'Cas',
    timestamps: false,
  });

  sequelize.Prisustvo = sequelize.define('Prisustvo', {
    id: {
      type: dataTip.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    statuss: {
      type: dataTip.STRING,
      allowNull: false,
    },
    studentId: {
      type: dataTip.INTEGER,

      references: {
        model: 'Student',
        key: 'id',
      },
    },
    casId: {
      type: dataTip.INTEGER,

      references: {
        model: 'Cas',
        key: 'id',
      },
    },
  }, {
    tableName: 'Prisustvo',
    timestamps: false,
  });

  sequelize.Student.hasMany(sequelize.Prisustvo);
  sequelize.Prisustvo.belongsTo(sequelize.Student);

  sequelize.Cas.hasMany(sequelize.Prisustvo);
  sequelize.Prisustvo.belongsTo(sequelize.Cas);

  sequelize.Predmet.hasMany(sequelize.Cas);
  sequelize.Cas.belongsTo(sequelize.Predmet);
}


/*

sequelize.sync().then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.log("errorr");
});

*/