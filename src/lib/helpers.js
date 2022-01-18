
const helpers = {};
helpers.matchPassword = async (password, savedPassword) => {
    try {
      return await password==savedPassword;
    } catch (e) {
      console.log(e)
    }
  };
  
  module.exports = helpers;