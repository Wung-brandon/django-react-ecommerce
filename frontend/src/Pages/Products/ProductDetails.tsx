/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductDetails = () => {
//   const { slug } = useParams<{ slug: string }>();  // Extract slug from the URL
//   const [product, setProduct] = useState<any>(null);

//   useEffect(() => {
//     // Fetch product details based on the slug
//     axios.get(`${import.meta.env.VITE_API_PRODUCT_BASE_URL}/${slug}/`)
//       .then((response) => {
//         console.log('slug name', response.data.results);
//         setProduct(response.data.results);
//       })
//       .catch((error) => {
//         console.error('Error fetching product data:', error);
//       });
//   }, [slug]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       <img src={product.image} alt={product.name} />
//       <p>{product.description}</p>
//       <p>Price: {product.price}</p>
//       <p>Average Rating: {product.average_rating}</p>
//     </div>
//   );
// };

// export default ProductDetails;


import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface productTypes{
  name: string;
}
const ProductDetails:React.FC= () => {
  const { id } = useParams<{ id: string }>(); // Make sure 'id' or 'slug' matches your route
  const [product, setProduct] = useState<productTypes>( );
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("Product ID or slug is missing in URL");
      return;
    }

    axios.get(`${import.meta.env.VITE_API_PRODUCT_BASE_URL}${id}/`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);

        // If the current 'id' is a number and not the slug, update the URL to show the slug
        if (id !== productData.slug) {
          navigate(`/products/${productData.slug}`, { replace: true });
        }
      })
      .catch(error => {
        console.error('Error fetching product data:', error.response ? error.response.data : error.message);
      });
  }, [id, navigate]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          {/* Other product details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetails;
