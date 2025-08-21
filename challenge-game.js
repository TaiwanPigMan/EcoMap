// EcoMap Gamification System - Interactive JavaScript
class EcoGameSystem {
    constructor() {
        this.userProfile = {
            name: "Alex Green",
            level: 15,
            points: 2847,
            challengesCompleted: 47,
            currentStreak: 12,
            co2Saved: 156.8,
            avatar: "🌱"
        };
        
        this.challenges = {
            daily: [
                { id: 'transport', name: 'Eco Transport', description: 'Use sustainable transportation', points: 50, progress: 0, target: 1, completed: false },
                { id: 'energy', name: 'Energy Saver', description: 'Reduce energy consumption', points: 30, progress: 0, target: 3, completed: false },
                { id: 'waste', name: 'Zero Waste', description: 'Minimize waste production', points: 40, progress: 0, target: 1, completed: false }
            ],
            weekly: [
                { id: 'school-green', name: 'School Green Initiative', description: 'Organize sustainability event at school', points: 200, progress: 0, target: 1, completed: false },
                { id: 'community-clean', name: 'Community Cleanup', description: 'Participate in local cleanup event', points: 150, progress: 0, target: 1, completed: false }
            ]
        };
        
        this.achievements = [
            { id: 'first-steps', name: 'First Steps', description: 'Complete your first challenge', icon: '👶', earned: true },
            { id: 'streak-master', name: 'Streak Master', description: 'Maintain 7-day streak', icon: '🔥', earned: true },
            { id: 'eco-warrior', name: 'Eco Warrior', description: 'Complete 50 challenges', icon: '⚔️', earned: false },
            { id: 'carbon-saver', name: 'Carbon Saver', description: 'Save 100kg CO2', icon: '💚', earned: true },
            { id: 'team-player', name: 'Team Player', description: 'Join 5 team challenges', icon: '🤝', earned: false },
            { id: 'knowledge-seeker', name: 'Knowledge Seeker', description: 'Complete 10 educational modules', icon: '📚', earned: false }
        ];
        
        this.leaderboard = [
            { rank: 1, name: "Maya Chen", points: 3542, streak: 18, avatar: "🌿" },
            { rank: 2, name: "Jordan Rivers", points: 3201, streak: 15, avatar: "♻️" },
            { rank: 3, name: "Alex Green", points: 2847, streak: 12, avatar: "🌱" },
            { rank: 4, name: "Sam Torres", points: 2654, streak: 9, avatar: "🌍" },
            { rank: 5, name: "Casey Park", points: 2441, streak: 11, avatar: "🌳" }
        ];
        
        this.environmentalActions = {
            'air-quality': [
                { id: 'bike-commute', name: 'Bike to School/Work', points: 25, description: 'Choose cycling over driving' },
                { id: 'carpool', name: 'Join a Carpool', points: 20, description: 'Share rides with others' },
                { id: 'plant-tree', name: 'Plant a Tree', points: 50, description: 'Add greenery to improve air quality' }
            ],
            'temperature': [
                { id: 'energy-audit', name: 'Home Energy Audit', points: 30, description: 'Check for energy inefficiencies' },
                { id: 'led-bulbs', name: 'Switch to LED Bulbs', points: 15, description: 'Replace incandescent lighting' },
                { id: 'thermostat', name: 'Adjust Thermostat', points: 10, description: 'Optimize heating/cooling settings' }
            ],
            'water-quality': [
                { id: 'rain-barrel', name: 'Install Rain Barrel', points: 40, description: 'Collect rainwater for gardening' },
                { id: 'fix-leaks', name: 'Fix Water Leaks', points: 25, description: 'Repair dripping faucets and pipes' },
                { id: 'low-flow', name: 'Install Low-Flow Fixtures', points: 35, description: 'Reduce water consumption' }
            ],
            'recycling': [
                { id: 'compost-bin', name: 'Start Composting', points: 30, description: 'Turn organic waste into fertilizer' },
                { id: 'recycle-electronics', name: 'Recycle Electronics', points: 25, description: 'Properly dispose of e-waste' },
                { id: 'reusable-bags', name: 'Use Reusable Bags', points: 10, description: 'Eliminate single-use plastic bags' }
            ],
            'transportation': [
                { id: 'public-transit', name: 'Use Public Transit', points: 20, description: 'Choose buses or trains over cars' },
                { id: 'walk-short', name: 'Walk Short Distances', points: 15, description: 'Walk for trips under 1 mile' },
                { id: 'electric-vehicle', name: 'Drive Electric', points: 40, description: 'Use electric or hybrid vehicles' }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.updateUserProfile();
        this.renderChallenges();
        this.renderAchievements();
        this.renderLeaderboard();
        this.renderEnvironmentalActions();
        this.setupEventListeners();
        this.setupTabNavigation();
        this.startRealtimeUpdates();
        this.loadUserData();
    }
    
    loadUserData() {
        // Load user data from localStorage if available
        const savedProfile = localStorage.getItem('ecoMapProfile');
        if (savedProfile) {
            this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
            this.updateUserProfile();
        }
        
        const savedChallenges = localStorage.getItem('ecoMapChallenges');
        if (savedChallenges) {
            this.challenges = { ...this.challenges, ...JSON.parse(savedChallenges) };
            this.renderChallenges();
        }
        
        const savedAchievements = localStorage.getItem('ecoMapAchievements');
        if (savedAchievements) {
            this.achievements = JSON.parse(savedAchievements);
            this.renderAchievements();
        }
    }
    
    saveUserData() {
        localStorage.setItem('ecoMapProfile', JSON.stringify(this.userProfile));
        localStorage.setItem('ecoMapChallenges', JSON.stringify(this.challenges));
        localStorage.setItem('ecoMapAchievements', JSON.stringify(this.achievements));
    }
    
    updateUserProfile() {
        // Use more defensive programming with try-catch
        try {
            const userNameEl = document.getElementById('userName');
            const levelBadgeEl = document.getElementById('userLevel');
            const avatarEl = document.getElementById('userAvatar');
            
            if (userNameEl) userNameEl.textContent = this.userProfile.name;
            if (levelBadgeEl) levelBadgeEl.textContent = `Lvl ${this.userProfile.level}`;
            if (avatarEl) avatarEl.textContent = this.userProfile.avatar;
            
            // Update stats using IDs
            const totalPointsEl = document.getElementById('totalPoints');
            const challengesCompletedEl = document.getElementById('challengesCompleted');
            const currentStreakEl = document.getElementById('currentStreak');
            const co2SavedEl = document.getElementById('co2Saved');
            
            if (totalPointsEl) totalPointsEl.textContent = this.userProfile.points.toLocaleString();
            if (challengesCompletedEl) challengesCompletedEl.textContent = this.userProfile.challengesCompleted;
            if (currentStreakEl) currentStreakEl.textContent = this.userProfile.currentStreak;
            if (co2SavedEl) co2SavedEl.textContent = this.userProfile.co2Saved.toFixed(1);
            
            // Update XP bar
            const xpFillEl = document.getElementById('xpFill');
            const xpTextEl = document.getElementById('xpText');
            
            if (xpFillEl && xpTextEl) {
                const currentLevelXP = (this.userProfile.level - 1) * 200;
                const nextLevelXP = this.userProfile.level * 200;
                const progress = ((this.userProfile.points - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
                xpFillEl.style.width = `${Math.min(progress, 100)}%`;
                xpTextEl.textContent = `${this.userProfile.points - currentLevelXP} / ${nextLevelXP - currentLevelXP} XP`;
            }
        } catch (error) {
            console.log('Error updating user profile:', error);
        }
    }
    
    renderChallenges() {
        // Daily challenges
        const dailyChallengesContainer = document.querySelector('.challenges-grid');
        if (dailyChallengesContainer) {
            // Clear existing daily challenges only
            const dailyCards = dailyChallengesContainer.querySelectorAll('.challenge-card.daily');
            dailyCards.forEach(card => card.remove());
            
            this.challenges.daily.forEach(challenge => {
                const challengeElement = this.createChallengeElement(challenge, 'daily');
                dailyChallengesContainer.appendChild(challengeElement);
            });
        }
        
        // Weekly challenges
        const weeklyChallengesContainer = document.querySelector('.weekly-challenges');
        if (weeklyChallengesContainer) {
            const weeklyCards = weeklyChallengesContainer.querySelectorAll('.challenge-card.weekly');
            weeklyCards.forEach(card => card.remove());
            
            this.challenges.weekly.forEach(challenge => {
                const challengeElement = this.createChallengeElement(challenge, 'weekly');
                weeklyChallengesContainer.appendChild(challengeElement);
            });
        }
    }
    
    createChallengeElement(challenge, type = 'daily') {
        const div = document.createElement('div');
        div.className = `challenge-card ${type} ${challenge.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <div class="challenge-header">
                <h4>${challenge.name}</h4>
                <span class="challenge-points">+${challenge.points} pts</span>
            </div>
            <p class="challenge-description">${challenge.description}</p>
            <div class="challenge-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(challenge.progress / challenge.target) * 100}%"></div>
                </div>
                <span class="progress-text">${challenge.progress}/${challenge.target}</span>
            </div>
            <button class="challenge-action-btn ${challenge.completed ? 'completed' : ''}" data-challenge-id="${challenge.id}">
                ${challenge.completed ? 'Completed ✓' : 'Mark Complete'}
            </button>
        `;
        return div;
    }
    
    renderAchievements() {
        const achievementsGrid = document.querySelector('.achievements-grid');
        achievementsGrid.innerHTML = '';
        
        this.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-badge ${achievement.earned ? 'earned' : 'locked'}`;
            achievementElement.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
                ${achievement.earned ? '<div class="earned-indicator">✓</div>' : '<div class="locked-indicator">🔒</div>'}
            `;
            achievementsGrid.appendChild(achievementElement);
        });
    }
    
    renderLeaderboard() {
        const leaderboardList = document.querySelector('.leaderboard-list');
        leaderboardList.innerHTML = '';
        
        this.leaderboard.forEach(player => {
            const playerElement = document.createElement('div');
            playerElement.className = `leaderboard-item ${player.rank <= 3 ? 'top-three' : ''}`;
            playerElement.innerHTML = `
                <div class="rank">${player.rank}</div>
                <div class="player-info">
                    <span class="player-avatar">${player.avatar}</span>
                    <span class="player-name">${player.name}</span>
                </div>
                <div class="player-stats">
                    <span class="points">${player.points.toLocaleString()} pts</span>
                    <span class="streak">${player.streak} day streak</span>
                </div>
            `;
            leaderboardList.appendChild(playerElement);
        });
    }
    
    renderEnvironmentalActions() {
        const actionsContainer = document.querySelector('.environmental-actions');
        if (!actionsContainer) return;
        
        Object.keys(this.environmentalActions).forEach(category => {
            const categoryActions = this.environmentalActions[category];
            const categoryElement = document.querySelector(`[data-category="${category}"] .metric-actions`);
            
            if (categoryElement) {
                categoryElement.innerHTML = '';
                categoryActions.forEach(action => {
                    const actionButton = document.createElement('button');
                    actionButton.className = 'action-btn';
                    actionButton.dataset.actionId = action.id;
                    actionButton.dataset.category = category;
                    actionButton.innerHTML = `
                        <span class="action-name">${action.name}</span>
                        <span class="action-points">+${action.points} pts</span>
                    `;
                    actionButton.title = action.description;
                    categoryElement.appendChild(actionButton);
                });
            }
        });
    }
    
    setupTabNavigation() {
        // Tab navigation functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.target.dataset.tab;
                this.switchTab(targetTab);
            });
        });
    }
    
    switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-content`).classList.add('active');
        
        // Special handling for different tabs
        if (tabName === 'impact') {
            this.renderImpactCharts();
        } else if (tabName === 'achievements') {
            this.renderAchievements();
        }
    }
    
    renderImpactCharts() {
        // Render CO2 impact chart
        const co2Chart = document.getElementById('co2Chart');
        if (co2Chart && !co2Chart.chartInstance) {
            const ctx = co2Chart.getContext('2d');
            co2Chart.chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'CO₂ Saved (lbs)',
                        data: [2.1, 3.5, 2.8, 4.2, 3.1, 5.6, 4.8],
                        borderColor: '#22c55e',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        },
                        x: {
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            }
                        }
                    }
                }
            });
        }
        
        // Render actions breakdown chart
        const actionsChart = document.getElementById('actionsChart');
        if (actionsChart && !actionsChart.chartInstance) {
            const ctx = actionsChart.getContext('2d');
            actionsChart.chartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Transportation', 'Energy', 'Water', 'Recycling', 'Other'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#3b82f6',
                            '#f59e0b',
                            '#06b6d4',
                            '#22c55e',
                            '#8b5cf6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }
    
    setupEventListeners() {
        // Quick action buttons
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.logQuickAction(action);
            });
        });
        
        // Challenge completion buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('challenge-action-btn')) {
                const challengeId = e.target.dataset.challengeId;
                this.completeChallenge(challengeId);
            }
        });
        
        // Environmental action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('action-btn') || e.target.closest('.action-btn')) {
                const actionBtn = e.target.classList.contains('action-btn') ? e.target : e.target.closest('.action-btn');
                const actionId = actionBtn.dataset.actionId;
                const category = actionBtn.dataset.category;
                this.completeEnvironmentalAction(actionId, category);
            }
        });
        
        // Leaderboard filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterLeaderboard(filter);
            });
        });
    }
    
    logQuickAction(action) {
        const pointsMap = {
            'bike': 25,
            'recycle': 15,
            'energy': 20,
            'water': 10
        };
        
        const points = pointsMap[action] || 10;
        this.addPoints(points);
        this.showNotification(`Great! +${points} points for ${action} action!`, 'success');
        
        // Update relevant challenge progress
        if (action === 'bike') {
            this.updateChallengeProgress('transport', 1);
        } else if (action === 'energy') {
            this.updateChallengeProgress('energy', 1);
        } else if (action === 'recycle') {
            this.updateChallengeProgress('waste', 1);
        }
    }
    
    completeChallenge(challengeId) {
        const dailyChallenge = this.challenges.daily.find(c => c.id === challengeId);
        const weeklyChallenge = this.challenges.weekly.find(c => c.id === challengeId);
        const challenge = dailyChallenge || weeklyChallenge;
        
        if (challenge && !challenge.completed) {
            challenge.completed = true;
            challenge.progress = challenge.target;
            this.addPoints(challenge.points);
            this.userProfile.challengesCompleted++;
            
            this.showNotification(`Challenge completed! +${challenge.points} points!`, 'success');
            this.checkAchievements();
            this.renderChallenges();
            this.updateUserProfile();
        }
    }
    
    updateChallengeProgress(challengeId, increment) {
        const challenge = this.challenges.daily.find(c => c.id === challengeId);
        if (challenge && !challenge.completed) {
            challenge.progress = Math.min(challenge.progress + increment, challenge.target);
            if (challenge.progress >= challenge.target) {
                this.completeChallenge(challengeId);
            } else {
                this.renderChallenges();
            }
        }
    }
    
    startChallenge(challengeId) {
        const dailyChallenge = this.challenges.daily.find(c => c.id === challengeId);
        const weeklyChallenge = this.challenges.weekly.find(c => c.id === challengeId);
        const challenge = dailyChallenge || weeklyChallenge;
        
        if (challenge && !challenge.completed) {
            // Show modal with challenge details
            this.showChallengeModal(challenge);
        } else if (challenge && challenge.completed) {
            this.showNotification(`Challenge "${challenge.name}" already completed!`, 'info');
        } else {
            this.showNotification('Challenge not found!', 'info');
        }
    }
    
    viewChallenge(challengeId) {
        const weeklyChallenge = this.challenges.weekly.find(c => c.id === challengeId);
        if (weeklyChallenge) {
            this.showChallengeModal(weeklyChallenge);
        }
    }
    
    showChallengeModal(challenge) {
        const modal = document.getElementById('challengeModal');
        const modalIcon = document.getElementById('modalIcon');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrimaryBtn = document.getElementById('modalPrimaryBtn');
        
        if (modal && modalIcon && modalTitle && modalDescription && modalPrimaryBtn) {
            // Set modal content based on challenge
            const challengeIcons = {
                'transport': '🚲',
                'energy': '💡',
                'waste': '🗑️',
                'school-green': '🏫',
                'community-impact': '🌍'
            };
            
            modalIcon.textContent = challengeIcons[challenge.id] || '🌱';
            modalTitle.textContent = challenge.name;
            modalDescription.textContent = challenge.description;
            modalPrimaryBtn.textContent = challenge.completed ? 'Completed ✓' : 'Start Challenge';
            
            // Update click handler for primary button
            modalPrimaryBtn.onclick = () => {
                if (!challenge.completed) {
                    this.completeChallenge(challenge.id);
                    closeModal();
                }
            };
            
            modal.style.display = 'block';
        }
    }
    
    completeEnvironmentalAction(actionId, category) {
        const action = this.environmentalActions[category]?.find(a => a.id === actionId);
        if (action) {
            this.addPoints(action.points);
            this.showNotification(`${action.name} completed! +${action.points} points!`, 'success');
            
            // Update CO2 savings estimate
            const co2Saved = action.points * 0.1; // Simple calculation
            this.userProfile.co2Saved += co2Saved;
            this.updateUserProfile();
            
            // Animate the button
            const actionBtn = document.querySelector(`[data-action-id="${actionId}"]`);
            if (actionBtn) {
                actionBtn.classList.add('completed');
                setTimeout(() => actionBtn.classList.remove('completed'), 2000);
            }
        }
    }
    
    addPoints(points) {
        this.userProfile.points += points;
        
        // Check for level up
        const newLevel = Math.floor(this.userProfile.points / 200) + 1;
        if (newLevel > this.userProfile.level) {
            this.userProfile.level = newLevel;
            this.showNotification(`Level Up! You're now level ${newLevel}!`, 'levelup');
        }
        
        this.updateUserProfile();
        this.saveUserData();
    }
    
    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!achievement.earned) {
                let shouldEarn = false;
                
                switch (achievement.id) {
                    case 'eco-warrior':
                        shouldEarn = this.userProfile.challengesCompleted >= 50;
                        break;
                    case 'team-player':
                        // This would be tracked separately in a real app
                        break;
                    case 'knowledge-seeker':
                        // This would be tracked separately in a real app
                        break;
                }
                
                if (shouldEarn) {
                    achievement.earned = true;
                    this.showNotification(`Achievement Unlocked: ${achievement.name}!`, 'achievement');
                    this.renderAchievements();
                }
            }
        });
    }
    
    filterLeaderboard(filter) {
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // In a real app, this would filter the leaderboard data
        // For now, we'll just show a notification
        this.showNotification(`Showing ${filter} leaderboard`, 'info');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            }
            .notification.success { background: #22c55e; }
            .notification.levelup { background: #f59e0b; }
            .notification.achievement { background: #8b5cf6; }
            .notification.info { background: #3b82f6; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        if (!document.querySelector('style[data-notifications]')) {
            style.setAttribute('data-notifications', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    startRealtimeUpdates() {
        // Simulate real-time updates (in a real app, this would connect to a backend)
        setInterval(() => {
            this.updateEnvironmentalMetrics();
        }, 30000); // Update every 30 seconds
    }
    
    updateEnvironmentalMetrics() {
        // This would fetch real environmental data in a production app
        // For now, we'll simulate small changes
        const metrics = ['aqi', 'temperature', 'humidity', 'water-quality'];
        metrics.forEach(metric => {
            const element = document.querySelector(`[data-metric="${metric}"] .metric-value`);
            if (element) {
                const currentValue = parseFloat(element.textContent);
                const change = (Math.random() - 0.5) * 2; // Random change between -1 and 1
                const newValue = Math.max(0, currentValue + change);
                element.textContent = metric === 'temperature' ? 
                    `${newValue.toFixed(1)}°F` : 
                    newValue.toFixed(0);
            }
        });
    }
}

// Initialize the game system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.ecoGame = new EcoGameSystem();
});

// Global functions for HTML onclick handlers
function startChallenge(challengeId) {
    if (window.ecoGame) {
        window.ecoGame.startChallenge(challengeId);
    }
}

function viewChallenge(challengeId) {
    if (window.ecoGame) {
        window.ecoGame.viewChallenge(challengeId);
    }
}

function closeModal() {
    const modal = document.getElementById('challengeModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcoGameSystem;
}
