# Aarohhan Valorant Tournament - Group Stage

A beautiful glassmorphic web page to display and manage the Aarohhan Valorant Tournament group stage standings.

**Organized by DrawFive**

## Features

- **4 Groups Display**: Shows all 4 groups (A, B, C, D) with 5 teams each
- **LAN Qualifiers Page**: Displays the top 2 teams from each group who qualified for LAN
- **Downloadable Results Template**: Generate and download tournament results as an image
- **Admin Panel**: Update scores and team logos easily
- **Glassmorphism Design**: Modern frosted glass effect matching Valorant aesthetics
- **Auto-sorting**: Teams are automatically sorted by wins and round difference
- **Data Persistence**: Your changes are saved in browser localStorage
- **Export Function**: Export tournament data as JSON

## Setup

1. **Add Background Image**: 
   - Save your Valorant background image as `background.jpg` in the main folder
   - The page will use a fallback purple gradient if the image is not found

2. **Open `index.html`** in your web browser

## How to Use

### View Standings
Click "Group Standings" tab to see all groups with standings

### View LAN Qualifiers
Click "LAN Qualifiers" tab to see the 8 teams that qualified for LAN finals

### Download Results
1. Click "Download Results" tab
2. Preview the results template
3. Click "Download as Image" to save as PNG
4. Use "Refresh Data" to update with latest standings

### Update Scores
1. Click "Admin Panel" tab
2. Select a group and team
3. Update wins, losses, and round difference
4. Click "Update Team"

### Add Team Logos
- Place logo images in the `logos/` folder
- Name them as: `teamname.png` (e.g., `bots.png`, `blackflash.png`)
- Or use the Admin Panel to set logo URLs

## Logo Naming Convention

Place your team logo files in the `logos/` folder:

### Group A
- bots.png
- bloodline.png
- cardboard_rex.png
- whiff.png
- fdk_hunters.png

### Group B
- blackflash.png
- drag_squad.png
- marathi_medium.png
- power_rangers.png
- zaza.png

### Group C
- mit_wpu_a.png
- clip.png
- zexy_boys.png
- apollo.png
- zephyr.png

### Group D
- m4c.png
- mit_wpu_b.png
- flix.png
- stryker.png
- shroudstep.png

## Files

- `index.html` - Main page
- `styles.css` - Glassmorphism styling
- `script.js` - Functionality & image download
- `logos/` - Folder for team logos
- `background.jpg` - Custom background image (add your own)

## Technical Details

- Pure HTML, CSS, and JavaScript
- html2canvas library for image generation
- Responsive design for mobile and desktop
- Purple/pink/cyan Valorant-inspired color scheme
- Glassmorphism effects with backdrop blur

---
*Aarohhan Valorant Tournament | Organized by DrawFive | 2026*
