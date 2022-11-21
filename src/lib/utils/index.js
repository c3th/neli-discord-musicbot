module.exports = class Utilities {
  static capitilize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static arrayChunk(array, size) {
    if (!array.length) return [];

    const head = array.slice(0, size);
    const tail = array.slice(size);

    return [head, ...this.arrayChunk(tail, size)];
  }

  static generateCode(length) {
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    while (length > code.length) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return code;
  }

  static shuffle(array) {
    let first = array[0];
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array.sort((x, y) => x == first ? -1 : y == first ? 1 : 0);
  }

  static getAFKTime(dateTime) {
    const time = (Date.now() - dateTime) / 1000

    let d = Math.floor(time / 3600 / 24);
    let h = Math.floor(time / 3600);
    let m = Math.floor(time % 3600 / 60);
    let s = Math.floor(time % 3600 % 60);

    let dDisplay = d > 0 ? d + 'd ' : '';
    let hDisplay = h > 0 ? h + 'h ' : '';
    let mDisplay = m > 0 ? m + 'm ' : '';
    let sDisplay = s > 0 ? s + 's ' : '';

    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  static greetings(user) {
    if (!user) user = 'User';

    const greetingsBlock = [
      `Good Morning, ${user}`,
      `Good Afternoon, ${user}`,
      `Good Evening, ${user}`
    ]

    const hours = new Date().getHours();
    const message = hours < 12 ? greetingsBlock[0] : hours < 18 ? greetingsBlock[1] : greetingsBlock[2];

    return message;
  }
}