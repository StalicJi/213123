import React, { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [ tasks, setTasks ] = useState(null);

  // const authToken = true;
  // const authToken = false;

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      // console.log(json);
      setTasks(json)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}, []);

  console.log(tasks);

  //日期sort
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date)); 

  return (
    <div className='app'>
      {!authToken && <Auth/>}
      {authToken && 
        <>
          <ListHeader listName={'待辦事項'} getData={getData}/>
          <p className='user-email'>歡迎回來 {userEmail}</p>
          {sortedTasks?.map((task) => <ListItem key={task.id} getData={getData} task={task}/>)}
        </>
      }
    </div>
  )
}

export default App

