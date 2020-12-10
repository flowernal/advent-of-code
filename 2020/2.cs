using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Day2
{
    public class Password
    {
        public int[] range;
        public char letter;
        public string corrupted;
    }

    class Program
    {
        static void Main(string[] args)
        {
            List<object> passwordObjects = new List<object>();
            int validPasswords = 0;
            int actuallyValidPasswords = 0;

            string[] input = File.ReadAllText("input.txt").Split("\r\n");

            // Create password objects
            foreach (var x in input)
            {
                string[] password = x.Split(' ');
                passwordObjects.Add(new Password() {
                    range = password[0].Split('-').Select(y => Convert.ToInt32(y)).ToArray(),
                    letter = password[1][0],
                    corrupted = password[2]
                });
            }

            // Part 1
            foreach (Password password in passwordObjects)
            {
                int occurences = Regex.Matches(password.corrupted, $@"{password.letter}").Count;
                
                if (occurences >= password.range[0] && occurences <= password.range[1])
                {
                    validPasswords++;
                }
            }

            Console.WriteLine($"Part 1: {validPasswords}");

            // Part 2
            foreach (Password password in passwordObjects)
            {
                if (password.corrupted[password.range[0] - 1] == password.letter || password.corrupted[password.range[1] - 1] == password.letter)
                {
                    if (password.corrupted[password.range[0] - 1] != password.corrupted[password.range[1] - 1])
                    {
                        actuallyValidPasswords++;
                    }
                }
            }

            Console.WriteLine($"Part 2: {actuallyValidPasswords}");
        }
    }
}
