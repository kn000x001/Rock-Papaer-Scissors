import './App.css';
import { MdBackHand } from "react-icons/md"
import {FaFistRaised, FaHandScissors} from "react-icons/fa"
import { useState } from 'react';



const actions = {
  rock:"scissors",
  paper: "rock",
  scissors: "paper"
};

function Player({name = "player", score = 0, action="rock"}) {
  return  (
          <div className="player">
            <div className="score">{`${name}: ${score}`}</div>
            <div className="action">{action && <ActionIcon action={action} size={60}/>}</div>
          </div>
  )
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return (
    <h2>{text[winner]}</h2>
  )
}




function computerActions () {


  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index]

}

function calculateWinner(action1, action2) {
if(action1 === action2){
  return 0
} else if(actions[action1] === action2 ){
  return -1
} else if(actions[action2] === action1 ){
  return 1
}

return null
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaFistRaised,
    paper: MdBackHand,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}


function ActionButton({action = "rock", onActionSelected}) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20}/>
    </button>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = computerActions();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  

  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <div className="container">
        <div className="container-inner">
          
        <Player name="Player" score={playerScore} action={playerAction}/>
        <Player name="Machine" score={computerScore} action={computerAction}/>

         
        </div>
      </div>
      <div>
        <ActionButton action='rock' onActionSelected={onActionSelected}/>
        <ActionButton action='paper' onActionSelected={onActionSelected}/>
        <ActionButton action='scissors' onActionSelected={onActionSelected}/>
      </div>
      <ShowWinner winner={winner}/>
    </div>
  );
}

export default App;
