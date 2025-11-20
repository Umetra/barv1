// Imports CSS
import './css/base.css'
import './css/components.css'
import './css/responsive.css'

// Import JS modules
import './js/events.js'
import './js/navigation.js'

console.log('🍸 Le Bar - Site chargé avec succès!')



// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
})

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const reveals = document.querySelectorAll('.reveal')

const revealOnScroll = () => {
    const windowHeight = window.innerHeight
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const revealPoint = 100
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active')
        }
    })
}

window.addEventListener('scroll', revealOnScroll)
revealOnScroll() // Initial check

// ============================================
// CANVAS ANIMATED BACKGROUND
// ============================================
const canvas = document.getElementById('bgCanvas')
const ctx = canvas?.getContext('2d')

if (canvas && ctx) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width
            this.y = Math.random() * canvas.height
            this.size = Math.random() * 3 + 1
            this.speedX = Math.random() * 0.5 - 0.25
            this.speedY = Math.random() * 0.5 - 0.25
            this.opacity = Math.random() * 0.5 + 0.2
        }

        update() {
            this.x += this.speedX
            this.y += this.speedY

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    const particles = []
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle())
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        particles.forEach(particle => {
            particle.update()
            particle.draw()
        })

        // Dessiner les connections entre particules
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x
                const dy = p1.y - p2.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - distance / 150)})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                    ctx.stroke()
                }
            })
        })

        requestAnimationFrame(animateParticles)
    }

    animateParticles()
}

// ============================================
// FORMULAIRE DE RÉSERVATION
// ============================================
const form = document.getElementById('reservationForm')

form?.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        guests: document.getElementById('guests')?.value,
        date: document.getElementById('date')?.value,
        time: document.getElementById('time')?.value,
        message: document.getElementById('message')?.value
    }

    console.log('Réservation:', formData)

    alert(`Merci ${formData.name} ! 🍸\n\nVotre réservation pour ${formData.guests} personnes le ${formData.date} à ${formData.time} a été enregistrée.\n\nNous vous confirmerons par email à ${formData.email}.`)
    
    form.reset()
})

// Définir la date minimum à aujourd'hui
const dateInput = document.getElementById('date')
if (dateInput) {
    const today = new Date().toISOString().split('T')[0]
    dateInput.setAttribute('min', today)
}
