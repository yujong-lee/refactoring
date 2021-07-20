class Receipt {
  constructor(format) {
    this.format = format;
    this.header = '';
    this.performances = '';
    this.totalAmount = '';
    this.volumeCredits = '';
  }

  writeHeader(invoice) {
    this.header = `청구내역 (고객명: ${invoice.customer})\n`;
  }

  writePerformanceData(play, thisAmount, perf) {
    this.performances = `${play.name} : ${this.format(thisAmount / 100)} (${perf.audience}석)\n`;
  }

  writeTotalAmount(totalAmount) {
    this.totalAmount += `총액: ${this.format(totalAmount / 100)}\n`;
  }

  writeVolumeCredits(volumeCredits) {
    this.volumeCredits += `적립 포인트: ${volumeCredits}점\n`;
  }
  
  get result() {
    return (
      this.header + 
      this.performances + 
      this.totalAmount + 
      this.volumeCredits
    );
  }
}

function statement(invoice, plays) {
  const { format } = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
  
  let totalAmount = 0;
  let volumeCredits = 0;
  
  const xxxresult = new Receipt(format);
  xxxresult.writeHeader(invoice);

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];

    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;

        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case 'comedy': // 희극
        thisAmount = 30000;

        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    xxxresult.writePerformanceData(play, thisAmount, perf)

    totalAmount += thisAmount;
  }

  xxxresult.writeTotalAmount(totalAmount);
  xxxresult.writeVolumeCredits(volumeCredits);

  return xxxresult.result;
}

module.exports = {
  statement,
}
