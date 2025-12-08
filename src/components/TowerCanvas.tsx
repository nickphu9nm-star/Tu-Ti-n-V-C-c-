
import React, { useRef, useEffect } from 'react';

const TowerCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animationFrameId: number; let time = 0;
    const width = 200; const height = 200; const scale = 2;
    canvas.width = width * scale; canvas.height = height * scale; ctx.scale(scale, scale);

    const render = () => {
      time += 0.05; ctx.clearRect(0, 0, width, height);
      const cx = width / 2; const cy = height / 2;
      
      // Draw aura
      const gradient = ctx.createRadialGradient(cx, cy, 30, cx, cy, 90);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(cx, cy + Math.sin(time) * 5);
      
      // Draw Monster Shape (Generic shadowy demon)
      ctx.fillStyle = "#1e1b4b"; // Dark indigo
      ctx.strokeStyle = "#8b5cf6"; // Violet
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      // Body
      ctx.moveTo(0, 40);
      ctx.quadraticCurveTo(-30, 0, -20, -40); // Left side
      ctx.lineTo(-10, -30); // Horn notch
      ctx.lineTo(0, -50); // Top head
      ctx.lineTo(10, -30);
      ctx.lineTo(20, -40); // Right side
      ctx.quadraticCurveTo(30, 0, 0, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Eyes
      ctx.fillStyle = "#ef4444";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ef4444";
      ctx.beginPath();
      ctx.arc(-10, -10, 3 + Math.sin(time*5), 0, Math.PI*2);
      ctx.arc(10, -10, 3 + Math.sin(time*5), 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Runes/Markings
      ctx.strokeStyle = "#c4b5fd";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 20);
      ctx.moveTo(-10, 10);
      ctx.lineTo(10, 10);
      ctx.stroke();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };
    render(); return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (<div className="w-full h-48 flex items-center justify-center"><canvas ref={canvasRef} style={{ width: 200, height: 200 }} /></div>);
};
export default TowerCanvas;