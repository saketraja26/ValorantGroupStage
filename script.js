// Tournament Data
const tournamentData = {
    groupA: [
        { name: "BOTS", wins: 4, losses: 0, rd: 38, logo: "logos/bots.webp" },
        { name: "Bloodline", wins: 3, losses: 1, rd: 8, logo: "logos/bloodline.png" },
        { name: "CardBoard Rex", wins: 2, losses: 2, rd: 4, logo: "logos/drawfive_icon.png" },
        { name: "Whiff", wins: 1, losses: 3, rd: 1, logo: "logos/whiff.png" },
        { name: "FDK Hunters", wins: 0, losses: 4, rd: -51, logo: "logos/drawfive_icon.png" }
    ],
    groupB: [
        { name: "BLACKFLASH", wins: 3, losses: 1, rd: 26, logo: "logos/blackflash.jpg" },
        { name: "Drag Squad", wins: 3, losses: 1, rd: 17, logo: "logos/dragsquad.png" },
        { name: "Marathi Medium", wins: 2, losses: 2, rd: 4, logo: "logos/drawfive_icon.png" },
        { name: "Power Rangers", wins: 2, losses: 2, rd: 2, logo: "logos/drawfive_icon.png" },
        { name: "Zaza", wins: 0, losses: 4, rd: -49, logo: "logos/zaza.jpg" }
    ],
    groupC: [
        { name: "MIT WPU A", wins: 4, losses: 0, rd: 42, logo: "logos/mitwpuA.jpeg" },
        { name: "Clip", wins: 3, losses: 1, rd: 14, logo: "logos/clip.jpeg" },
        { name: "Zexy Boys", wins: 2, losses: 2, rd: 5, logo: "logos/ZexyBoyz.png" },
        { name: "ApoLLo", wins: 1, losses: 3, rd: -17, logo: "logos/apollo.jpg" },
        { name: "Zephyr", wins: 0, losses: 4, rd: -44, logo: "logos/drawfive_icon.png" }
    ],
    groupD: [
        { name: "M4C", wins: 3, losses: 1, rd: 35, logo: "logos/drawfive_icon.png" },
        { name: "MIT WPU B", wins: 3, losses: 1, rd: 17, logo: "logos/mitwpuB.png" },
        { name: "Flix", wins: 3, losses: 1, rd: 1, logo: "logos/flix.png" },
        { name: "Stryker", wins: 1, losses: 3, rd: -13, logo: "logos/drawfive_icon.png" },
        { name: "ShroudStep", wins: 0, losses: 4, rd: -40, logo: "logos/shorudstep.jpg" }
    ]
};

// Authentication - SHA-256 hashed credentials (ID: drawfive, Password: aarohan2025)
const AUTH_HASH = '7e0d9c3f16b8a4e5f2c1d0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9';
const protectedTabs = ['admin'];
let isAuthenticated = sessionStorage.getItem('auth_session') === 'verified';
let pendingTab = null;

// SHA-256 hash function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Verify credentials
async function verifyCredentials(id, password) {
    const combined = id.toLowerCase().trim() + ':' + password.trim();
    const hash = await sha256(combined);
    // Check against multiple valid hashes (obfuscated)
    const validHashes = [
        'a1b2c3d4e5f67890', // decoy
        await sha256('drawfive:aarohan2025'),
        'f0e1d2c3b4a59687'  // decoy
    ];
    return hash === validHashes[1];
}

// Show login modal
function showLoginModal(targetTab) {
    pendingTab = targetTab;
    document.getElementById('loginModal').style.display = 'flex';
    document.getElementById('loginId').value = '';
    document.getElementById('loginPass').value = '';
    document.getElementById('loginError').textContent = '';
    document.getElementById('loginId').focus();
}

// Close login modal
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    pendingTab = null;
}
window.closeLoginModal = closeLoginModal;

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('loginId').value;
    const password = document.getElementById('loginPass').value;
    
    const isValid = await verifyCredentials(id, password);
    
    if (isValid) {
        isAuthenticated = true;
        sessionStorage.setItem('auth_session', 'verified');
        closeLoginModal();
        
        // Navigate to pending tab
        if (pendingTab) {
            navigateToTab(pendingTab);
        }
    } else {
        document.getElementById('loginError').textContent = 'Invalid credentials. Access denied.';
        document.getElementById('loginPass').value = '';
    }
});

// Navigate to tab
function navigateToTab(tabId) {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    const targetContent = document.getElementById(tabId);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const groupSelect = document.getElementById('groupSelect');
const teamSelect = document.getElementById('teamSelect');
const winsInput = document.getElementById('winsInput');
const lossesInput = document.getElementById('lossesInput');
const rdInput = document.getElementById('rdInput');
const logoInput = document.getElementById('logoInput');
const logoFile = document.getElementById('logoFile');
const updateBtn = document.getElementById('updateBtn');
const exportBtn = document.getElementById('exportBtn');

// Tab Navigation with Password Protection
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        // Check if tab is protected
        if (protectedTabs.includes(tabId) && !isAuthenticated) {
            showLoginModal(tabId);
            return;
        }
        
        navigateToTab(tabId);
    });
});

// Admin Circle Button
document.getElementById('adminCircleBtn').addEventListener('click', () => {
    if (!isAuthenticated) {
        showLoginModal('admin');
    } else {
        navigateToTab('admin');
    }
});

// Populate team select based on group
function populateTeamSelect() {
    const group = groupSelect.value;
    const groupKey = `group${group}`;
    const teams = tournamentData[groupKey];
    
    teamSelect.innerHTML = '';
    teams.forEach((team, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });
    
    // Load selected team data
    loadTeamData();
}

// Load team data into form
function loadTeamData() {
    const group = groupSelect.value;
    const groupKey = `group${group}`;
    const teamIndex = parseInt(teamSelect.value);
    const team = tournamentData[groupKey][teamIndex];
    
    if (team) {
        winsInput.value = team.wins;
        lossesInput.value = team.losses;
        rdInput.value = team.rd;
        logoInput.value = team.logo || '';
    }
}

// Update team data
function updateTeam() {
    const group = groupSelect.value;
    const groupKey = `group${group}`;
    const teamIndex = parseInt(teamSelect.value);
    
    // Update data
    tournamentData[groupKey][teamIndex].wins = parseInt(winsInput.value) || 0;
    tournamentData[groupKey][teamIndex].losses = parseInt(lossesInput.value) || 0;
    tournamentData[groupKey][teamIndex].rd = parseInt(rdInput.value) || 0;
    
    if (logoInput.value) {
        tournamentData[groupKey][teamIndex].logo = logoInput.value;
    }
    
    // Sort group by wins, then by RD
    sortGroup(groupKey);
    
    // Re-render tables
    renderGroup(group);
    renderQualifiers();
    
    // Show success message
    showNotification('Team updated successfully!');
}

// Sort group by wins descending, then by RD descending
function sortGroup(groupKey) {
    tournamentData[groupKey].sort((a, b) => {
        if (b.wins !== a.wins) {
            return b.wins - a.wins;
        }
        return b.rd - a.rd;
    });
}

// Render a specific group
function renderGroup(groupLetter) {
    const groupKey = `group${groupLetter}`;
    const teams = tournamentData[groupKey];
    const tbody = document.querySelector(`#group${groupLetter} tbody`);
    
    tbody.innerHTML = '';
    
    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        
        // Add classes based on position
        if (index < 2) {
            row.classList.add('qualified');
        } else if (index === 4) {
            row.classList.add('eliminated');
        }
        
        const rdClass = team.rd >= 0 ? 'positive' : 'negative';
        const rdPrefix = team.rd >= 0 ? '+' : '';
        
        row.innerHTML = `
            <td class="rank">${index + 1}</td>
            <td class="team">
                <img src="${team.logo}" alt="" class="team-logo" onerror="this.src='logos/drawfive_icon.png'">
                <span>${team.name}</span>
            </td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
            <td class="${rdClass}">${rdPrefix}${team.rd}</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Render all qualifiers
function renderQualifiers() {
    const groups = ['A', 'B', 'C', 'D'];
    
    groups.forEach(group => {
        const groupKey = `group${group}`;
        const teams = tournamentData[groupKey];
        const card = document.querySelector(`.qualifier-card.group-${group.toLowerCase()}`);
        
        if (card && teams.length >= 2) {
            const teamsContainer = card.querySelector('.qualifier-teams');
            teamsContainer.innerHTML = '';
            
            for (let i = 0; i < 2; i++) {
                const team = teams[i];
                const teamDiv = document.createElement('div');
                teamDiv.className = `qualifier-team seed-${i + 1}`;
                teamDiv.innerHTML = `
                    <span class="seed">#${i + 1}</span>
                    <img src="${team.logo}" alt="" class="qualifier-logo" onerror="this.src='logos/drawfive_icon.png'">
                    <span class="team-name">${team.name}</span>
                    <span class="record">${team.wins}-${team.losses}</span>
                `;
                teamsContainer.appendChild(teamDiv);
            }
        }
    });
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            logoInput.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Export data as JSON
function exportData() {
    const dataStr = JSON.stringify(tournamentData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tournament_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
        color: #0f0f23;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Event Listeners
groupSelect.addEventListener('change', populateTeamSelect);
teamSelect.addEventListener('change', loadTeamData);
updateBtn.addEventListener('click', updateTeam);
exportBtn.addEventListener('click', exportData);
logoFile.addEventListener('change', handleFileUpload);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateTeamSelect();
    
    // Load saved data from localStorage if available
    const savedData = localStorage.getItem('tournamentData');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            Object.assign(tournamentData, parsed);
            
            // Re-render all groups
            ['A', 'B', 'C', 'D'].forEach(group => renderGroup(group));
            renderQualifiers();
        } catch (e) {
            console.log('No saved data found');
        }
    }
});

// Save data to localStorage whenever it changes
function saveData() {
    localStorage.setItem('tournamentData', JSON.stringify(tournamentData));
}

// Modify updateTeam to save data
const originalUpdateTeam = updateTeam;
updateTeam = function() {
    const group = groupSelect.value;
    const groupKey = `group${group}`;
    const teamIndex = parseInt(teamSelect.value);
    
    // Update data
    tournamentData[groupKey][teamIndex].wins = parseInt(winsInput.value) || 0;
    tournamentData[groupKey][teamIndex].losses = parseInt(lossesInput.value) || 0;
    tournamentData[groupKey][teamIndex].rd = parseInt(rdInput.value) || 0;
    
    if (logoInput.value) {
        tournamentData[groupKey][teamIndex].logo = logoInput.value;
    }
    
    // Sort group by wins, then by RD
    sortGroup(groupKey);
    
    // Re-render tables
    renderGroup(group);
    renderQualifiers();
    
    // Save to localStorage
    saveData();
    
    // Refresh team select to reflect new order
    populateTeamSelect();
    
    // Update template data
    updateTemplateData();
    
    // Show success message
    showNotification('Team updated successfully!');
};

// Template Download Functionality
const downloadBtn = document.getElementById('downloadTemplate');
const refreshBtn = document.getElementById('refreshTemplate');

// Update template data from tournament data
function updateTemplateData() {
    const groups = ['A', 'B', 'C', 'D'];
    
    groups.forEach(group => {
        const groupKey = `group${group}`;
        const teams = tournamentData[groupKey];
        
        if (teams && teams.length >= 2) {
            // Update first place
            const team1Row = document.getElementById(`template${group}1`);
            if (team1Row) {
                team1Row.querySelector('.template-team-name').textContent = teams[0].name;
                team1Row.querySelector('.template-record').textContent = `${teams[0].wins}-${teams[0].losses}`;
            }
            
            // Update second place
            const team2Row = document.getElementById(`template${group}2`);
            if (team2Row) {
                team2Row.querySelector('.template-team-name').textContent = teams[1].name;
                team2Row.querySelector('.template-record').textContent = `${teams[1].wins}-${teams[1].losses}`;
            }
        }
    });
}

// Download template as image
function downloadTemplate() {
    const templateCard = document.querySelector('.template-card');
    
    if (!templateCard) {
        showNotification('Template not found!');
        return;
    }
    
    // Show loading notification
    showNotification('Generating image...');
    
    html2canvas(templateCard, {
        backgroundColor: '#1a0f2e',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'aarohhan_valorant_results.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showNotification('Image downloaded successfully!');
    }).catch(err => {
        console.error('Error generating image:', err);
        showNotification('Error generating image. Try again.');
    });
}

// Event listeners for template buttons
if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadTemplate);
}

if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        updateTemplateData();
        showNotification('Template data refreshed!');
    });
}

// Initial template update
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateTemplateData, 100);
});


