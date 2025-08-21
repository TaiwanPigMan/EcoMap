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
        this.startRealtimeUpdates();
    }
    
    updateUserProfile() {
        document.querySelector('.user-name').textContent = this.userProfile.name;
        document.querySelector('.level-badge').textContent = `Level ${this.userProfile.level}`;
        document.querySelector('.user-avatar').textContent = this.userProfile.avatar;
        
        // Update stats
        document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = this.userProfile.points.toLocaleString();
        document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = this.userProfile.challengesCompleted;
        document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = `${this.userProfile.currentStreak} days`;
        document.querySelector('.stat-item:nth-child(4) .stat-value').textContent = `${this.userProfile.co2Saved}kg`;
        
        // Update XP bar
        const currentLevelXP = (this.userProfile.level - 1) * 200;
        const nextLevelXP = this.userProfile.level * 200;
        const progress = ((this.userProfile.points - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        document.querySelector('.xp-fill').style.width = `${Math.min(progress, 100)}%`;
        document.querySelector('.xp-text').textContent = `${this.userProfile.points}/${nextLevelXP} XP`;
    }
    
    renderChallenges() {
        // Daily challenges
        const dailyChallengesContainer = document.querySelector('.daily-challenges .challenges-grid');
        dailyChallengesContainer.innerHTML = '';
        
        this.challenges.daily.forEach(challenge => {
            const challengeElement = this.createChallengeElement(challenge);
            dailyChallengesContainer.appendChild(challengeElement);
        });
        
        // Weekly challenges
        const weeklyChallengesContainer = document.querySelector('.weekly-challenges .challenges-grid');
        weeklyChallengesContainer.innerHTML = '';
        
        this.challenges.weekly.forEach(challenge => {
            const challengeElement = this.createChallengeElement(challenge);
            weeklyChallengesContainer.appendChild(challengeElement);
        });
    }
    
    createChallengeElement(challenge) {
        const div = document.createElement('div');
        div.className = `challenge-card ${challenge.completed ? 'completed' : ''}`;
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

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcoGameSystem;
}
