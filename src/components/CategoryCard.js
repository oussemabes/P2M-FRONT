import React from 'react'

export default function categoryCard(props) {
    let categoryName=props.categoryName
    let categoryImage=props.categoryImage
    let id=props.categoryId
    let ch = `/category/${id}`;

  return (
  
            <div className="col-12 col-md-4 p-5 mt-3">
                <a href={ch}><img src={categoryImage} width="222px" height="222px"></img></a>
                <h5 href={ch} className="text-center mt-3 mb-3">{categoryName}</h5>
                <p className="text-center"><a href={ch} style={{backgroundColor:"#226D68",color:"#ECF8F6"}} className="btn">Go Shop</a></p>
            </div>
            

        

  )
}
