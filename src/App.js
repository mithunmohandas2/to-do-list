import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  return (
    <div>
      <div className="container mt-5">
        <h1 className='mb-4'>To-Do List</h1>
        <hr />
        <div className="input-container">
          <input type="text" id="taskInput" className='me-1' placeholder="Add a new task..."
            value={toDo} onChange={(event) => setToDo(event.target.value)} />
          <button id="addTaskButton" onClick={() => setToDos([...toDos, {_id: Date.now(), text: toDo, status: false }])}>Add</button>
        </div>
        <br />
        <ul id="taskList">
          {
            toDos.map((itemObj) => {
              return (
                <li className='row mx-1 my-2' key={itemObj._id}>
                  <input value={itemObj.status} className='col-2 m-1'
                    type='checkbox' onChange={(e) => {
                      console.log(e.target.checked)
                      console.log(itemObj)
                      // Filtering the data and selecting with the id
                      setToDos(toDos.filter(item => {
                        if (item._id === itemObj._id) {
                          item.status = e.target.checked;
                        }
                        return item;
                      }))
                      console.log(toDos)
                    }} />
                    <h4 className='text-start my-auto me-2 col-8 limited-text'>{itemObj.text}</h4>
                  <button className='col-1'>x</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
