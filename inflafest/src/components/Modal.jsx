// =============================================
//   INFLAFEST — Modal Component
//   src/components/Modal.jsx
// =============================================

import { useEffect } from 'react'
import { X } from 'lucide-react'

// ── Exemplo de uso ────────────────────────────
// const [open, setOpen] = useState(false)
//
// <Modal
//   open={open}
//   onClose={() => setOpen(false)}
//   title="Novo Cliente"
// >
//   <p>Conteúdo do modal aqui</p>
// </Modal>

export default function Modal({ open, onClose, title, children, width = '480px' }) {

  // Fecha com tecla ESC
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Trava o scroll do body enquanto modal está aberto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: width }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close btn btn-icon" onClick={onClose} aria-label="Fechar">
            <X size={16} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Componente auxiliar para rodapé do modal ──
// Uso: <Modal.Footer> ... </Modal.Footer>
Modal.Footer = function ModalFooter({ children }) {
  return (
    <div className="modal-footer">
      {children}
    </div>
  )
}