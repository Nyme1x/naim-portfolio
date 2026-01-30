# Portfolio Setup Instructions

## What's New! 🎉

Your portfolio now includes:

1. **3D Interactive Laptop Animation**
   - Responds to your mouse movement
   - 360-degree rotation effect
   - Floating animation
   - LED lights with pulsing glow effects (Pink, Cyan, Green)

2. **Profile Picture Section**
   - Circular image placeholder in the About section
   - Add your photo as `naim.jpg` in the same folder as the HTML files

3. **Modern Hero Section**
   - Left: Content and copy with "SOFTWARE ENGINEER" tag
   - Right: Interactive 3D laptop with LEDs
   - Two-column responsive layout

## How to Add Your Photo

1. Save your photo as **`naim.jpg`** 
2. Place it in the same folder: `/Users/naimbadawi/Desktop/Naim Website/`
3. The image will automatically appear in the "About Me" section

**Image Requirements:**
- Format: `.jpg` (or change `src="naim.jpg"` to your filename)
- Recommended size: 400x400px or larger
- The image will be displayed as a circular 280x280px profile picture

## Interactive Features

### 3D Laptop Mouse Tracking
- Move your mouse around the hero section
- The laptop rotates to follow your cursor
- Smooth 3D perspective effect
- Returns to default position when you move mouse away

### LED Lights
- **Pink LED**: Pulses with 0s delay
- **Cyan LED**: Pulses with 0.3s delay  
- **Green LED**: Pulses with 0.6s delay
- Creates a cool tech aesthetic with glowing effects

### Floating Animation
- The laptop continuously floats up and down
- Combined with mouse tracking for dynamic feel

## File Structure
```
/Users/naimbadawi/Desktop/Naim Website/
├── index.html        (HTML structure)
├── styles.css        (Styling and 3D effects)
├── script.js         (Interactivity and mouse tracking)
├── naim.jpg          (YOUR PHOTO - add this!)
├── README.md         (Documentation)
```

## Customization Tips

### Change LED Colors
Edit `styles.css`, search for `.led-1`, `.led-2`, `.led-3`:
```css
.led-1 {
    background: radial-gradient(circle at 30% 30%, #ff0080, #ff1493);
    box-shadow: 0 0 15px #ff1493, 0 0 25px rgba(255, 20, 147, 0.6);
}
```

### Adjust 3D Laptop Rotation Sensitivity
Edit `script.js`, find the mouse tracking section:
```javascript
const rotateY = (mouseX - 50) * 0.5;  // Increase 0.5 for more rotation
const rotateX = (50 - mouseY) * 0.5;  // Change this value
```

### Modify Floating Speed
Edit `styles.css`, find the `float` animation:
```css
@keyframes float {
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-20px);  /* Change -20px for different height */
    }
}
```
Change animation time from `3s` to faster/slower (e.g., `2s` for faster).

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (responsive)

## Next Steps
1. **Add naim.jpg** to complete the portfolio
2. Open `index.html` in your browser
3. Move your mouse over the hero section to see the 3D effect!

---

Enjoy your new portfolio! 🚀
