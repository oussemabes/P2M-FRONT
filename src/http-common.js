import axios from "axios";

export default axios.create({
  baseURL: `http://194-195-247-34.ip.linodeusercontent.com`,
  headers: {
    "Content-type": "application/json"
  }
});