
import './Products.css'
const  Products=({items,fields})=> {
 
  
  const arrayProduct=Object.keys(items).map(product=>items[product]);
  arrayProduct.sort((a,b)=>b.popularity-a.popularity)
  return (
    <div className="container">
    <ul className="responsive-table">
      <li className="table-header">
        {fields.map((field,index)=>{
             return<div  className={`${field}`} key={index}>{field}</div>
        })}
        {/* <div class="col-1">Product Name</div>
        <div class=" col-2" >Subcategory</div>
        <div class="col-3">Price</div>
        <div class="col-4">Popularity</div> */}
      </li>
      {/* {arrayProduct.map((product,index)=>{
        return(<li class="table-row">
        <div class="col-1" >{product.title}</div>
        <div class="col-2" >{product.subcategory}</div>
        <div class="col-3" >₹{product.price}</div>
        <div class="col-4" >{product.popularity}</div>
      </li>)

        
      })} */}
      {arrayProduct.map((product, idx) => {
          return (
            <li className="table-row" key={idx}>
              {fields.map((field, index) => {
                return (
                  <div key={`${idx} ### ${field} + ${product.title}`} className={`${field}`}>
                   {product[field]}
                  </div>
                );
              })}
            </li>
          );
        })}
      
         </ul>
  </div>
  );
}

export default Products;
