
/***
 * defaultText(text, immediate)
 *   @text {string} 默认文本
 *   @immediate {boolean} 输出文本立刻设置为text
 *
 * second(second)
 *   @second {number} 默认60秒
 *
 * trigger(template, callback) 触发倒计时
 *
 *   @template {function} (second) 字符串模板函数
 *      @second {number} 传入当前秒数
 *      @return {String} 应输出一个字符串
 *
 *   @callback {function} (template, callback) 回调函数，每次倒计时变化时触发
 *      @outputText {string} 由template定义的文本
 *      @done {boolean}) 倒计时是否结束
 */
class Countdown {

  constructor() {
    this.defaultSec = 60;
    this.interval = 0;
    this.$second = 0;
    this.$defaultText = '';
    this.$template = null;
    this.$callback = null;
    this.$immediate = null;
    this.innerText = '';
    this.countDownID = null;
  }

  set output(str) {
    this.innerText = str;
    if (this.$callback instanceof Function) {
      this.$callback(this.innerText, this.interval < 1);
    }
  }

  get output() {
    return this.innerText;
  }

  defaultText(str, immediate) {
    this.$defaultText = str;
    this.$immediate = immediate;

    if (immediate) {
      this.output = str;
    }
    return this;
  }

  second(sec) {
    this.$second = sec;
    return this;
  }

  trigger(template, callback) {
    if (!this.$template) {
      this.$template = template;
    }
    if (!this.$callback) {
      this.$callback = callback;
    }
    clearInterval(this.countDownID);
    this.countDown();
    return this;
  }

  countDown() {
    let interval = this.$second || this.defaultSec;
    this.countDownID = setInterval(() => {
      this.interval = interval;
      if (interval < 1) {
        clearInterval(this.countDownID);
        this.output = this.$defaultText;
        return;
      }
      if (this.$template instanceof Function) {
        this.output = this.$template(interval);
      }
      interval -= 1;
    }, 1000);
  }

}

export default new Countdown();
