class Color {
  static Reset = "\x1b[0m"
  
  static FgRed = "\x1b[31m"
  static FgGreen = "\x1b[32m"
  static FgYellow = "\x1b[33m"
  static FgBlue = "\x1b[34m"
  static FgMagenta = "\x1b[35m"

  static standardSets = [this.FgRed, this.FgGreen, this.FgYellow, this.FgBlue, this.FgMagenta]
}

class PrettyConsole {
  static isArray(variable) {
    if (Array.isArray(variable)) {
      return true;
    } else {
      return false;
    }
  }

  static getRandomColor() {
    const sets = Color.standardSets;
    const idx = parseInt(Math.random() * sets.length);

    return sets[idx];
  }

  static setColor(color) {
    console.log(color);
  }

  static resetColor() {
    console.log(Color.Reset);
  }

  static print(title, args, random=true) {

    const color = random ? this.getRandomColor() : Color.FgGreen;
    
    this.setColor(color);
    
    console.group(title);
    
    if (this.isArray(args)) {
      args.forEach((value, index) => console.log(`${index}:`, value));
    } else {
      console.log(args);
    }

    console.groupEnd();
  }
}

export default PrettyConsole;