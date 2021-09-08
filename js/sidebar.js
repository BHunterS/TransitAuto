const sidebar = document.querySelector('.sidebar');
const sidebarButton = document.querySelector('.user-area__sidebar-button')

function sidebarMenu(sidebar, sidebarButton) {
    sidebarButton.addEventListener('click', () => {
        sidebar.classList.toggle('_active');
    });
}

sidebarMenu(sidebar, sidebarButton);