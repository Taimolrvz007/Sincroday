import './AuthStyles.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-brand-dot"></span>
          <span>Sincroday</span>
        </div>
        <h1>Sincronizá tu día</h1>
        <p className="login-sub"></p>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/schedule') }}>
          <label>CORREO ELECTRÓNICO</label>
          <div className="input-group">
            <input type="email" placeholder="correo@ejemplo.com" />
          </div>

          <label>CONTRASEÑA</label>
          <div className="input-group">
            <input type="password" placeholder="••••••••" />
          </div>

          <div className="forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>

        <div className="divider">
          <hr /><span>o continúa con</span><hr />
        </div>

        <button className="google-btn" type="button">
          Google
        </button>

        <p className="register-link">
          ¿No tienes cuenta?{' '}
          <a href="#" onClick={() => navigate('/register')}>Regístrate</a>
        </p>
      </div>
    </div>
  )
}

export default Login
