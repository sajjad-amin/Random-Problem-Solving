#include <stdio.h>
#include <time.h>
#include <stdlib.h>
char *get_time_string(time_t time){
    static char str[27];
    struct tm *tm_info = localtime(&time);
    strftime(str, 26, "%d-%m-%Y %I:%M:%S %p", tm_info);
    str[27] = '\0';
    return str;
}
int main(){
    int h, m, s;
    system("cls");
    printf("\nEnter hour and minute sequentially to set shutdown timer\n\n");
    printf("\tEnter hour : ");
    scanf("%d", &h);
    printf("\tEnter minute : ");
    scanf("%d", &m);
    printf("\tEnter second : ");
    scanf("%d", &s);
    time_t execution_time = time(NULL) + s + (m * 60) + (h * 60 * 60);
    printf("\n\nIt's %s\n", get_time_string(time(NULL)));
    printf("\nYour computer will shutdown at %s\n", get_time_string(execution_time));
    printf("\nIf you want to cancel this timer, press CTRL + C\n\n");
    while (time(NULL) < execution_time){
    }
    system("shutdown /s");
    return 0;
}