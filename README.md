## Namaste 🙏. I'm Amit, a Front-End Developer from India <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1200px-Flag_of_India.svg.png" width=35/>

  ### 📖 A little ~~more~~ ```code``` about me...
  ```javascript
  import { Human } from '@earth/animals';
  import { Days } from 'calendar';
  
  class Amit extends Human {
    constructor(day) {
      this.today = day;
      this.age = 26;
      this.familiarWith = [`JavaScript`, `React`, `Node`, `CSS`, `Core Java`, `SQL`];
      this.learning = [`TypeScript`, `Redux`, `Jest`, `Webpack`, `MongoDB`, `YAML`, `Material UI`];
      this.hobbies = [`Coding`, `Gaming`, `Learning new Tech`];
      this.academicHistory = [
        {
          institution: `St. Xavier's Institution`,
          passout: `2011`,
          specialization: `N/A`,
          location: `Kolkata, West Bengal`,
          degree: `Secondary`,
        },
        {
          institution: `St. Xavier's Institution`,
          passout: `2013`,
          location: `Kolkata, West Bengal`,
          specialization: `Science`,
          degree: `Higher Secondary`,
        },
        {
          institution: `University of Engineering & Management`,
          passout: `2017`,
          location: `Jaipur, Rajasthan`,
          specialization: `Computer Science`,
          degree: `B.Tech`,
        },
      ];
      this.professionalHistory = [
        {
          name: `Infosys Limited`,
          started: `Oct, 2017`,
          ended: `Jun, 2019`,
          location: `Bangalore, Karnataka`,
          designation: `Systems Engineer`
        },
        {
          name: `Labvantage Solutions`,
          started: `Jun, 2019`,
          ended: null,
          location: `Kolkata, West Bengal`,
          designation: `Solutions Engineer`
        },
        {
        name: `Accolite Digital`,
        started: `Nov, 2021`,
        ended: null,
        location: `Bangalore, Karnataka`,
        designation: `Senior Software Engineer`
      },
      ];
    }
    live() {
      if([Days.SUNDAY, Days.SATURDAY].includes(this.today)) {
        this.wakeUp();
        this.game();
        this.eat();
        this.learn();
        this.sleep();
        return;
      }
      this.wakeUp();
      this.work();
      this.eat();
      this.work();
      this.sleep();
    }
  }
  
  let today = new Date();
  while(today !== Days.END) {
      (new Amit(today)).live();
  }
  ```
  
  ---

### **❌ Tic Tac Toe in Readme ⭕**
 
🖱️ Just Click on Any of the Blank Squares below to place an ⭕.
  
|   | 1 | 2 | 3 |
| - | - | - | - |
| 1 | [![Tile 0](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C11&body=Just+click+%27Submit+new+issue%27.) | [![Tile 1](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C12&body=Just+click+%27Submit+new+issue%27.) | [![Tile 2](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C13&body=Just+click+%27Submit+new+issue%27.) |
| 2 | [![Tile 3](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C21&body=Just+click+%27Submit+new+issue%27.) | [![Tile 4](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C22&body=Just+click+%27Submit+new+issue%27.) | ![](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/X.png) |
| 3 | [![Tile 6](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C31&body=Just+click+%27Submit+new+issue%27.) | [![Tile 7](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C32&body=Just+click+%27Submit+new+issue%27.) | [![Tile 8](https://raw.githubusercontent.com/ARogueOtaku/ARogueOtaku/master/assets/blank.png)](https://github.com/ARogueOtaku/ARogueOtaku/issues/new?title=TTT%7C33&body=Just+click+%27Submit+new+issue%27.) |
  
🎲 ***Last Move:*** *ARogueOtaku placed an **❌** in **Row 2 Column 3.***

---

### **How it Works?**
It is pretty simple. Clicking on a Blank Square will redirect to an issue creation page. Everything will be pre-populated. You just need to click on 'Submit new issue'. An Issue will be created and a workflow will be triggered in the background. This workflow will trigger a script to process the issue title and then update the README. 

---