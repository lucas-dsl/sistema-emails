export function funcionalidadeEmBreve() {
    const modal = document.querySelector(".modal-action-view");
    
    if (modal) {
        modal.classList.remove("is-hidden");
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add("is-hidden");
        }
    };
}