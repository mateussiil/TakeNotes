import React from 'react';
import Drawing from './src/drawing';
import { Calendar } from 'react-native-big-calendar';

const events = [
  {
    title: 'Meeting',
    start: new Date(2023, 10, 25, 10, 0),
    end: new Date(2023, 10, 25, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2023, 10, 26, 15, 45),
    end: new Date(2023, 10, 26, 16, 30),
  },
]

function App(): JSX.Element {
  return <Calendar onPressEvent={(event)=> console.log(event)} mode='3days' date={new Date()} events={events} height={600} />
  // return <Drawing />;
}

export default App;
