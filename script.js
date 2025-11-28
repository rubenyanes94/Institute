document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const modalContentContainer = document.getElementById('modalContentContainer');
    const modalHeader = document.querySelector('#loginModal .modal-header');

    // Función para mostrar la interfaz post-login
    const showLoggedInView = (username) => {
        // 1. Actualiza el encabezado del modal
        if (modalHeader) {
            modalHeader.innerHTML = `
                <h5 class="modal-title text-white"><i class="fas fa-user-check me-2"></i> Bienvenid@, ${username}!</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            `;
        }
        
        // 2. Define y reemplaza el contenido del cuerpo del modal
        const loggedInContent = `
            <div class="text-center py-3">
                <i class="fas fa-graduation-cap fa-4x text-primary mb-3"></i>
                <p class="lead fw-bold">Acceso Rápido a tus Recursos</p>
                <hr>
                <div class="d-grid gap-3">
                    <button class="btn btn-success btn-lg"><i class="fas fa-book-reader me-2"></i> Ir a Mis Cursos</button>
                    <button class="btn btn-info btn-lg text-white"><i class="fas fa-chart-bar me-2"></i> Revisar Mis Notas</button>
                    <button class="btn btn-secondary btn-sm" id="logoutButton"><i class="fas fa-sign-out-alt me-2"></i> Cerrar Sesión</button>
                </div>
            </div>
        `;

        if (modalContentContainer) {
            modalContentContainer.innerHTML = loggedInContent;
        }

        // 3. Añade la funcionalidad de "Cerrar Sesión"
        document.getElementById('logoutButton').addEventListener('click', () => {
            // Recargar la página para volver al estado inicial del modal
            window.location.reload(); 
        });
    };

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = document.getElementById('emailInput').value;
            const passwordInput = document.getElementById('passwordInput').value;
            
            // SIMULACIÓN DE VALIDACIÓN
            if (emailInput === 'admin@psicoacademia.edu.ve' && passwordInput === '12345') {
                loginMessage.classList.remove('d-none', 'alert-danger');
                loginMessage.classList.add('alert-success');
                loginMessage.textContent = `¡Credenciales válidas! Accediendo...`;
                
                // Mostrar la interfaz post-login después de un breve tiempo
                setTimeout(() => {
                    const username = emailInput.split('@')[0]; // Usar la parte inicial del email como nombre de usuario
                    showLoggedInView(username);
                }, 1000);

            } else {
                // Fallo en el inicio de sesión
                loginMessage.classList.remove('d-none', 'alert-success');
                loginMessage.classList.add('alert-danger');
                loginMessage.textContent = 'Error: Credenciales inválidas. Inténtalo de nuevo.';
                document.getElementById('passwordInput').value = '';
            }
        });
    }

    // Código para resetear el modal si se cierra (opcional, si no recargas la página)
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('hidden.bs.modal', () => {
            // En un proyecto real, se resetearía el estado del modal aquí.
            // Para la simplicidad, hemos optado por recargar en 'Cerrar Sesión'.
        });
    }
});