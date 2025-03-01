# Program to demonstrate control structures in Python

# Function to check if a number is odd or even using conditional statements
def check_odd_even(num):
    if num % 2 == 0:
        return f"{num} is Even"
    else:
        return f"{num} is Odd"

# Function to print the first n numbers using a for loop
def print_numbers(n):
    print(f"Printing numbers from 1 to {n}:")
    for i in range(1, n+1):
        print(i, end=" ")
    print()

# Function to demonstrate a while loop by calculating the factorial of a number
def factorial(n):
    result = 1
    while n > 0:
        result *= n
        n -= 1
    return result

# Main code execution
if __name__ == "__main__":
    # Conditional statement demo
    num = 5
    print(check_odd_even(num))  # Check if 5 is odd or even

    # For loop demo
    print_numbers(5)  # Print numbers from 1 to 5

    # While loop demo
    n = 5
    print(f"Factorial of {n} is {factorial(n)}")  # Calculate factorial of 5
