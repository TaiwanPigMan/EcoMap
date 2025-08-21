// Shared Data Bridge between EcoMap Dashboard and Eco Challenges
class EcoMapDataBridge {
    constructor() {
        this.environmentalData = {
            airQuality: { value: 42, status: 'good', timestamp: new Date() },
            temperature: { value: 68, unit: '°F', timestamp: new Date() },
            humidity: { value: 65, unit: '%', timestamp: new Date() },
            streamflow: { value: 15.2, unit: 'cfs', timestamp: new Date() },
            recycling: { value: 68, unit: '%', timestamp: new Date() },
            location: 'Bellevue, WA'
        };
        
        this.challengeData = {
            userLevel: 15,
            totalPoints: 2847,
            challengesCompleted: 47,
            currentStreak: 12,
            co2Saved: 156.8,
            achievements: []
        };
        
        this.init();
    }
    
    init() {
        // Load data from localStorage if available
        this.loadStoredData();
        
        // Set up periodic sync
        this.setupPeriodicSync();
        
        // Listen for data updates
        this.setupEventListeners();
    }
    
    loadStoredData() {
        try {
            const storedEnvData = localStorage.getItem('ecoMapEnvironmentalData');
            if (storedEnvData) {
                this.environmentalData = { ...this.environmentalData, ...JSON.parse(storedEnvData) };
            }
            
            const storedChallengeData = localStorage.getItem('ecoMapChallengeData');
            if (storedChallengeData) {
                this.challengeData = { ...this.challengeData, ...JSON.parse(storedChallengeData) };
            }
        } catch (error) {
            console.log('Error loading stored data:', error);
        }
    }
    
    saveData() {
        try {
            localStorage.setItem('ecoMapEnvironmentalData', JSON.stringify(this.environmentalData));
            localStorage.setItem('ecoMapChallengeData', JSON.stringify(this.challengeData));
        } catch (error) {
            console.log('Error saving data:', error);
        }
    }
    
    // Update environmental data from the main dashboard
    updateEnvironmentalData(newData) {
        this.environmentalData = { ...this.environmentalData, ...newData, timestamp: new Date() };
        this.saveData();
        this.dispatchDataUpdate('environmental', this.environmentalData);
    }
    
    // Update challenge data from the gamified platform
    updateChallengeData(newData) {
        this.challengeData = { ...this.challengeData, ...newData, timestamp: new Date() };
        this.saveData();
        this.dispatchDataUpdate('challenge', this.challengeData);
    }
    
    // Get current environmental data
    getEnvironmentalData() {
        return { ...this.environmentalData };
    }
    
    // Get current challenge data
    getChallengeData() {
        return { ...this.challengeData };
    }
    
    // Calculate environmental impact based on actions
    calculateEnvironmentalImpact(action, value = 1) {
        const impactFactors = {
            bike: { co2Reduction: 2.5, points: 25 },
            recycle: { co2Reduction: 0.8, points: 15 },
            energy: { co2Reduction: 1.2, points: 20 },
            water: { co2Reduction: 0.5, points: 10 },
            publicTransit: { co2Reduction: 2.0, points: 20 },
            carpool: { co2Reduction: 1.5, points: 15 },
            plantTree: { co2Reduction: 5.0, points: 50 }
        };
        
        const factor = impactFactors[action] || { co2Reduction: 0, points: 0 };
        return {
            co2Saved: factor.co2Reduction * value,
            pointsEarned: factor.points * value,
            action: action,
            timestamp: new Date()
        };
    }
    
    // Sync environmental data to challenges based on location
    syncLocationBasedChallenges() {
        const location = this.environmentalData.location;
        const airQuality = this.environmentalData.airQuality.value;
        const temperature = this.environmentalData.temperature.value;
        
        // Generate location-specific challenges
        const locationChallenges = [];
        
        if (airQuality > 50) {
            locationChallenges.push({
                id: 'air-quality-action',
                name: 'Improve Local Air Quality',
                description: `Air quality in ${location} needs attention. Take actions to reduce air pollution.`,
                points: 40,
                difficulty: 'medium',
                category: 'air-quality'
            });
        }
        
        if (temperature > 75) {
            locationChallenges.push({
                id: 'energy-conservation',
                name: 'Beat the Heat Efficiently',
                description: `With temperatures at ${temperature}°F, conserve energy while staying cool.`,
                points: 30,
                difficulty: 'easy',
                category: 'energy'
            });
        }
        
        return locationChallenges;
    }
    
    // Create contextual environmental tips based on current data
    getContextualTips() {
        const tips = [];
        const { airQuality, temperature, recycling } = this.environmentalData;
        
        if (airQuality.value > 50) {
            tips.push({
                icon: '🚴',
                title: 'Choose Clean Transport',
                description: 'Air quality is moderate. Bike or walk instead of driving today!',
                actionPoints: 25
            });
        }
        
        if (temperature.value > 70) {
            tips.push({
                icon: '🌳',
                title: 'Natural Cooling',
                description: 'Plant trees or spend time in green spaces to naturally cool your environment.',
                actionPoints: 30
            });
        }
        
        if (recycling.value < 70) {
            tips.push({
                icon: '♻️',
                title: 'Boost Recycling',
                description: `Local recycling rate is ${recycling.value}%. Help improve it by proper sorting!`,
                actionPoints: 15
            });
        }
        
        return tips;
    }
    
    setupEventListeners() {
        // Listen for storage events (data updates from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'ecoMapEnvironmentalData' || e.key === 'ecoMapChallengeData') {
                this.loadStoredData();
                this.dispatchDataUpdate('sync', { source: 'storage' });
            }
        });
    }
    
    setupPeriodicSync() {
        // Sync data every 30 seconds
        setInterval(() => {
            this.syncLocationBasedChallenges();
        }, 30000);
    }
    
    dispatchDataUpdate(type, data) {
        // Dispatch custom events for other components to listen to
        const event = new CustomEvent('ecoMapDataUpdate', {
            detail: { type, data }
        });
        window.dispatchEvent(event);
    }
    
    // Generate achievement based on environmental impact
    checkEnvironmentalAchievements() {
        const achievements = [];
        const { co2Saved, challengesCompleted } = this.challengeData;
        const { airQuality } = this.environmentalData;
        
        if (co2Saved >= 100 && !this.hasAchievement('carbon-saver-100')) {
            achievements.push({
                id: 'carbon-saver-100',
                name: 'Carbon Saver',
                description: 'Saved 100+ lbs of CO₂',
                icon: '🌱',
                earned: true,
                timestamp: new Date()
            });
        }
        
        if (challengesCompleted >= 50 && !this.hasAchievement('challenge-master')) {
            achievements.push({
                id: 'challenge-master',
                name: 'Challenge Master',
                description: 'Completed 50+ environmental challenges',
                icon: '🏆',
                earned: true,
                timestamp: new Date()
            });
        }
        
        if (airQuality.value < 25 && !this.hasAchievement('clean-air-advocate')) {
            achievements.push({
                id: 'clean-air-advocate',
                name: 'Clean Air Advocate',
                description: 'Contributed to excellent local air quality',
                icon: '🌬️',
                earned: true,
                timestamp: new Date()
            });
        }
        
        return achievements;
    }
    
    hasAchievement(achievementId) {
        return this.challengeData.achievements.some(achievement => achievement.id === achievementId);
    }
    
    // Integration method for dashboard to update challenge metrics
    updateChallengeMetricsFromEnvironmentalAction(action, location) {
        const impact = this.calculateEnvironmentalImpact(action);
        
        // Update challenge data
        this.challengeData.totalPoints += impact.pointsEarned;
        this.challengeData.co2Saved += impact.co2Saved;
        
        // Check for new achievements
        const newAchievements = this.checkEnvironmentalAchievements();
        this.challengeData.achievements.push(...newAchievements);
        
        this.updateChallengeData(this.challengeData);
        
        return {
            pointsEarned: impact.pointsEarned,
            co2Saved: impact.co2Saved,
            newAchievements: newAchievements
        };
    }
}

// Create global instance
window.ecoMapDataBridge = new EcoMapDataBridge();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EcoMapDataBridge;
}
