/**
 * Created by andres on 2/11/15.
 */

function BloodPressure (values){
    return [
        new Measurement("Systolic", 100, 130, values.systolic, "mmHG (avg)"),
        new Measurement("Diastolic", 70, 90, values.diastolic, "mmHG (avg)")];
}

function Fitness(values){

    return [
        // 54-60 Athlete
        // 74-77 Average
        // for a 50 year old person
        new Measurement("Resting Heart Rate", 54, 77, values.restingHeartRate, "bpm (avg)"),
        new Measurement("Fitness Index", 70, 120, values.fitnessIndex, "(avg)"),
        // Hand Grip Strength Test
        // http://kinesiologists.ca/wp/bcrpa-certification/personal-trainer-store/free-resources/assessment-grip-strength/
        // the upper high is 64 but there is no really "bad" upper value
        new Measurement("Muscular force", 51, 80, values.muscularForce, "%"),
        // 1, 2 are poor, 3 is borderline and 4, and 5 are good
        // no upper bound
        new Measurement("Muscular endurance", 2.5, 6, values.muscularEndurance, ""),
        new Measurement("Balance", 2, 6, values.balance, "")];

}

function Exercise(values){
    var weeklyActiveDays = new Measurement("Weekly Active Days", 3, 10, values.weeklyActiveDays, "(avg)"); // ideal 5
    var stepsPerDay = new Measurement("Steps per Day", 7000, 20000, values.stepsPerDay, "(avg)"); // the higher the better so there is no upper bound
    return [weeklyActiveDays, stepsPerDay];
}

function BodyComposition(values){
    var bodyMassIndex = new Measurement("Body Mass Index", 18.5, 29.9, values.bodyMassIndex, "BMI");
    var waistDiameter = new Measurement("Waist Diameter", 20, 80, values.waistDiameter, "cm");
    var fatPercentage = new Measurement("Fat Percentage", 23, 33.9, values.fatPercentage, "%");
    return [bodyMassIndex, waistDiameter, fatPercentage];
}

function Sleep(values){
    var timeInBed = new Measurement("Time in Bed", 7, 10, values.timeInBed, "hours (avg)");
    var timeAsleep = new Measurement("Time Asleep", 6, 9, values.timeAsleep, "hours (avg)");
    return [timeInBed, timeAsleep];
}

function LabTests(values){
    // http://www.mayoclinic.org/diseases-conditions/high-blood-cholesterol/in-depth/cholesterol-levels/art-20048245
    var fBGluc = new Measurement("fB-Gluc", 4, 6, values.fBGluc, "mmol/l");
    // http://www.mayoclinic.org/tests-procedures/cholesterol-test/basics/results/prc-20013282
    var cholesterol = new Measurement("Cholesterol", 2, 5, values.cholesterol, "mmol/l"); // less than 5
    var ldl = new Measurement("LDL", 0, 3, values.ldl, "mmol/l"); // less than 3
    var hdl = new Measurement("HDL", 1, 2, values.hdl, "mmol/l"); // more than 1
    var triglycerides = new Measurement("triglycerides", 0, 2, values.triglycerides, "mmol/l"); // less than 2
    var hemoglobin = new Measurement("Hemoglobin", 134, 167, values.hemoglobin, "gl/l");
    return [hemoglobin, fBGluc, cholesterol, ldl, hdl, triglycerides];
}

function Drugs(values){
    var tobacco = new Measurement("Tobacco", -5, 5, values.tobacco, " / month"); // zero is ideal
    var alcohol = new Measurement("Alcohol", 0, 10, values.alcohol, "AUDIT"); // this is based on a scale
    var drugAbuse = new Measurement("Drug Abuse", -5, 5, values.drugAbuse, ""); // zero is ideal
    var medicationAbuse = new Measurement("Medication Abuse", -5, 5, values.medicationAbuse, "");
    return [tobacco, alcohol, drugAbuse, medicationAbuse];
}

function EmotionalWellbeing(values){
    var depression = new Measurement("Depression", -9, 9, values.depression, "");
    var stressRecovery = new Measurement("Stress Recovery", 20, 70, values.stressRecovery, "");
    var stressLevel = new Measurement("Stress Level", 0, 60, values.stressLevel, "%");
    var optimism = new Measurement("Optimism", 14, 24, values.optimism, "");
    return [depression, stressRecovery, stressLevel, optimism];
}
