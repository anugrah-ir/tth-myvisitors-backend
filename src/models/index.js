const User = require('./user');
const Access = require('./access');

User.hasMany(Access, {
    foreignKey: 'userId'
});
Access.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = {
    User,

};