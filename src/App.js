import './App.css';
import { useState } from 'react';
import Swal from 'sweetalert2';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');

  return (
    <div>
      <div className="container my-5">
        <h1 className='mb-4'>To-Do List</h1>
        {/* <hr /> */}
        <div className="input-container"> {/* input new Task */}
          <input type="text" id="taskInput" className='me-1' placeholder="Add a new task..."
            value={toDo} onChange={(event) => setToDo(event.target.value)} />
          <button className='addButton' id="addTaskButton" onClick={(event) => {
            const isExist = toDos.filter((item) => item.text.toLowerCase().trim() === toDo.toLowerCase().trim());
            if (!isExist.length && toDo.trim().length) {
              setToDos([...toDos, { _id: Date.now(), text: toDo.trim(), status: false }])
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                text: 'Added',
                width: 150,
                showConfirmButton: false,
                timer: 700
              })
            } else {
              Swal.fire({
                position: 'top-center',
                icon: 'warning',
                title: toDo.trim().length ? 'Task already exists' : 'Enter task first',
                showConfirmButton: false,
                timer: 1000
              })
            }
          }}>Add</button>
        </div>
        <br />

        {/* Saved Tasks */}
        <ul id="taskList">
          {
            toDos.map((itemObj) => {
              return (
                <li className='row mx-1 my-2' key={itemObj._id}>
                  <input value={itemObj.status} className='col-2 m-1'
                    type='checkbox' onChange={(e) => {
                      // Filtering the data and selecting with the id
                      setToDos(toDos.map(item => {
                        if (item._id === itemObj._id) item.status = e.target.checked;
                        return item;
                      }))
                    }} />
                  {
                    !itemObj.status ? <h4 className='text-start my-auto me-2 col-8 limited-text'>{itemObj.text}</h4> :
                      <h4 className='text-start my-auto me-2 col-8 limited-text text-decoration-line-through'>{itemObj.text}</h4>
                  }
                  <button className='col-1 btn btn-outline-danger p-1 button-3d' onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it !'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setToDos(toDos.filter(item => item._id !== itemObj._id))
                        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          text: 'Task Deleted',
                          width: 190,
                          showConfirmButton: false,
                          timer: 900
                        })
                      }
                    })
                    
                  }}>x</button>
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
