/**
 * Header Component
 * 
 * Encabezado principal de la aplicación
 */

/**
 * isAdmin es inicializado en false para que muestre inicialmente solo la parte del cliente
 * @param {} param0 
 * @returns 
 */

export function Header({ isAdmin = false, onLogout }) {
  return (
    <header style={{
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      height:90
    }}>
      <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
        <div style={{ width:'200px'}}>
          <img src="/ELdelCT.png" alt="imagenCT" width={150} height={50}/>
        </div>
        <div  style={{width:'200px'}}>
          <h2>Eventos</h2>
        </div>
        <div  style={{width:'200px'}}>
          <h2>Redes</h2>
        </div>
        </div>

      {/*aqui valida nuevamente el estado del isAdmin para cuando ya es true*/}
      {/*{isAdmin && (
        <h1>ok</h1>
      )}*/}
    </header>
  );
}