import axios from "axios";

function App() {

  return (
    <button onClick={ async ()=>{
      const response = await axios.get('http://localhost:5000/api/v1/product');
      const data = await response.data();
      console.log(data);
      console.log('jolaaaa');
      
    }}>
      click me
    </button>
  )
}

export default App
