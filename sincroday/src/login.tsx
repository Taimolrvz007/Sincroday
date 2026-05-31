import './loginStyles.css'

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Bienvenido</h1>
        <p>Inicia sesión para continuar</p>

        <form>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input type="email" placeholder="correo@ejemplo.com" />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>

        <p className="register-link">
          ¿No tienes cuenta? <a href="#">Regístrate</a>
        </p>
      </div>
    </div>
  )
}

export default Login