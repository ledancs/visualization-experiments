/**
 * Created by andres on 2/11/15.
 */

var patient = {};

patient.bloodPressure = new BloodPressure({systolic: 137, diastolic: 88}); // 137, 88

patient.fitness = new Fitness({
    restingHeartRate: 77,
    fitnessIndex: 74,
    muscularForce: 37,
    muscularEndurance: 2,
    balance: 1
});

patient.exercise = new Exercise({weeklyActiveDays: 2, stepsPerDay: 4885});

patient.bodyComposition = new BodyComposition({
    bodyMassIndex: 33.2,
    waistDiameter: 90,
    fatPercentage: 35.2
});

patient.sleep = new Sleep({timeInBed: 7.5, timeAsleep: 6});

// 6.2, 5.7, 3.8, 0.9, 141
patient.labTests = new LabTests({
    fBGluc: 6.2,
    cholesterol: 6.2,
    ldl: 4.175,
    hdl: 0.9,
    hemoglobin: 141,
    triglycerides: 2.5
});

patient.drugs = new Drugs({
    tobacco: 0,
    alcohol: 6,
    drugAbuse: 0,
    medicationAbuse: 0
});

patient.emotionalWellbeing = new EmotionalWellbeing({
    depression: 7,
    stressRecovery: 22,
    stressLevel: 47,
    optimism: 14
});
