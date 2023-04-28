import React from "react";
import styled from "styled-components";
import moment from "moment";
import Axios from "axios";
import { toast } from "react-hot-toast";


const Button = styled.button`
  background-color: #226d68;
  color: #ecf8f6;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
  border-style: hidden;
`;
const Styles = styled.div`
  padding: 20px;

  h1 {
    border-bottom: 1px solid white;
    color: #3d3d3d;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    padding: 10px;
    text-align: center;
  }

  form {
    background: #ecf8f6;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    max-width: 500px;
    padding: 30px 50px;
  }

  input {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }
  select {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }
  textarea {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  label {
    color: #3d3d3d;
    display: block;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .submitBtn {
    background-color: #226d68;
    color: #ecf8f6;
    font-family: sans-serif;
    font-size: 14px;
    margin: 20px 0px;
    height: 40px;
    border-style: hidden;
    .custom-file-upload {
      border: 1px solid #ccc;
      display: inline-block;
      padding: 6px 12px;
      cursor: pointer;
    }
  }
`;

export function Form(props) {
  const userId = props.props.userId;

  const [categories, setCategories] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [productName, setProductName] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productImage, setProductImage] = React.useState();
  const [productImageBack, setProductImageBack] = React.useState("");
  const [productImageNameBack, setProductImageNameBack] = React.useState("");
  const [auctionDate, setAuctionDate] = React.useState("");
  const [startingPrice, setStartingPrice] = React.useState(0.1);
  const hiddenFileInput = React.useRef(null);
  let date=new Date("2024-01-01T01:11")
  React.useEffect(() => {
    Axios.get(`http://194-195-247-34.ip.linodeusercontent.com/backend/auction/categories`).then((res) =>
      setCategories(res.data)
    );
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const fileUploaded = event.target.files[0];
    setProductImage(URL.createObjectURL(fileUploaded));
    setProductImageNameBack(event.target.files[0].name);
    setProductImageBack(event.target.files[0]);
  };
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current?.click();
  };

  async function addAuction(e) {
    const formData = new FormData();

    await formData.append("file", productImageBack);
    await formData.append("productName", productName);
    await formData.append("productCategory", productCategory);
    await formData.append("productDescription", productDescription);
    await formData.append("startingPrice", startingPrice);
    await formData.append("auctionDate", auctionDate);
    await formData.append("fileName", productImageNameBack);
    await formData.append("userId", userId);

    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(auctionDate);
    if (
      productImageNameBack === "" ||
      auctionDate === "" ||
      productName === "" ||
      productDescription === "" ||
      startingPrice === "" ||
      productCategory === ""
    ) {
      toast.error("All field are required");
      return;
    }
    if (selectedDate < currentDate) {
      alert(
        "Please select a time that is equal to or later than the current time."
      );
      return;
    }

    //foncti

    await Axios.post(
      `http://194-195-247-34.ip.linodeusercontent.com/backend/auction/create`,

      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    window.location.href = "/";
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <form>
      <h1>New Auction</h1>
      <label>Product Name</label>
      <input
        name="productName"
        onChange={(event) => {
          setProductName(event.target.value);
        }}
      />
      <br></br>

      <label>Product Category</label>

      <select
        name="productCategory"
        value={productCategory}
        onChange={(event) => {
          setProductCategory(event.target.value);
        }}
      > 
        <option value="" disabled>
          Select Product Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category}
            {category.options}
          </option>
        ))} 
      </select> 
      <br></br>

      <label>Product description</label>
      <textarea
        name="productDescription"
        onChange={(event) => {
          setProductDescription(event.target.value);
        }}
      />

      <br></br>

      <label>Date</label>
      <input
        name="date"
        type="datetime-local"
        min={moment().format("YYYY-MM-DDTHH:mm")}
        onChange={(event) => {
          setAuctionDate(event.target.value)
          console.log(date);
        }}
      />
      <br></br>

      <label>Starting Price (DT)</label>
      <input
        type="number"
        min="0.1"
        value={startingPrice}
        step="0.1"
        name="startingPrice"
        onChange={(event) => {
          setStartingPrice(event.target.value);
        }}
      />
      <br></br>
      <Button onClick={handleClick}>Upload a file</Button>
      <input
        type="file"
        ref={hiddenFileInput}
        className="custom-file-upload"
        name="upload"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <img src={productImage} />
      <br></br>
      <button name="button" type="submit" onClick={addAuction} className="submitBtn">
        Submit
      </button>
    </form>
  );
}

export default function CreateEvent(props) {
  return (
    <Styles>
      <Form props={props} />
    </Styles>
  );
}
