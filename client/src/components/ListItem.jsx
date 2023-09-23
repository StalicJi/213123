import React, { useState } from 'react';
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal.jsx';

const ListItem = ({task, getData}) => {
  const [showModal, setShowModal] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: "DELETE"
      })
      if (response.status === 200 ){
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <li className='list_item'>
      <div className="info-container">
        <TickIcon/>
        <p className='task-title'>{task.title}</p>
        <ProgressBar progress={task.progress}/>
      </div>
      <div className="button-container">
        <button className='edit' onClick={() => setShowModal(true)}>編輯</button>
        <button className='delete' onClick={deleteItem}>刪除</button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
    </li>
  )
}

export default ListItem
