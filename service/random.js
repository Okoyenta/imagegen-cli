function generateRandomNumber() {
    const ran = Math.floor(Math.random() * 10000) + 1;
   // console.log("random number generated" + ran);
    return ran;
  }
  

  module.exports = generateRandomNumber