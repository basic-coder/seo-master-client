import axios from "axios"


export const BrokenLinks = async(data) => {
  try {
    const {url} = data
    axios.post('http://localhost:4000/api/broken-link-report',url).then((res)=>{
        res.json()
        return res
    })
  } catch (error) {
    console.log(error);
  }
}
