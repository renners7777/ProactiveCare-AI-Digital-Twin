import { Patient, ActivityAnalysis, DailyActivity } from '../types/patient';

// Analyze patient data for anomalies and risk patterns
export function analyzePatientData(patient: Patient): ActivityAnalysis {
  const history = patient.activityHistory;
  
  // Need at least 7 days of data for meaningful analysis
  if (history.length < 7) {
    return {
      alert: false,
      riskLevel: patient.riskLevel,
      riskFactors: [],
      trends: {
        steps: 'stable',
        standingTime: 'stable',
        movementFrequency: 'stable',
        sleepQuality: 'stable',
        gaitMetrics: 'stable'
      },
      environmentalRisks: [],
      timeBasedRisk: {
        highRiskPeriods: [],
        recommendations: []
      }
    };
  }
  
  // Get the last 7 days of data
  const recentData = history.slice(-7);
  const olderData = history.slice(-14, -7);
  
  // Calculate averages for recent and older periods
  const recentAvg = calculateAverages(recentData);
  const olderAvg = calculateAverages(olderData);
  
  // Determine trends by comparing recent to older data
  const trends = {
    steps: determineTrend(recentAvg.steps, olderAvg.steps, 0.05),
    standingTime: determineTrend(recentAvg.standingTime, olderAvg.standingTime, 0.05),
    movementFrequency: determineTrend(recentAvg.movementFrequency, olderAvg.movementFrequency, 0.05),
    sleepQuality: determineTrend(recentAvg.sleepQuality, olderAvg.sleepQuality, 0.05),
    gaitMetrics: determineGaitTrend(recentData, olderData)
  };

  // Analyze environmental risks
  const environmentalRisks = analyzeEnvironmentalRisks(patient.environmentalFactors);
  
  // Analyze time-based risks
  const timeBasedRisk = analyzeTimeBasedRisk(recentData);
  
  // Calculate risk factors
  const riskFactors = calculateRiskFactors(patient, trends, environmentalRisks);
  
  // Check for mobility decline
  const mobilityDecline = trends.steps === 'declining' && 
                          (trends.standingTime === 'declining' || trends.movementFrequency === 'declining');
  
  // Check for medication effects (sharp decline in recent days)
  const lastDayData = history[history.length - 1];
  const previousDayData = history[history.length - 2];
  const sharpDecline = lastDayData.steps < previousDayData.steps * 0.8 || 
                       lastDayData.standingTime < previousDayData.standingTime * 0.8;
  
  // Check for deconditioning (sustained low activity)
  const sustainedLowActivity = recentAvg.steps < patient.baseline.steps * 0.7 &&
                             recentAvg.standingTime < patient.baseline.standingTime * 0.7 &&
                             recentData.every(day => day.steps < patient.baseline.steps * 0.8);
  
  // Determine alert and recommendations
  let alert = false;
  let alertType = undefined;
  let alertMessage = undefined;
  let recommendations: string[] = [];
  let riskLevel = patient.riskLevel;
  
  if (mobilityDecline) {
    alert = true;
    alertType = 'mobility-decline';
    alertMessage = 'Gradual decline in mobility detected. Increased fall risk.';
    recommendations = [
      'Schedule a mobility assessment',
      'Review home environment for hazards',
      'Consider gentle strength and balance exercises',
      'Ensure regular movement throughout the day'
    ];
    if (riskLevel === 'low') riskLevel = 'medium';
  }
  
  if (sharpDecline) {
    alert = true;
    alertType = 'medication-effect';
    alertMessage = 'Sharp decline in mobility detected. Possible medication side effect.';
    recommendations = [
      'Review recent medication changes',
      'Schedule medication review with doctor',
      'Monitor for dizziness or balance issues',
      'Ensure adequate hydration'
    ];
    riskLevel = 'high';
  }
  
  if (sustainedLowActivity) {
    alert = true;
    alertType = 'deconditioning';
    alertMessage = 'Sustained low activity detected. Risk of deconditioning.';
    recommendations = [
      'Implement a gradual activity increase plan',
      'Set small, achievable movement goals',
      'Encourage light activities of daily living',
      'Consider motivation factors and address barriers'
    ];
    if (riskLevel === 'low') riskLevel = 'medium';
    else if (riskLevel === 'medium') riskLevel = 'high';
  }
  
  return {
    alert,
    alertType,
    alertMessage,
    recommendations,
    riskLevel,
    riskFactors,
    trends,
    environmentalRisks,
    timeBasedRisk
  };
}

// Helper functions
function calculateAverages(activities: DailyActivity[]) {
  const sum = activities.reduce((acc, day) => ({
    steps: acc.steps + day.steps,
    standingTime: acc.standingTime + day.standingTime,
    movementFrequency: acc.movementFrequency + day.movementFrequency,
    sleepQuality: acc.sleepQuality + day.sleepQuality
  }), { steps: 0, standingTime: 0, movementFrequency: 0, sleepQuality: 0 });
  
  return {
    steps: sum.steps / activities.length,
    standingTime: sum.standingTime / activities.length,
    movementFrequency: sum.movementFrequency / activities.length,
    sleepQuality: sum.sleepQuality / activities.length
  };
}

function determineTrend(
  recent: number, 
  older: number, 
  threshold: number
): 'stable' | 'declining' | 'improving' {
  const changePercent = (recent - older) / older;
  
  if (changePercent < -threshold) return 'declining';
  if (changePercent > threshold) return 'improving';
  return 'stable';
}

function determineGaitTrend(recentData: DailyActivity[], olderData: DailyActivity[]): 'stable' | 'declining' | 'improving' {
  const recentGaitAvg = recentData.reduce((acc, day) => ({
    speed: acc.speed + day.gaitMetrics.speed,
    balanceScore: acc.balanceScore + day.gaitMetrics.balanceScore
  }), { speed: 0, balanceScore: 0 });

  const olderGaitAvg = olderData.reduce((acc, day) => ({
    speed: acc.speed + day.gaitMetrics.speed,
    balanceScore: acc.balanceScore + day.gaitMetrics.balanceScore
  }), { speed: 0, balanceScore: 0 });

  const speedTrend = determineTrend(
    recentGaitAvg.speed / recentData.length,
    olderGaitAvg.speed / olderData.length,
    0.05
  );

  const balanceTrend = determineTrend(
    recentGaitAvg.balanceScore / recentData.length,
    olderGaitAvg.balanceScore / olderData.length,
    0.05
  );

  if (speedTrend === 'declining' || balanceTrend === 'declining') return 'declining';
  if (speedTrend === 'improving' && balanceTrend !== 'declining') return 'improving';
  return 'stable';
}

function analyzeEnvironmentalRisks(factors: Patient['environmentalFactors']) {
  const risks: ActivityAnalysis['environmentalRisks'] = [];

  // Bathroom risks
  if (factors.bathroomSafety < 2) {
    risks.push({
      location: 'Bathroom',
      riskLevel: factors.bathroomSafety === 0 ? 'high' : 'medium',
      recommendations: [
        'Install grab bars near toilet and shower',
        'Use non-slip mats',
        'Ensure adequate lighting'
      ]
    });
  }

  // Bedroom risks
  if (factors.bedroomSafety < 2) {
    risks.push({
      location: 'Bedroom',
      riskLevel: factors.bedroomSafety === 0 ? 'high' : 'medium',
      recommendations: [
        'Clear pathways to bathroom',
        'Install bedside lighting',
        'Consider bed rail or transfer pole'
      ]
    });
  }

  // General home risks
  if (factors.looseRugs > 1 || factors.poorLighting > 1 || factors.clutteredWalkways > 1) {
    risks.push({
      location: 'General Living Space',
      riskLevel: 'high',
      recommendations: [
        'Secure or remove loose rugs',
        'Improve lighting in dark areas',
        'Clear walkways of clutter'
      ]
    });
  }

  // Stairs risks
  if (factors.stairsPresent && factors.missingHandrails) {
    risks.push({
      location: 'Stairs',
      riskLevel: 'high',
      recommendations: [
        'Install handrails on both sides',
        'Ensure adequate lighting',
        'Mark step edges clearly'
      ]
    });
  }

  return risks;
}

function analyzeTimeBasedRisk(recentData: DailyActivity[]): ActivityAnalysis['timeBasedRisk'] {
  const timeRisks = new Map<string, number>();
  
  recentData.forEach(day => {
    if (day.rapidMovements > 3 || day.inactivityPeriods > 2) {
      timeRisks.set(day.timeOfDay, (timeRisks.get(day.timeOfDay) || 0) + 1);
    }
  });

  const highRiskPeriods = Array.from(timeRisks.entries())
    .filter(([_, count]) => count >= 3)
    .map(([time]) => time);

  const recommendations = [];
  if (highRiskPeriods.includes('morning')) {
    recommendations.push('Take extra care during morning activities, especially when first getting up');
  }
  if (highRiskPeriods.includes('evening') || highRiskPeriods.includes('night')) {
    recommendations.push('Ensure adequate lighting for evening and nighttime movement');
    recommendations.push('Consider using a nightlight in bathroom and hallways');
  }

  return {
    highRiskPeriods,
    recommendations
  };
}

function calculateRiskFactors(
  patient: Patient,
  trends: ActivityAnalysis['trends'],
  environmentalRisks: ActivityAnalysis['environmentalRisks']
): ActivityAnalysis['riskFactors'] {
  const factors: ActivityAnalysis['riskFactors'] = [];

  // Activity-based risks
  if (trends.steps === 'declining' || trends.standingTime === 'declining') {
    factors.push({
      category: 'Activity',
      level: 'high',
      description: 'Declining activity levels detected'
    });
  }

  // Gait-based risks
  if (trends.gaitMetrics === 'declining') {
    factors.push({
      category: 'Gait',
      level: 'high',
      description: 'Changes in walking pattern detected'
    });
  }

  // Medical risks
  if (patient.medicalProfile.previousFalls > 0) {
    factors.push({
      category: 'Medical',
      level: 'high',
      description: `History of ${patient.medicalProfile.previousFalls} previous falls`
    });
  }

  // Environmental risks
  if (environmentalRisks.some(risk => risk.riskLevel === 'high')) {
    factors.push({
      category: 'Environmental',
      level: 'high',
      description: 'Multiple home hazards identified'
    });
  }

  // Age-related risks
  if (patient.age >= 85) {
    factors.push({
      category: 'Age',
      level: 'high',
      description: 'Advanced age increases fall risk'
    });
  } else if (patient.age >= 75) {
    factors.push({
      category: 'Age',
      level: 'medium',
      description: 'Age-related risk factors present'
    });
  }

  return factors;
}