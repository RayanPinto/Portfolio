// Particles Animation System
class ParticlesAnimation {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.mouse = { x: 0, y: 0 };
        this.settings = {
            particleCount: 80,
            particleSize: 3,
            particleSpeed: 1.2,
            connectionDistance: 180,
            connectionOpacity: 0.4,
            particleColor: '#00abf0',
            connectionColor: '#00abf0',
            mouseInteraction: true,
            mouseRadius: 150
        };
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        // Ensure canvas doesn't exceed viewport width
        const maxWidth = Math.min(rect.width, window.innerWidth);
        this.canvas.width = maxWidth;
        this.canvas.height = rect.height;
        
        // Ensure canvas element respects max width
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.width = '100%';
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.settings.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.settings.particleSpeed,
                vy: (Math.random() - 0.5) * this.settings.particleSpeed,
                size: Math.random() * this.settings.particleSize + 1,
                opacity: Math.random() * 0.5 + 0.5,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        if (this.settings.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = 0;
                this.mouse.y = 0;
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Add wave-like movement for more dynamic patterns
            const waveX = Math.sin(particle.pulse + index * 0.1) * 0.5;
            const waveY = Math.cos(particle.pulse + index * 0.15) * 0.5;
            
            // Update position with wave effect
            particle.x += particle.vx + waveX;
            particle.y += particle.vy + waveY;
            
            // Bounce off edges with slight randomization
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.vx += (Math.random() - 0.5) * 0.2; // Add randomness
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.vy += (Math.random() - 0.5) * 0.2; // Add randomness
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Update pulse with varying speeds for different patterns
            particle.pulse += 0.03 + (index % 3) * 0.01;
            
            // Mouse interaction with stronger effect
            if (this.settings.mouseInteraction && this.mouse.x > 0 && this.mouse.y > 0) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.settings.mouseRadius) {
                    const force = (this.settings.mouseRadius - distance) / this.settings.mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    
                    particle.vx -= Math.cos(angle) * force * 0.15;
                    particle.vy -= Math.sin(angle) * force * 0.15;
                }
            }
            
            // Apply minimal friction to maintain movement
            particle.vx *= 0.995;
            particle.vy *= 0.995;
            
            // Add slight random drift for organic movement
            if (Math.random() < 0.02) {
                particle.vx += (Math.random() - 0.5) * 0.1;
                particle.vy += (Math.random() - 0.5) * 0.1;
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            const pulseSize = Math.sin(particle.pulse) * 0.5 + 1;
            const currentSize = particle.size * pulseSize;
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = this.settings.particleColor;
            
            // Create gradient for particles
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentSize
            );
            gradient.addColorStop(0, this.settings.particleColor);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawConnections() {
        this.ctx.save();
        
        // Create gradient for connections
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, this.settings.connectionColor);
        gradient.addColorStop(0.5, '#00d4ff');
        gradient.addColorStop(1, this.settings.connectionColor);
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.settings.connectionDistance) {
                    const opacity = (this.settings.connectionDistance - distance) / this.settings.connectionDistance;
                    this.ctx.globalAlpha = opacity * this.settings.connectionOpacity;
                    
                    // Vary line width based on distance for depth effect
                    this.ctx.lineWidth = Math.max(0.5, 2 * (1 - distance / this.settings.connectionDistance));
                    this.ctx.strokeStyle = this.settings.connectionColor;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
    
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }
}

// Advanced 3D Background Animation
class Background3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.points = [];
        this.animationId = null;
        this.time = 0;
        this.settings = {
            pointCount: 100,
            maxDistance: 200,
            speed: 0.001,
            waveAmplitude: 50,
            waveFrequency: 0.02,
            color: '#00abf0',
            opacity: 0.6
        };
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.createCanvas();
        this.createPoints();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        // Ensure canvas doesn't exceed viewport width
        const maxWidth = Math.min(rect.width, window.innerWidth);
        this.canvas.width = maxWidth;
        this.canvas.height = rect.height;
        
        // Ensure canvas element respects max width
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.width = '100%';
    }
    
    createPoints() {
        this.points = [];
        
        for (let i = 0; i < this.settings.pointCount; i++) {
            this.points.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                phase: Math.random() * Math.PI * 2
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createPoints();
        });
    }
    
    updatePoints() {
        this.points.forEach(point => {
            // Update position with wave effect
            point.x += point.vx + Math.sin(this.time + point.phase) * this.settings.waveAmplitude * 0.01;
            point.y += point.vy + Math.cos(this.time + point.phase) * this.settings.waveAmplitude * 0.01;
            point.z += point.vz;
            
            // Wrap around edges
            if (point.x < 0) point.x = this.canvas.width;
            if (point.x > this.canvas.width) point.x = 0;
            if (point.y < 0) point.y = this.canvas.height;
            if (point.y > this.canvas.height) point.y = 0;
            
            // Z-axis wrapping
            if (point.z < 0) point.z = 1000;
            if (point.z > 1000) point.z = 0;
        });
    }
    
    drawPoints() {
        this.points.forEach(point => {
            const scale = 1000 / (1000 - point.z);
            const x = point.x * scale;
            const y = point.y * scale;
            const size = point.size * scale;
            
            if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
                this.ctx.save();
                this.ctx.globalAlpha = this.settings.opacity * scale;
                
                // Create glow effect
                const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 2);
                gradient.addColorStop(0, this.settings.color);
                gradient.addColorStop(0.5, this.settings.color + '80');
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.restore();
            }
        });
    }
    
    drawConnections() {
        this.ctx.save();
        this.ctx.strokeStyle = this.settings.color;
        
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const scale1 = 1000 / (1000 - this.points[i].z);
                const scale2 = 1000 / (1000 - this.points[j].z);
                
                const x1 = this.points[i].x * scale1;
                const y1 = this.points[i].y * scale1;
                const x2 = this.points[j].x * scale2;
                const y2 = this.points[j].y * scale2;
                
                const dx = x1 - x2;
                const dy = y1 - y2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.settings.maxDistance) {
                    const opacity = (this.settings.maxDistance - distance) / this.settings.maxDistance;
                    this.ctx.globalAlpha = opacity * this.settings.opacity * 0.5;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(x1, y1);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.time += this.settings.speed;
        this.updatePoints();
        this.drawConnections();
        this.drawPoints();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles animation
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        window.particlesAnimation = new ParticlesAnimation('particles');
    }
    
    // Initialize 3D background (optional)
    const background3D = document.getElementById('particles');
    if (background3D) {
        window.background3D = new Background3D('particles');
    }
});

// Export for use in other scripts
window.ParticlesAnimation = ParticlesAnimation;
window.Background3D = Background3D;


