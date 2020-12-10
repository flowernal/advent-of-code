using System;
using System.IO;
using System.Linq;

namespace Day6
{
    class Program
    {
        static void Main(string[] args)
        {
            int countsSum = 0;
            int everyoneCount = 0;

            // Input
            string[][] input = File.ReadAllText("6.txt").Split("\r\n\r\n").Select(x => x.Split("\r\n").OrderBy(y => y.Length).ToArray()).ToArray();
            
            // Part 1
            foreach (var x in input)
            {
               countsSum += string.Join("", x).ToCharArray().ToHashSet().Count;
            }
            
            Console.WriteLine($"Part 1: {countsSum}");

            // Part 2
            foreach (var x in input)
            {
                for(int i = 0; i < x[0].Length; i++)
                {
                    if(x.All(y => y.Contains(x[0][i])))
                    {
                        everyoneCount++;
                    }
                }
            }

            Console.WriteLine($"Part 2: {everyoneCount}");
        }
    }
}
