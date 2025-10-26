import styles from "./styles.module.css";
import { postProduct } from "@/services/ProductService";
import { postLogout } from "@/services/UserService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage(){
  const navigate = useNavigate();
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await postProduct({ length: 5 });
      setProductList(res.result);
    };

    fetchProducts();
  }, []);

  console.log(productList);

  return (
    <div className={ styles.page }>
      <div>
        <button onClick={() => { postLogout(); navigate("/sign/in"); }}>Logout</button>        
      </div>
    </div>
  );
}

export default HomePage;
