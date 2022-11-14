const checkValidation = {
  checkLottoList(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    if (!this.checkType(numbers))
      throw new Error("[ERROR] 로또 번호는 숫자여야 합니다.");
    if ([...new Set(numbers)].length !== 6)
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    if (!this.checkRange(numbers))
      throw new Error("[ERROR] 로또 번호의 범위는 1~45이어야 합니다.");
  },
};
function checkType(numbers) {
  return numbers.every((number) => !isNaN(number));
}
function checkRange(numbers) {
  return numbers.every((number) => number <= 45 && number >= 1);
}

module.exports = checkValidation;
