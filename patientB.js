/**
 * Created by andres on 2/11/15.
 */

var patient = {};

patient.bloodPressure = new BloodPressure({systolic: 123, diastolic: 80}); // 137, 88

patient.fitness = new Fitness({
    restingHeartRate: 72,
    fitnessIndex: 94,
    muscularForce: 68,
    muscularEndurance: 3,
    balance: 2
});

patient.exercise = new Exercise({weeklyActiveDays: 4, stepsPerDay: 10256});

patient.bodyComposition = new BodyComposition({
    bodyMassIndex: 26.7,
    waistDiameter: 51,
    fatPercentage: 32.3
});

patient.sleep = new Sleep({timeInBed: 8.2, timeAsleep: 7.8});

// 6.2, 5.7, 3.8, 0.9, 141
patient.labTests = new LabTests({
    fBGluc: 4.4,
    cholesterol: 2.97,
    ldl: 1.3,
    hdl: 2.07,
    hemoglobine: 155
});

patient.drugs = new Drugs({
    tobacco: 2,
    alcohol: 6,
    drugAbuse: 0,
    medicationAbuse: 0
});

patient.emotionalWellbeing = new EmotionalWellbeing({
    depression: 4,
    stressRecovery: 43,
    stressLevel: 39,
    optimism: 18
});
