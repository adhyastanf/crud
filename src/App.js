import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState({
    username: "",
    numberPhone: "",
    email: "",
  });

  const [items, setItems] = useState([
    {
      username: "",
      numberPhone: "",
      email: "",
    },
  ]);

  const [isPut, setIsPut] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({
    username:'',
    numberPhone:'',
    email:'',
    id:"",
  })

  useEffect(() => {
    fetch("/items")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setItems(jsonRes))
      // .then((jsonRes) => console.log(jsonRes))
      .catch((err) => console.log(err));
  }, [items]);

  const url = "/newitem";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => {
      return { ...prevItem, [name]: value };
      // console.log({...prevItem})
    });
    console.log(item);
  };

  const addItem = (e) => {
    e.preventDefault();
    axios.post(url, item);
    setItem({ username: "", numberPhone: "", email: "" });
    console.log(items);
  };

  const deleteItem = (id) => {
    axios.delete('/delete/' + id)
    alert("item deleted")
    console.log(`Delete item with id ${id}`)
    // .then(item => console.log(item))
  }

  const openUpdate = (id) => {
    setIsPut(true)
    setUpdatedItem(prevItem => {
      return(
        {
          ...prevItem,id:id
        }
      )
    })
  }

  const updateItem = (id) => {
    axios.put('/put/' + id, updatedItem)
    alert('item updated')
    console.log(`item with id ${id} updated`)
  }

  const handleUpdate = (e) => {
    const {name,value} = e.target
    setUpdatedItem(prevItem => {
      return(
        {
          ...prevItem,
          [name]:value
        }
      )
    })
    console.log(updatedItem)
  }

  return (
    <div className="App">
      <div className="containerInput">
        <input onChange={isPut?handleUpdate:handleChange} value={isPut?updatedItem.username:item.username} name="username" placeholder="username"></input>
        <input onChange={isPut?handleUpdate:handleChange} value={isPut?updatedItem.numberPhone:item.numberPhone} name="numberPhone" placeholder="numberPhone"></input>
        <input onChange={isPut?handleUpdate:handleChange} value={isPut?updatedItem.email:item.email} name="email" placeholder="email"></input>
      </div>
      <button onClick={isPut?() => updateItem(updatedItem.id):addItem}>{isPut?"UPDATE ITEM":"ADD ITEM"}</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Number Phone</th>
          </tr>
        </thead>
        <tbody>
          {items.map((data, index) => {
            return (
              <tr>
                <th scope="row">{index+1}</th>
                <td>{data.username?data.username:"-"}</td>
                <td>{data.email?data.email:"-"}</td>
                <td>{data.numberPhone?data.numberPhone:"-"}</td>
                <td><button onClick={() => deleteItem(data._id)}>DELETE</button></td>
                <td><button onClick={() => openUpdate(data._id)}>UPDATE</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;