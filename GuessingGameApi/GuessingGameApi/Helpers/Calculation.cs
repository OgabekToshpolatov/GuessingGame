namespace GuessingGameApi.Helpers;

public static class Calculation
{
    public static int GenerateSecretNumber()
    {
       Random random = new Random();
        int[] digits = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 }; 
        int[] number = new int[4];

        for (int i = 0; i < number.Length; i++)
        {
            int randomIndex = random.Next(0, digits.Length); 
            number[i] = digits[randomIndex]; 
            digits[randomIndex] = digits[digits.Length - 1]; 
            Array.Resize(ref digits, digits.Length - 1); 
        }

        int randomNonRepeatingNumber = number[0] * 1000 + number[1] * 100 + number[2] * 10 + number[3]; 

        return randomNonRepeatingNumber;
    }
}