const { Console, Random } = require("@woowacourse/mission-utils");
const checkValidation = require("./errors/checkValidation");
const existError = require("./errors/existError");
const Lotto = require("./Lotto");

class LottoList {
  constructor(money) {
    this.validate(money);
    this.count = money / 1000;
    this.list = [];
    this.publish();
  }
  validate(money) {
    const { errorMessage } = checkValidation.money(money);
    if (errorMessage) {
      existError(errorMessage);
      return;
    }
  }
  publish() {
    for (let num = 0; num < this.count; num++) {
      const newLotto = this.createNewLotto();
      this.list.push(newLotto);
    }
  }
  createNewLotto() {
    const newNumbers = Random.pickUniqueNumbersInRange(1, 45, 6);
    return new Lotto(newNumbers);
  }
  printCount() {
    Console.print(`\n${this.count}개를 구매했습니다.`);
  }
  printList() {
    this.list.forEach((lotto) => {
      lotto.printNumbers();
    });
  }
  getResult(winningNumbers, bonusNumber) {
    let lottoResultList = [];

    this.list.forEach((lotto) => {
      lottoResultList.push(lotto.getResult(winningNumbers, bonusNumber));
    });

    return lottoResultList.filter((result) => result <= 5);
  }
  printWinningList(lottoResultList) {
    const winningList = [
      "3개 일치 (5,000원)",
      "4개 일치 (50,000원)",
      "5개 일치 (1,500,000원)",
      "5개 일치, 보너스 볼 일치 (30,000,000원)",
      "6개 일치 (2,000,000,000원)",
    ];
    winningList.forEach((winningList, idx) => {
      const winningCount = this.getWinningCount(lottoResultList, idx);
      Console.print(`${winningList} - ${winningCount}개`);
    });
  }
  printLottoRate(lottoResultList) {
    const lottoRate = this.calculateRate(lottoResultList);

    Console.print(`총 수익률은 ${lottoRate}% 입니다.`);
  }
  calculateRate(lottoResultList) {
    const lottoPrize = [5000, 50000, 1500000, 30000000, 2000000000];
    const finalPrize = lottoPrize.reduce((acc, cur, idx) => {
      const winningCount = this.getWinningCount(lottoResultList, idx);

      return acc + cur * winningCount;
    }, 0);

    const purchaseMoney = this.count * 1000;
    return ((finalPrize / purchaseMoney) * 100).toFixed(1);
  }
  getWinningCount(lottoResultList, idx) {
    return lottoResultList.filter((result) => result === 5 - idx).length;
  }
}

module.exports = LottoList;
