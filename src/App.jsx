import React, { Component } from 'react';
import styles from "./App.module.css";
import { Header, BarChart, Selector } from './components';

export default class App extends Component {
  constructor(props) {
     super(props);

     this.chartRef = React.createRef();

     this.state = {
        array: [],
        algorithm: "Bubble Sort",
        chartSize: null,
        isPlaying: false,
        stop: false,
        sorted: false,
     }

     this.handleSelect = this.handleSelect.bind(this);
     this.bubbleSort = this.bubbleSort.bind(this);
     this.play = this.play.bind(this);
     this.randomize = this.randomize.bind(this);
     this.updateSize = this.updateSize.bind(this);
     this.wait = this.wait.bind(this);
     this.selectionSort = this.selectionSort.bind(this);
     this.insertionSort = this.insertionSort.bind(this);
  }

  updateSize(size) {
     this.setState({
        chartSize: size,
     });
  }

  componentDidMount() {
      this.randomize();
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.stop === true) {
         this.setState({
            stop: false,
         });
      }
  }

  wait(ms) {
     return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }

  async selectionSort() {
      const { array } = this.state;

      this.setState({
         isPlaying: true,
      });

      const swap = (x,y,arr) => {
         let temp = arr[x];
         arr[x] = arr[y];
         arr[y] = temp;
      }

      const sorted = [...array];

      // min value index
      let min = null;

      for(let i=0;i<sorted.length;i++) {
         min = i;
         for(let j=i+1;j<sorted.length;j++) {
            if(sorted[min] > sorted[j]) {
               min = j;
            }
         }
         if(min !== i) {
            await this.wait(250);
            swap(i,min,sorted);
            if(!this.state.stop) {
               this.setState({
                  array: sorted,
               })
            }
            else {
               this.setState({
                  isPlaying: false,
               })
               return;
            }
         }
      }

      this.setState({
         isPlaying: false,
         sorted: true,
      });
  }

  async insertionSort() {
      const { array } = this.state;

      this.setState({
         isPlaying: true,
      });

      const swap = (x,y,arr) => {
         let temp = arr[x];
         arr[x] = arr[y];
         arr[y] = temp;
      }

      const sorted = [...array];

      for(let i=0;i<sorted.length;i++) {
         for(let j=i; j>0; j--) {
            if(sorted[j] < sorted[j-1]) {
               await this.wait(5);
               swap(j, j-1, sorted);
               if( this.state.stop === false ) {
                  this.setState({
                     array: sorted,
                  });
               }
               else {
                  this.setState({
                     isPlaying: false,
                  })
                  return;
               }
            }
         }
      }

      this.setState({
         isPlaying: false,
         sorted: true,
      });
  }
  
  async bubbleSort() {
     const { array } = this.state;

     this.setState({
        isPlaying: true,
     });

     const swap = (x,y,arr) => {
        let temp = arr[x];
        arr[x] = arr[y];
        arr[y] = temp;
     }

     let swapped = true;
     const sorted = [...array];

     while(swapped) {
        swapped = false;

        for(let i=0;i<sorted.length;i++) {
           if(sorted[i] > sorted[i+1]) {
              await this.wait(5);
              swap(i, i+1,sorted);
              swapped = true;
              if( this.state.stop === false ) {
                  this.setState({
                     array: sorted,
                  });
              }
              else {
                 this.setState({
                    isPlaying: false,
                 });
                  return;
              }
           }
        }
     }

     this.setState({
         isPlaying: false,
         sorted: true,
     });
  }

  play(e) {
     const { algorithm } = this.state;

     switch(algorithm) {
        case "Bubble Sort":
           this.bubbleSort();
           break;
        case "Insertion Sort":
           this.insertionSort();
           break;
        case "Selection Sort":
           this.selectionSort();
           break;
     } 
  }

  randomize() {
     //* Generating unique array of integers

     let randomized = new Set();
     let size = 80;
   
     while(randomized.size !== size) {
         randomized.add(Math.floor(Math.random() * (this.chartRef.current.clientHeight - 50)));
     }

     this.setState({
        array: [...randomized],
        sorted: false,
     });
  }

  stop = e => {
     this.setState({
        stop: true,
     })
  }

  handleSelect(e) {
   const option = e.target.textContent;

   switch(option) {
       case "Bubble Sort":
           this.setState({
              algorithm: "Bubble Sort",
           });
           break;
       case "Insertion Sort":
           this.setState({
              algorithm: "Insertion Sort",
           });
           break;
       case "Selection Sort":
           this.setState({
              algorithm: "Selection Sort",
           });
           break;
    }
  }

  render() {
    const { array, algorithm, isPlaying, sorted } = this.state;
    
    return (
       <main className={styles.container}>
          <Header />
          <Selector 
              algorithm={algorithm} 
              handleSelect={this.handleSelect}
              play={this.play}
              randomize={this.randomize}
              stop={this.stop}
              isPlaying={isPlaying}
          />
          <BarChart 
              array={array}
              sorted={sorted}
              updateSize={this.updateSize}
              ref={this.chartRef}
          />
       </main>
    );
  }
}
