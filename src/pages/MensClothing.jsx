
import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Slick from '../components/MenWomenLAndingPage-components/Slick'
import '../components/MenWomenLAndingPage-components/mensWomesPage.css';
const MensClothing = () => {
   
  const [products,setProducts] = useState([]) 
  const [price,setPrice] = useState([]) 
  const [womenCloth,setWomenCloth] = useState([]) 
  const [menCloth,setMenCloth] = useState([]) 

    const style = {
        div:{
            width:"80%",
            margin:"auto",
            // border:"2px solid red"
        }
       
    }

    const settings = {
      dots: true,
    //   autoplay: true,
      infinite: true,
      slidesToShow: 6,
      slidesToScroll: 6
    };
    useEffect(()=>{
      fetch(`http://localhost:3000/womenclothsPro`)
      .then(response => response.json())
      .then(product =>{
          setProducts(product);
          // console.log(product);
      })
      .catch((err) => {
        // setError(true)
        console.log(err);
      })
      // setLoading(false));
    },[]);


    useEffect(()=>{
      fetch(`http://localhost:3000/mensPro`)
      .then(response => response.json())
      .then(product =>{
          setPrice(product);
          console.log(product);
      })
      .catch((err) => {
        // setError(true)
        console.log(err);
      })
    },[]);

    useEffect(()=>{
      fetch(`http://localhost:3000/menscloths`)
      .then(response => response.json())
      .then(product =>{
        setWomenCloth(product);
          console.log(product);
      })
      .catch((err) => {
        // setError(true)
        console.log(err);
      })
    },[]);
    

    useEffect(()=>{
      fetch(`http://localhost:3000/menclothsPage`)
      .then(response => response.json())
      .then(product =>{
        setMenCloth(product);
          console.log(product);
      })
      .catch((err) => {
        // setError(true)
        console.log(err);
      })
    },[]);

    const handleClick = (item) => {
      localStorage.setItem("singleProduct", JSON.stringify(item));
  
      Navigate(`/products/women-tops/${item.id}`);
    };

  return (
    <>

<div style={style.div}>
      <h1 style={{fontSize:"20px"}}>Mens's Clothing</h1>
    </div>
    <div className='container'>
        <p>Home / <span> ClothingMen's</span>  / <span>Clothing</span> </p>
    </div>


  {/* coats and outwears */}
  <div style={{width:"100%",margin:"auto",marginLeft:"80px",margin:"40px" }} >
       <div style={{height:"270px",backgroundColor:"white", width:"450px" ,position:"absolute",marginLeft:"40px",marginTop:"250px",padding:"10px 40px"}} >
       <h1 style={{fontSize:"25px"}}>Our Favorite Fall Layers: Hoodies &amp; Sweaters</h1>
        <h4 style= {{marginTop:"30px",fontSize:"20px"}}>More than just a cozy vibes, these layers deliver style for cooler season.</h4>
        <div style={{fontSize:"28px"}}>
          <button type="button"  style={{fontSize:"18px",backgroundColor:"white",border:"2px solid black",fontWeight:"bold",margin:"20px",padding:"5px 10px",textTransform:"uppercase"}}>Shop Men’s Hoodies &amp; Sweaters</button>
        </div>
       </div>
       <img style={{width:"91%"}} src="https://m.media-amazon.com/images/G/01/2022/Mens/MENS-SWEATERS-HOODIES-OCTOBER-HERO-1440x700.jpg" alt="" />
    </div>





    {/* men's first page */}
 <div className='container' style={{width:"100%" , marginBottom:"40px"}} >
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",width:"100%" ,marginTop:"40px"}}>
    {price.map((womencloths) => (
      <Link to="/category/menscloths">
            <div key={womencloths.id} className="card box" style={{width: "100%",cursor:"pointer"}}>
            <img style={{height: "30rem"}}  src={womencloths.imageurl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h2 className="card-title" style={{textAlign:"center"}}>{womencloths.desc}</h2>
            </div>
           </div>
           </Link>
          ))}
    </div>
 </div>
{/* men's page end */}






{/* fall in love */}
   <div className="container" style={{display:"flex"}}>
      <div>
          <div style={{width:"100%",margin:"auto",marginLeft:"20px",margin:"20px"}} >
            <div style={{height:"250px",backgroundColor:"white", width:"500px",padding:"50px"}} >
            <h1 style={{fontSize:"30px"}}>Fall in Love with Free people</h1>
              <h4 style= {{marginTop:"20px",fontSize:"22px"}}>kick-start the new season with cozy-chic tops,timelwss denim, midi dresses , and si much more!</h4>
              <div style={{fontSize:"28px"}}>
                <button type="button"  style={{fontSize:"18px",backgroundColor:"white",border:"2px solid black",fontWeight:"bold",padding:"5px 10px",marginTop:"20px"}} >SHOP WOMEN'S COATS & OUTERWEAR</button>
              </div>
            </div>
            </div>
        </div>
      <div>
        <img  src="https://m.media-amazon.com/images/G/01/2022/aoe/RALPH-LAUREN-MENS-OCTOBER-COOP-960x500.jpg" alt="" />
      </div>
   </div>



   <div className="container" style={{display:"flex"}}>
      <div>
          <div style={{width:"100%",margin:"auto",marginLeft:"20px",margin:"20px"}} >
            <div style={{height:"250px",backgroundColor:"white", width:"100%",padding:"50px"}} >
            <h1 style={{fontSize:"30px"}}>New Arrivals from KUT from the Kloth</h1>
              <div style={{fontSize:"28px"}}>
                <button type="button"  style={{fontSize:"18px",backgroundColor:"white",border:"2px solid black",fontWeight:"bold",padding:"5px 10px",marginTop:"20px"}} >SHOP KUT FROM THE KLOTH</button>
              </div>
            </div>
            </div>
        </div>


{/* mens clothing three data */}
      <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",width:"90%" ,marginTop:"40px"}}>

      {menCloth.map((womencloths) => (
             <div key={womencloths.id} onClick={() => handleClick(womencloths)} className="card box" style={{width: "14rem",cursor:"pointer"}}>
             <img style={{height: "18rem"}}  src={womencloths.imageurl} className="card-img-top" alt="..."/>
               <h3 className="card-title" style={{textAlign:"center",fontSize:"20px",marginTop:"5px"}}>{womencloths.brand}</h3>
             <div className="card-body">
               <h2 className="card-title" style={{fontSize:"20px"}}>{womencloths.desc}</h2>
               <h4 className="card-title" style={{fontSize:"20px"}}>${womencloths.price}</h4>
               ⭐⭐⭐⭐⭐ <span>({womencloths.ratings})</span>
             </div>
            </div>
          ))}
    </div>
      </div>
   </div>





   <div style={{width:"100%",margin:"auto",marginLeft:"80px",margin:"40px"}} >
       <div style={{height:"260px",backgroundColor:"white", width:"450px" ,position:"absolute",marginLeft:"53%",marginTop:"30px",padding:"10px 40px"}} >
       <h1 style={{fontSize:"25px"}}>Your Fall 2022 Guide to Fashion</h1>
        <h4 style= {{marginTop:"10px",fontSize:"20px"}}>Boots,jackets,sneakers-- everything you love avout fall all in one place. plus, don't miss out on key picks from SOREL, L.L.Beans,UGG, nad Steve Maddden!</h4>
        <div style={{fontSize:"28px"}}>
          <button type="button"  style={{fontSize:"18px",backgroundColor:"white",border:"2px solid black",fontWeight:"bold",margin:"20px",padding:"5px 10px"}} >SHOP THE FALL FUIDE</button>
        </div>
       </div>
       <img style={{width:"91%"}}  src="https://m.media-amazon.com/images/G/01/2022/homepage9.05HP/COOP-FALL-STYLE-CAMPAIGN-HERO-1440x700.jpg" alt="" />
    </div>

   
{/* best sellor part */}
   <section>
   <div className='container' style={{width:"100%" , marginBottom:"40px"}} >
    <h1 style={{fontSize:"40px"}}>Best Sellor</h1>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px",width:"90%", margin:'auto' ,marginTop:"40px"}}>
      
    {womenCloth.map((women) => (
            <div key={women.id} onClick={() => handleClick(women)} className="card box" style={{width: "14rem",cursor:"pointer"}}>
            <img style={{height: "18rem"}}  src={women.imageurl} className="card-img-top" alt="..."/>
              <h3 className="card-title" style={{textAlign:"center",fontSize:"20px",marginTop:"5px"}}>{women.brand}</h3>
            <div className="card-body">
              <h2 className="card-title" style={{fontSize:"20px"}}>{women.desc}</h2>
              <h4 className="card-title" style={{fontSize:"20px"}}>${women.price}</h4>
              ⭐⭐⭐⭐⭐ <span>({women.ratings})</span>
            </div>
           </div>
     ))}
    </div>
 </div>
   </section>

{/* brand section */}
   <section>
     <Slick/>
   </section>
    </>
  )
}

export default MensClothing;

