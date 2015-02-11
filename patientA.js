/**
 * Created by andres on 2/11/15.
 */

var patientA = {};

patientA.bloodPressure = new BloodPressure({systolic: 137, diastolic: 88}); // 137, 88

patientA.fitness = new Fitness({
    restingHeartRate: 73,
    fitnessIndex: 75,
    muscularForce: 37,
    muscularEndurance: 3,
    balance: 2
});

patientA.exercise = new Exercise({weeklyActiveDays: 2, stepsPerDay: 4885});

patientA.bodyComposition = new BodyComposition({
    bodyMassIndex: 33.2,
    waistDiameter: 90,
    fatPercentage: 35.2
});

patientA.sleep = new Sleep({timeInBed: 8, timeAsleep: 7.5});

// 6.2, 5.7, 3.8, 0.9, 141
patientA.labTests = new LabTests({
    fBGluc: 6.2,
    cholesterol: 5.7,
    ldl: 3.8,
    hdl: 0.9,
    hemoglobine: 141
});

patientA.drugs = new Drugs({
    tobacco: 0,
    alcohol: 6,
    drugAbuse: 0,
    medicationAbuse: 0
});

patientA.emotionalWellbeing = new EmotionalWellbeing({
    depression: 7,
    stressRecovery: 22,
    stressLevel: 47,
    optimism: 14
});
