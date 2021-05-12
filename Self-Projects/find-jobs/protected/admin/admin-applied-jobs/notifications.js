// window.onload = function(){
//     loadNotification();
// }

// function loadNotification() {
//     document.querySelector('#notification')
//     const res = await fetch('/loadNotification'), {
//         method:"GET",
//     }
//     console.log('you have 2 new notifications')
//     const latestJob = await res.json();
//     document.querySelector('.notification-body').innerHTML = 'This week you have 10 exciting jobs waiting to apply'
// }

// const navbarPopup = document.querySelector('.navbar-nav');


    
// const openNotificationButtons = document.querySelectorAll('[data-notification-target]')
const closeNotificationButton = document.querySelector('.close-button')
const overlay = document.querySelector('#overlay')
const notification = document.querySelector('#notification')

overlay.addEventListener('click', () => {
    document.querySelector('.notification.active')
    closeNotification(notification)
})

overlay.addEventListener('click', () => {
    document.querySelector('.notification.active')
    closeNotification(notification)
})






closeNotificationButton.addEventListener('click', () => {
    // const notification = button.closest('#notification')
    document.querySelector('.notification.active')
    closeNotification(notification)
})


function closeNotification(notification) {

    if (notification == null) return

    notification.classList.remove('notification')
    notification.innerHTML = ""
    overlay.remove()

}


// function addNotification(notification){
//     if (notification == null) return
//     notification.classList.add('active')
//     overlay.classList.add('active')
// }






// openNotificationButtons.forEach(button => {
//     button.addEventListener('click', ()=> {
//         const notification = document.querySelector(button.DATA_SECTION_NODE.notificationTarget)
//         addNotification(notification)
//     })
// })




