import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Modal = ({mode, setShowModal, getData, task}) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const editMode = mode === 'edit' ? true : false

  const [data, setData] = useState({
    user_email: editMode? task.user_email : cookies.Email,
    title: editMode? task.title : '',
    progress: editMode? task.progress : 50,
    date: editMode? task.date : new Date()
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('WORKED');
        setShowModal(false);
        getData();
      }

    } catch(err) {
      console.error(err);
    }
  }

  const editData = async(e) => {
    e.preventDefault();
    try {
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method: "PUT",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {
        console.log('EDIT WORKED');
        setShowModal(false);
        getData();
      }
    } catch(err) {
      console.error(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setData(data => ({
      ...data,
      [name] : value
    }))

    console.log(data);
  }

  return (
    <div className='overlay'>
      <div className="modal">
        <div className='form-title-container'>
          <h3>
            { mode === 'create'? '創建' : '編輯'}名稱
          </h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

      <form action="">
        <input  
          required 
          maxLength={30} 
          placeholder='請輸入待辦事項名稱...'
          name='title'
          value={data.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="range"><h3>完成進度條</h3></label>
        <input 
          required
          id='range'
          type='range'
          min='0'
          max='100'
          name='progress'
          value={data.progress} 
          onChange={handleChange}
        />
        <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
      </form>
      </div>

    </div>
  )
}

export default Modal
