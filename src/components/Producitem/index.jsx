import React from 'react'
import styles from './style.css';

export default function ProductoItem({ data, addToCart}) {
  return (
    <div className={styles.container_product}>
      <h2>{data.name}</h2>
      <p>Precio: {data.price}</p>
      <button className={styles.btnProduct} onClick={() => addToCart(data.id)}>Agregar al Carrito</button>
    </div>
  )
}
