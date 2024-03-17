module.exports = {
  generateName: function (length) {
    let name = ""; //здесь будем хранить результат
    let chars = "abcdefgABCDEFG1234567890"; //возможные символы
    let charLength = chars.length; //определяем длину
    for (let i = 0; i < length; i++) {
      //запускаем цикл для формирования строки
      name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
  },
};
