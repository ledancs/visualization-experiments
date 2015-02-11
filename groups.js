/**
 * Created by andres on 2/11/15.
 */

function BloodPressure (values){
    return [
        new Measurement("Systolic", 100, 130, values.systolic),
        new Measurement("Diastolic", 70, 85, values.diastolic, "mmHG (avg)")];
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
        new Measurement("Balance", 1, 4, values.balance, "")];

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
    var cholesterol = new Measurement("Cholesterol", 0, 6.2, values.cholesterol, "mmol/l");
    var ldl = new Measurement("LDL", 0, 4.1, values.ldl, "mmol/l"); // bad cholesterol
    var hdl = new Measurement("HDL", 1.3, 2.2, values.hdl, "mmol/l"); // good cholesterol
    var hemoglobin = new Measurement("Hemoglobin", 134, 167, values.hemoglobine, "gl/l");
    return [hemoglobin, fBGluc, cholesterol, ldl, hdl];
}

function Drugs(values){
    var tobacco = new Measurement("Tobacco", -5, 5, values.tobacco, ""); // zero is ideal
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
