// Canvas Background Animation with Particles

class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 0;
        this.connectionDistance = 150;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.initParticles();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        // Adjust particle count based on screen size
        const area = this.canvas.width * this.canvas.height;
        this.particleCount = Math.max(20, Math.floor(area / 15000));
        
        if (this.particles.length === 0) {
            this.initParticles();
        }
    }
    
    initParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 1,
                vy: (Math.random() - 0.5) * 1,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    updateParticles() {
        for (let particle of this.particles) {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Slight oscillation in opacity
            particle.opacity += (Math.random() - 0.5) * 0.05;
            particle.opacity = Math.max(0.2, Math.min(0.8, particle.opacity));
        }
    }
    
    drawParticles() {
        for (let particle of this.particles) {
            this.ctx.fillStyle = `rgba(232, 0, 13, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            this.ctx.strokeStyle = `rgba(232, 0, 13, ${particle.opacity * 0.5})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
        }
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    
                    this.ctx.strokeStyle = `rgba(232, 0, 13, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize canvas only when hero section is in viewport
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-bg');
    
    if (canvas) {
        let particleSystem = null;
        
        // Create IntersectionObserver to initialize only when needed
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !particleSystem) {
                    particleSystem = new ParticleSystem(canvas);
                    observer.unobserve(canvas);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(canvas);
    }
});
