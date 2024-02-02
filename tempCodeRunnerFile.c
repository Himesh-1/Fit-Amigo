#include<stdio.h>
int main()
{
    int a=5,b;
    b= --a+a--;
    printf("%d,%d",a,b);
    return 0;
}