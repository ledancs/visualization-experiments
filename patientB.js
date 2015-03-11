/**
 * Created by andres on 2/11/15.
 */

var patient = {};

patient.bloodPressure = new BloodPressure({systolic: 123, diastolic: 80});

patient.fitness = new Fitness({
    restingHeartRate: 68,
    fitnessIndex: 94,
    muscularForce: 68,
    muscularEndurance: 4,
    balance: 4
});

patient.exercise = new Exercise({weeklyActiveDays: 5, stepsPerDay: 12256});

patient.bodyComposition = new BodyComposition({
    bodyMassIndex: 26.7,
    waistDiameter: 51,
    fatPercentage: 29.3
});

patient.sleep = new Sleep({timeInBed: 8.5, timeAsleep: 7.8});

// 6.2, 5.7, 3.8, 0.9, 141
patient.labTests = new LabTests({
    fBGluc: 5.5,
    cholesterol: 4.5,
    ldl: 2.55,
    hdl: 1.5,
    hemoglobin: 155,
    triglycerides: 1
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
