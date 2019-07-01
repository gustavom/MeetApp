module.exports = {
  // dialect: 'postgres',
  dialect: 'mysql',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'databasemeetapp',
  define: {
    timestamps: true,
    underscored: true,
    underscoredall: true,
  },
};
