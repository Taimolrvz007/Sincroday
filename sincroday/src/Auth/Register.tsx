import './authStyles.css'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <div className="login-brand">
          <span className="login-brand-dot"></span>
          <span>Sincroday</span>
        </div>

        <h1>Crear cuenta</h1>
        <p className="login-sub">Únete a Sincroday hoy</p>

        <form>
          <label>CORREO ELECTRÓNICO</label>
          <div className="input-group">
            <input type="email" placeholder="correo@ejemplo.com" />
          </div>

          <label>CONTRASEÑA</label>
          <div className="input-group">
            <input type="password" placeholder="••••••••" />
          </div>

          <label>CONFIRMAR CONTRASEÑA</label>
          <div className="input-group">
            <input type="password" placeholder="••••••••" />
          </div>

          <button type="submit">Crear cuenta</button>
        </form>

        <p className="register-link">
          ¿Ya tienes cuenta?{' '}
          <a href="#" onClick={() => navigate('/')}>Inicia sesión</a>
        </p>

      </div>
    </div>
  )
}

export default Register